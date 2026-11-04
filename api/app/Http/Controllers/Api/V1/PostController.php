<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\PostStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\PostResource;
use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $posts = $this->published()
            ->with('category')
            ->when($request->query('category'), fn (Builder $q, string $slug) => $q->whereHas(
                'category', fn (Builder $c) => $c->where('slug', $slug)
            ))
            ->orderByDesc('published_at')
            ->paginate(min(max((int) $request->query('per_page', 9), 1), 50));

        return PostResource::collection($posts);
    }

    public function show(string $slug): PostResource
    {
        return new PostResource($this->published()->with('category')->where('slug', $slug)->firstOrFail());
    }

    private function published(): Builder
    {
        return Post::query()
            ->where('status', PostStatus::Published->value)
            ->where('published_at', '<=', now());
    }
}
