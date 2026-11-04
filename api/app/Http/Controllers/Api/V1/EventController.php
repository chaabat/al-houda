<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EventController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Event::where('is_published', true);

        if ($request->boolean('upcoming')) {
            $query->where('starts_at', '>=', now())->orderBy('starts_at');
        } else {
            $query->orderByDesc('starts_at');
        }

        return EventResource::collection(
            $query->paginate(min(max((int) $request->query('per_page', 9), 1), 50))
        );
    }

    public function show(string $slug): EventResource
    {
        return new EventResource(Event::where('is_published', true)->where('slug', $slug)->firstOrFail());
    }
}
