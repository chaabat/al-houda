<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;

class CategoryController extends CrudController
{
    protected function model(): string
    {
        return Category::class;
    }

    protected function searchable(): array
    {
        return ['name', 'slug'];
    }

    protected function slugFrom(): ?string
    {
        return 'name';
    }

    protected function rules(?Model $record): array
    {
        return array_merge(
            ['slug' => $this->slugRule($record)],
            $this->translated('name', $record, true, 100),
        );
    }
}
