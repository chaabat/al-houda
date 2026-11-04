#!/usr/bin/env bash
# Al-Houda: Sanctum token auth for the admin API.
# Run from anywhere: bash setup-sanctum.sh   (the script moves to its own folder = repo root)
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f api/artisan ]; then
  echo "ERROR: api/artisan not found. Put this script in the repo root (next to the api/ folder)." >&2
  exit 1
fi

mkdir -p api/app/Http/Middleware \
  api/app/Http/Controllers/Api/V1/Admin \
  api/app/Http/Requests/Api/V1/Admin \
  api/app/Http/Resources/Api/V1/Admin

# ---------------------------------------------------------------- Install Sanctum
docker compose exec -T api composer require laravel/sanctum
docker compose exec -T api php artisan vendor:publish --provider='Laravel\Sanctum\SanctumServiceProvider'
docker compose exec -T api php artisan migrate

# Tokens expire after 12 hours (720 minutes)
if [ -f api/config/sanctum.php ]; then
  sed -i "s/'expiration' => null/'expiration' => 720/" api/config/sanctum.php
fi

# ---------------------------------------------------------------- User model (adds HasApiTokens + isAdmin)
cat > api/app/Models/User.php <<'EOF'
<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = ['name', 'email', 'password'];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->hasAnyRole(['super_admin', 'admin']);
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->isAdmin();
    }
}
EOF

# ---------------------------------------------------------------- Middleware: only admins
cat > api/app/Http/Middleware/EnsureAdmin.php <<'EOF'
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! $user->isAdmin()) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        return $next($request);
    }
}
EOF

# ---------------------------------------------------------------- Request, resource, controller
cat > api/app/Http/Requests/Api/V1/Admin/LoginRequest.php <<'EOF'
<?php

namespace App\Http\Requests\Api\V1\Admin;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ];
    }
}
EOF

cat > api/app/Http/Resources/Api/V1/Admin/AdminUserResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\User */
class AdminUserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'roles' => $this->getRoleNames(),
        ];
    }
}
EOF

cat > api/app/Http/Controllers/Api/V1/Admin/AuthController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\LoginRequest;
use App\Http\Resources\Api\V1\Admin\AdminUserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->validated('email'))->first();

        if (! $user || ! Hash::check($request->validated('password'), $user->password) || ! $user->isAdmin()) {
            throw ValidationException::withMessages(['email' => [__('auth.failed')]]);
        }

        return response()->json(['data' => [
            'token' => $user->createToken('admin')->plainTextToken,
            'user' => new AdminUserResource($user),
        ]]);
    }

    public function me(Request $request): AdminUserResource
    {
        return new AdminUserResource($request->user());
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['data' => ['logged_out' => true]]);
    }
}
EOF

# ---------------------------------------------------------------- Routes: admin file, loaded from api.php
cat > api/routes/admin.php <<'EOF'
<?php

use App\Http\Controllers\Api\V1\Admin\AuthController;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware(['auth:sanctum', EnsureAdmin::class])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    // Admin endpoints are added here in the next batches.
});
EOF

if ! grep -q "routes/admin.php" api/routes/api.php; then
  printf "\nRoute::prefix('admin')->group(base_path('routes/admin.php'));\n" >> api/routes/api.php
fi

docker compose exec -T api php artisan optimize:clear
docker compose exec -T api php artisan route:list --path=api/v1/admin

echo
echo "Done. Expected: POST admin/login, POST admin/logout, GET admin/me."
