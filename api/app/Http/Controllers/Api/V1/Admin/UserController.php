<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\Admin\AdminUserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    private const ROLES = ['super_admin', 'admin'];

    public function index(Request $request): AnonymousResourceCollection
    {
        return AdminUserResource::collection(
            User::with('roles')->orderBy('name')->paginate(min(max((int) $request->query('per_page', 20), 1), 100))
        );
    }

    public function show(User $user): AdminUserResource
    {
        return new AdminUserResource($user);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:190', Rule::unique('users', 'email')],
            'password' => ['required', Password::min(12)->letters()->numbers()],
            'role' => ['required', Rule::in(self::ROLES)],
        ]);

        $user = User::create(['name' => $data['name'], 'email' => $data['email'], 'password' => $data['password']]);
        $user->syncRoles([$data['role']]);
        $this->audit('created', $user, $request);

        return (new AdminUserResource($user))->response()->setStatusCode(201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:120'],
            'email' => ['sometimes', 'required', 'email:rfc', 'max:190', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['sometimes', 'required', Password::min(12)->letters()->numbers()],
            'role' => ['sometimes', 'required', Rule::in(self::ROLES)],
        ]);

        if (isset($data['role']) && $data['role'] !== 'super_admin' && $this->isLastSuperAdmin($user)) {
            return response()->json(['message' => 'At least one super admin is required.', 'code' => 'last_super_admin'], 409);
        }

        $role = $data['role'] ?? null;
        unset($data['role']);

        $user->update($data);

        if ($role) {
            $user->syncRoles([$role]);
        }

        if (isset($data['password'])) {
            $tokens = $user->tokens();
            if ($user->is($request->user())) {
                $tokens->where('id', '!=', $request->user()->currentAccessToken()->id);
            }
            $tokens->delete();
        }

        $this->audit('updated', $user, $request);

        return (new AdminUserResource($user->fresh('roles')))->response();
    }

    public function destroy(Request $request, User $user): JsonResponse
    {
        if ($user->is($request->user())) {
            return response()->json(['message' => 'You cannot delete yourself.', 'code' => 'self_delete'], 422);
        }

        if ($this->isLastSuperAdmin($user)) {
            return response()->json(['message' => 'At least one super admin is required.', 'code' => 'last_super_admin'], 409);
        }

        $this->audit('deleted', $user, $request);
        $user->tokens()->delete();
        $user->delete();

        return response()->json(null, 204);
    }

    private function isLastSuperAdmin(User $user): bool
    {
        return $user->hasRole('super_admin') && User::role('super_admin')->count() <= 1;
    }

    private function audit(string $event, User $user, Request $request): void
    {
        rescue(fn () => activity('admin')
            ->causedBy($request->user())
            ->performedOn($user)
            ->event($event)
            ->log($event));
    }
}
