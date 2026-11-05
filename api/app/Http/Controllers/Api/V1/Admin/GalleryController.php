<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\GalleryItem;
use Illuminate\Database\Eloquent\Model;

class GalleryController extends CrudController
{
    protected function model(): string
    {
        return GalleryItem::class;
    }

    protected function sortBy(): array
    {
        return ['sort', 'asc'];
    }

    protected function rules(?Model $record): array
    {
        return array_merge([
            'image' => $this->imageRule($record, true),
            'sort' => ['sometimes', 'integer', 'min:0', 'max:65535'],
            'is_published' => ['sometimes', 'boolean'],
        ],
            $this->translated('caption', $record, false, 300),
        );
    }
}
