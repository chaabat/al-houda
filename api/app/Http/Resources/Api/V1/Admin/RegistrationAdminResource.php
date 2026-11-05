<?php

namespace App\Http\Resources\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Registration */
class RegistrationAdminResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'status' => $this->status->value,
            'parent_name' => $this->parent_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'locale' => $this->locale,
            'refusal_reason' => $this->refusal_reason,
            'admin_notes' => $this->admin_notes,
            'consent_at' => $this->consent_at,
            'decided_at' => $this->decided_at,
            'notified_at' => $this->notified_at,
            'created_at' => $this->created_at,
            'period' => $this->whenLoaded('period', fn () => [
                'id' => $this->period->id,
                'school_year' => $this->period->school_year,
            ]),
            'decided_by' => $this->whenLoaded('decider', fn () => $this->decider?->name),
            'children_count' => $this->whenCounted('children'),
            'children' => $this->whenLoaded('children', fn () => $this->children->map(fn ($child) => [
                'id' => $child->id,
                'first_name' => $child->first_name,
                'last_name' => $child->last_name,
                'birth_date' => $child->birth_date?->format('Y-m-d'),
                'gender' => $child->gender,
                'level' => $child->level,
                'course' => $child->course ? ['id' => $child->course->id, 'title' => $child->course->title] : null,
            ])),
        ];
    }
}
