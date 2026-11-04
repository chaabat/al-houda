<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Event */
class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'location' => $this->location,
            'cover_image' => Media::url($this->cover_image),
            'starts_at' => $this->starts_at,
            'ends_at' => $this->ends_at,
            'description' => $this->when($request->routeIs('events.show'), fn () => $this->description),
        ];
    }
}
