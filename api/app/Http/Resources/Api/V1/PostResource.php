<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Post */
class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'cover_image' => Media::url($this->cover_image),
            'published_at' => $this->published_at,
            'category' => $this->whenLoaded('category', fn () => $this->category
                ? ['slug' => $this->category->slug, 'name' => $this->category->name]
                : null),
            'body' => $this->when($request->routeIs('posts.show'), fn () => $this->body),
        ];
    }
}
