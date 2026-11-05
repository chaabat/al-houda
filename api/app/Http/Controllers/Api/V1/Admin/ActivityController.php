<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\Admin\ActivityAdminResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\Activitylog\Models\Activity;

class ActivityController extends Controller
{
    public function __invoke(Request $request): AnonymousResourceCollection
    {
        $items = Activity::with('causer')
            ->when($request->query('event'), fn ($q, string $v) => $q->where('event', $v))
            ->latest('id')
            ->paginate(min(max((int) $request->query('per_page', 30), 1), 100));

        return ActivityAdminResource::collection($items);
    }
}
