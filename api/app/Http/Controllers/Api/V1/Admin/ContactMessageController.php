<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\Admin\ContactMessageAdminResource;
use App\Models\ContactMessage;
use App\Services\Interfaces\ContactServiceInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ContactMessageController extends Controller
{
    public function __construct(private ContactServiceInterface $contacts)
    {
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $items = ContactMessage::query()
            ->when($request->query('status'), fn (Builder $q, string $v) => $q->where('status', $v))
            ->when($request->query('search'), fn (Builder $q, string $s) => $q->where(
                fn (Builder $w) => $w->where('name', 'ilike', "%{$s}%")
                    ->orWhere('email', 'ilike', "%{$s}%")
                    ->orWhere('subject', 'ilike', "%{$s}%")
            ))
            ->latest()
            ->paginate(min(max((int) $request->query('per_page', 20), 1), 100));

        return ContactMessageAdminResource::collection($items);
    }

    public function show(ContactMessage $message): ContactMessageAdminResource
    {
        return new ContactMessageAdminResource($this->contacts->markRead($message));
    }

    public function destroy(ContactMessage $message): JsonResponse
    {
        $message->delete();

        return response()->json(null, 204);
    }
}
