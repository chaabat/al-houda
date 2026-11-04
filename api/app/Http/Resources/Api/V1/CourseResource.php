<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Course */
class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'schedule' => $this->schedule,
            'level' => $this->level,
            'age_min' => $this->age_min,
            'age_max' => $this->age_max,
            'teacher_name' => $this->teacher_name,
        ];
    }
}
