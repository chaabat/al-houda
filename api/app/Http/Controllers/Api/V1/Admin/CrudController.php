<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\Admin\AdminModelResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

/**
 * Generic admin CRUD. Translatable fields accept either a plain string (stored as French)
 * or an object {fr, ar, en, de}. On update, send all the translations you want to keep.
 */
abstract class CrudController extends Controller
{
    /** @return class-string<Model> */
    abstract protected function model(): string;

    abstract protected function rules(?Model $record): array;

    protected function with(): array
    {
        return [];
    }

    protected function searchable(): array
    {
        return [];
    }

    protected function sortBy(): array
    {
        return ['id', 'desc'];
    }

    protected function slugFrom(): ?string
    {
        return null;
    }

    protected function prepare(array $data, Request $request, ?Model $record): array
    {
        return $data;
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $query = $this->model()::query()->with($this->with());
        $term = trim((string) $request->query('search', ''));

        if ($term !== '' && $this->searchable()) {
            $like = '%'.addcslashes($term, '%_\\').'%';
            $query->where(function ($q) use ($like) {
                foreach ($this->searchable() as $column) {
                    $q->orWhereRaw('"'.$column.'"::text ilike ?', [$like]);
                }
            });
        }

        [$column, $direction] = $this->sortBy();

        return AdminModelResource::collection(
            $query->orderBy($column, $direction)
                ->paginate(min(max((int) $request->query('per_page', 20), 1), 100))
        );
    }

    public function show(string $id): AdminModelResource
    {
        return new AdminModelResource($this->find($id));
    }

    public function store(Request $request): JsonResponse
    {
        $record = $this->model()::create($this->validated($request, null));
        $this->audit('created', $record, $request);

        return (new AdminModelResource($record->fresh($this->with())))->response()->setStatusCode(201);
    }

    public function update(Request $request, string $id): AdminModelResource
    {
        $record = $this->find($id);
        $record->update($this->validated($request, $record));
        $this->audit('updated', $record, $request);

        return new AdminModelResource($record->fresh($this->with()));
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $record = $this->find($id);
        $this->audit('deleted', $record, $request);
        $record->delete();

        return response()->json(null, 204);
    }

    // ------------------------------------------------------------ helpers for subclasses

    protected function translated(string $field, ?Model $record, bool $required = false, int $max = 255): array
    {
        $presence = $required ? ($record ? ['sometimes', 'required'] : ['required']) : ['nullable'];

        $rules = [
            $field => [...$presence, 'array:fr,ar,en,de'],
            "$field.fr" => [$required ? 'required_with:'.$field : 'nullable', 'string', "max:$max"],
        ];

        foreach (['ar', 'en', 'de'] as $locale) {
            $rules["$field.$locale"] = ['nullable', 'string', "max:$max"];
        }

        return $rules;
    }

    protected function slugRule(?Model $record): array
    {
        $table = (new ($this->model()))->getTable();

        return [
            'sometimes', 'nullable', 'string', 'max:120',
            'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
            Rule::unique($table, 'slug')->ignore($record?->getKey()),
        ];
    }

    protected function imageRule(?Model $record = null, bool $required = false): array
    {
        $presence = $required ? ($record ? ['sometimes', 'required'] : ['required']) : ['nullable'];

        return [...$presence, 'string', 'max:255', 'regex:#^uploads/[A-Za-z0-9._-]+$#'];
    }

    // ------------------------------------------------------------ internals

    private function find(string $id): Model
    {
        return $this->model()::with($this->with())->findOrFail($id);
    }

    private function translatableAttributes(): array
    {
        $model = new ($this->model());

        return method_exists($model, 'getTranslatableAttributes') ? $model->getTranslatableAttributes() : [];
    }

    private function validated(Request $request, ?Model $record): array
    {
        $translatable = $this->translatableAttributes();

        foreach ($translatable as $field) {
            if (is_string($request->input($field))) {
                $request->merge([$field => ['fr' => $request->input($field)]]);
            }
        }

        $data = $request->validate($this->rules($record));

        foreach ($translatable as $field) {
            if (array_key_exists($field, $data)) {
                $data[$field] = array_filter($data[$field] ?? [], fn ($value) => filled($value));
            }
        }

        if (array_key_exists('slug', $data) && blank($data['slug'])) {
            unset($data['slug']);
        }

        if (! $record && ! isset($data['slug']) && ($from = $this->slugFrom())) {
            $base = $data[$from]['fr'] ?? (is_array($data[$from] ?? null) ? (reset($data[$from]) ?: '') : '');
            $data['slug'] = $this->uniqueSlug((string) $base);
        }

        return $this->prepare($data, $request, $record);
    }

    private function uniqueSlug(string $base): string
    {
        $slug = Str::slug($base) ?: 'item';
        $candidate = $slug;
        $i = 2;

        while ($this->model()::where('slug', $candidate)->exists()) {
            $candidate = $slug.'-'.$i++;
        }

        return $candidate;
    }

    private function audit(string $event, Model $record, Request $request): void
    {
        rescue(fn () => activity('admin')
            ->causedBy($request->user())
            ->performedOn($record)
            ->event($event)
            ->withProperties(['fields' => array_keys($request->except(['password']))])
            ->log($event));
    }
}
