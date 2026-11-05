<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\RefuseRegistrationRequest;
use App\Http\Requests\Api\V1\Admin\UpdateRegistrationNotesRequest;
use App\Http\Resources\Api\V1\Admin\RegistrationAdminResource;
use App\Models\Registration;
use App\Services\Interfaces\RegistrationServiceInterface;
use App\Support\Csv;
use DomainException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RegistrationController extends Controller
{
    private const RELATIONS = ['period', 'children.course', 'decider'];

    public function __construct(private RegistrationServiceInterface $registrations)
    {
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $items = $this->filtered($request)
            ->with('period')
            ->withCount('children')
            ->paginate(min(max((int) $request->query('per_page', 20), 1), 100));

        return RegistrationAdminResource::collection($items);
    }

    public function show(Registration $registration): RegistrationAdminResource
    {
        return new RegistrationAdminResource($registration->load(self::RELATIONS));
    }

    public function update(UpdateRegistrationNotesRequest $request, Registration $registration): RegistrationAdminResource
    {
        $registration->update($request->validated());

        return new RegistrationAdminResource($registration->load(self::RELATIONS));
    }

    public function accept(Request $request, Registration $registration): JsonResponse
    {
        try {
            $this->registrations->accept($registration, $request->user());
        } catch (DomainException $e) {
            return response()->json(['message' => $e->getMessage(), 'code' => 'already_decided'], 409);
        }

        return (new RegistrationAdminResource($registration->fresh(self::RELATIONS)))->response();
    }

    public function refuse(RefuseRegistrationRequest $request, Registration $registration): JsonResponse
    {
        try {
            $this->registrations->refuse($registration, $request->user(), $request->validated('reason'));
        } catch (DomainException $e) {
            return response()->json(['message' => $e->getMessage(), 'code' => 'already_decided'], 409);
        }

        return (new RegistrationAdminResource($registration->fresh(self::RELATIONS)))->response();
    }

    public function export(Request $request): StreamedResponse
    {
        $rows = [];

        foreach ($this->filtered($request)->with(['period', 'children.course'])->get() as $r) {
            foreach ($r->children as $child) {
                $rows[] = [
                    $r->reference,
                    $r->status->value,
                    $r->period?->school_year,
                    Csv::cell($r->parent_name),
                    Csv::cell($r->email),
                    $r->phone,
                    $r->locale,
                    Csv::cell($child->first_name),
                    Csv::cell($child->last_name),
                    $child->birth_date?->format('Y-m-d'),
                    Csv::cell($child->course?->title),
                    $r->created_at?->format('Y-m-d H:i'),
                ];
            }
        }

        return Csv::download(
            'inscriptions-'.now()->format('Ymd-His').'.csv',
            ['reference', 'statut', 'annee', 'parent', 'email', 'telephone', 'langue', 'prenom_enfant', 'nom_enfant', 'naissance', 'cours', 'recue_le'],
            $rows,
        );
    }

    private function filtered(Request $request): Builder
    {
        return Registration::query()
            ->when($request->query('status'), fn (Builder $q, string $v) => $q->where('status', $v))
            ->when($request->query('period_id'), fn (Builder $q, $v) => $q->where('period_id', $v))
            ->when($request->query('search'), fn (Builder $q, string $s) => $q->where(
                fn (Builder $w) => $w->where('reference', 'ilike', "%{$s}%")
                    ->orWhere('parent_name', 'ilike', "%{$s}%")
                    ->orWhere('email', 'ilike', "%{$s}%")
            ))
            ->latest();
    }
}
