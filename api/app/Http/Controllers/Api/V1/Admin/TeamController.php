<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\TeamMember;
use Illuminate\Database\Eloquent\Model;

class TeamController extends CrudController
{
    protected function model(): string
    {
        return TeamMember::class;
    }

    protected function searchable(): array
    {
        return ['name'];
    }

    protected function sortBy(): array
    {
        return ['sort', 'asc'];
    }

    protected function rules(?Model $record): array
    {
        return array_merge([
            'name' => [$record ? 'sometimes' : 'required', 'string', 'max:120'],
            'photo' => $this->imageRule(),
            'sort' => ['sometimes', 'integer', 'min:0', 'max:65535'],
        ],
            $this->translated('role', $record, false, 120),
        );
    }
}
