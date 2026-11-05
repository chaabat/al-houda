<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PostController extends CrudController
{
    protected function model(): string
    {
        return Post::class;
    }

    protected function with(): array
    {
        return ['category'];
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
            'category_id' => ['nullable', Rule::exists('categories', 'id')],
            'cover_image' => $this->imageRule(),
            'status' => ['sometimes', Rule::in(['draft', 'published'])],
            'published_at' => ['nullable', 'date'],
        ],
            $this->translated('title', $record, true),
            $this->translated('excerpt', $record, false, 500),
            $this->translated('body', $record, true, 50000),
        );
    }

    protected function prepare(array $data, Request $request, ?Model $record): array
    {
        if (! $record) {
            $data['author_id'] = $request->user()->id;
        }

        $status = $data['status'] ?? $record?->status?->value;
        $publishedAt = array_key_exists('published_at', $data) ? $data['published_at'] : $record?->published_at;

        if ($status === 'published' && blank($publishedAt)) {
            $data['published_at'] = now();
        }

        return $data;
    }
}
