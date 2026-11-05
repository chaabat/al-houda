<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Page;
use Illuminate\Database\Eloquent\Model;

class PageController extends CrudController
{
    protected function model(): string
    {
        return Page::class;
    }

    protected function searchable(): array
    {
        return ['title', 'slug'];
    }

    protected function sortBy(): array
    {
        return ['slug', 'asc'];
    }

    protected function slugFrom(): ?string
    {
        return 'title';
    }

    protected function rules(?Model $record): array
    {
        return array_merge(
            ['slug' => $this->slugRule($record), 'is_published' => ['sometimes', 'boolean']],
            $this->translated('title', $record, true),
            $this->translated('body', $record, true, 50000),
        );
    }
}
