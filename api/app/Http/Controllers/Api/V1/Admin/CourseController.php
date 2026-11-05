<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Course;
use Illuminate\Database\Eloquent\Model;

class CourseController extends CrudController
{
    protected function model(): string
    {
        return Course::class;
    }

    protected function searchable(): array
    {
        return ['title', 'slug', 'teacher_name'];
    }

    protected function sortBy(): array
    {
        return ['sort', 'asc'];
    }

    protected function slugFrom(): ?string
    {
        return 'title';
    }

    protected function rules(?Model $record): array
    {
        return array_merge([
            'slug' => $this->slugRule($record),
            'level' => ['nullable', 'string', 'max:50'],
            'age_min' => ['nullable', 'integer', 'between:3,99'],
            'age_max' => ['nullable', 'integer', 'between:3,99'],
            'teacher_name' => ['nullable', 'string', 'max:120'],
            'max_places' => ['nullable', 'integer', 'min:1', 'max:1000'],
            'sort' => ['sometimes', 'integer', 'min:0', 'max:65535'],
            'is_active' => ['sometimes', 'boolean'],
        ],
            $this->translated('title', $record, true),
            $this->translated('description', $record, false, 3000),
            $this->translated('schedule', $record, false, 500),
        );
    }
}
