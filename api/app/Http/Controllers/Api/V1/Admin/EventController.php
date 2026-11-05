<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Event;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

class EventController extends CrudController
{
    protected function model(): string
    {
        return Event::class;
    }

    protected function searchable(): array
    {
        return ['title', 'slug', 'location'];
    }

    protected function sortBy(): array
    {
        return ['starts_at', 'desc'];
    }

    protected function slugFrom(): ?string
    {
        return 'title';
    }

    protected function rules(?Model $record): array
    {
        return array_merge([
            'slug' => $this->slugRule($record),
            'location' => ['nullable', 'string', 'max:190'],
            'cover_image' => $this->imageRule(),
            'starts_at' => [$record ? 'sometimes' : 'required', 'date'],
            'ends_at' => ['nullable', 'date', Rule::when(request()->filled('starts_at'), ['after_or_equal:starts_at'])],
            'is_published' => ['sometimes', 'boolean'],
        ],
            $this->translated('title', $record, true),
            $this->translated('description', $record, false, 20000),
        );
    }
}
