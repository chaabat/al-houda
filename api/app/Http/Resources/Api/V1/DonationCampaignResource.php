<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\DonationCampaign */
class DonationCampaignResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $raised = (int) ($this->raised_cents ?? 0);
        $goal = $this->goal_cents;

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'cover_image' => Media::url($this->cover_image),
            'goal_cents' => $goal,
            'raised_cents' => $raised,
            'progress_percent' => $goal ? min(100, (int) round($raised / $goal * 100)) : null,
            'ends_at' => $this->ends_at,
        ];
    }
}
