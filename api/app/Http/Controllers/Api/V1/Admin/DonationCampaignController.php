<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\DonationCampaign;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

class DonationCampaignController extends CrudController
{
    protected function model(): string
    {
        return DonationCampaign::class;
    }

    protected function searchable(): array
    {
        return ['title', 'slug'];
    }

    protected function slugFrom(): ?string
    {
        return 'title';
    }

    protected function rules(?Model $record): array
    {
        return array_merge([
            'slug' => $this->slugRule($record),
            'cover_image' => $this->imageRule(),
            'goal_cents' => ['nullable', 'integer', 'min:100', 'max:1000000000'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', Rule::when(request()->filled('starts_at'), ['after_or_equal:starts_at'])],
            'is_active' => ['sometimes', 'boolean'],
        ],
            $this->translated('title', $record, true),
            $this->translated('description', $record, false, 3000),
        );
    }
}
