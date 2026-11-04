#!/usr/bin/env bash
# Al-Houda: creates the public API layer (batch 2).
# Run from anywhere: bash setup-public-api.sh   (the script moves to its own folder = repo root)
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f api/artisan ]; then
  echo "ERROR: api/artisan not found. Put this script in the repo root (next to the api/ folder)." >&2
  exit 1
fi

mkdir -p api/app/Http/Middleware api/app/Support \
  api/app/Http/Controllers/Api/V1 api/app/Http/Resources/Api/V1 api/app/Http/Requests/Api/V1

# ---------------------------------------------------------------- Middleware + Support
cat > api/app/Http/Middleware/SetLocale.php <<'EOF'
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    private const SUPPORTED = ['fr', 'ar', 'en', 'de'];

    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->query('locale');

        if (! in_array($locale, self::SUPPORTED, true)) {
            $locale = $request->getPreferredLanguage(self::SUPPORTED) ?? 'fr';
        }

        app()->setLocale($locale);

        return $next($request);
    }
}
EOF

cat > api/app/Support/Media.php <<'EOF'
<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;

class Media
{
    public static function url(?string $path): ?string
    {
        return $path ? Storage::disk('public')->url($path) : null;
    }
}
EOF

# ---------------------------------------------------------------- Resources (output)
R=api/app/Http/Resources/Api/V1

cat > $R/PageResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Page */
class PageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'body' => $this->body,
            'updated_at' => $this->updated_at,
        ];
    }
}
EOF

cat > $R/TeamMemberResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\TeamMember */
class TeamMemberResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'photo' => Media::url($this->photo),
        ];
    }
}
EOF

cat > $R/GalleryItemResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\GalleryItem */
class GalleryItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'image' => Media::url($this->image),
            'caption' => $this->caption,
        ];
    }
}
EOF

cat > $R/CategoryResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Category */
class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
        ];
    }
}
EOF

cat > $R/PostResource.php <<'EOF'
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
EOF

cat > $R/EventResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Event */
class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'location' => $this->location,
            'cover_image' => Media::url($this->cover_image),
            'starts_at' => $this->starts_at,
            'ends_at' => $this->ends_at,
            'description' => $this->when($request->routeIs('events.show'), fn () => $this->description),
        ];
    }
}
EOF

cat > $R/CourseResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Course */
class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'schedule' => $this->schedule,
            'level' => $this->level,
            'age_min' => $this->age_min,
            'age_max' => $this->age_max,
            'teacher_name' => $this->teacher_name,
        ];
    }
}
EOF

cat > $R/DonationCampaignResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\DonationCampaign */
class DonationCampaignResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $raised = (int) ($this->raised_cents ?? 0);
        $goal = $this->goal_cents;

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'cover_image' => Media::url($this->cover_image),
            'goal_cents' => $goal,
            'raised_cents' => $raised,
            'progress_percent' => $goal ? min(100, (int) round($raised / $goal * 100)) : null,
            'ends_at' => $this->ends_at,
        ];
    }
}
EOF

# ---------------------------------------------------------------- Form Requests (input)
Q=api/app/Http/Requests/Api/V1

cat > $Q/StoreContactRequest.php <<'EOF'
<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:190'],
            'subject' => ['nullable', 'string', 'max:190'],
            'message' => ['required', 'string', 'max:3000'],
            'locale' => ['nullable', Rule::in(['fr', 'ar', 'en', 'de'])],
            'website' => ['prohibited'], // honeypot: must stay empty
        ];
    }
}
EOF

cat > $Q/StoreRibDonationRequest.php <<'EOF'
<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRibDonationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $needsIdentity = Rule::requiredIf(fn () => $this->boolean('wants_receipt'));

        return [
            'amount_cents' => ['required', 'integer', 'min:100', 'max:10000000'],
            'donor_name' => [$needsIdentity, 'nullable', 'string', 'max:120'],
            'donor_email' => [$needsIdentity, 'nullable', 'email:rfc', 'max:190'],
            'wants_receipt' => ['nullable', 'boolean'],
            'campaign_id' => ['nullable', Rule::exists('donation_campaigns', 'id')->where('is_active', true)],
            'locale' => ['nullable', Rule::in(['fr', 'ar', 'en', 'de'])],
        ];
    }
}
EOF

# ---------------------------------------------------------------- Controllers
C=api/app/Http/Controllers/Api/V1

cat > $C/SettingController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    private const PUBLIC_KEYS = ['site', 'contact', 'social', 'opening_hours', 'mawaqit_widget_url'];

    public function index(): JsonResponse
    {
        $data = Setting::whereIn('name', self::PUBLIC_KEYS)->get()
            ->mapWithKeys(fn (Setting $s) => [$s->name => $s->value])
            ->all();

        return response()->json(['data' => (object) $data]);
    }
}
EOF

cat > $C/PageController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\PageResource;
use App\Models\Page;

class PageController extends Controller
{
    public function show(string $slug): PageResource
    {
        return new PageResource(Page::where('slug', $slug)->where('is_published', true)->firstOrFail());
    }
}
EOF

cat > $C/TeamController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\TeamMemberResource;
use App\Models\TeamMember;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TeamController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return TeamMemberResource::collection(TeamMember::orderBy('sort')->get());
    }
}
EOF

cat > $C/GalleryController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\GalleryItemResource;
use App\Models\GalleryItem;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class GalleryController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return GalleryItemResource::collection(
            GalleryItem::where('is_published', true)->orderBy('sort')->get()
        );
    }
}
EOF

cat > $C/CategoryController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return CategoryResource::collection(Category::orderBy('slug')->get());
    }
}
EOF

cat > $C/PostController.php <<'EOF'
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
EOF

cat > $C/EventController.php <<'EOF'
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
EOF

cat > $C/CourseController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\CourseResource;
use App\Models\Course;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CourseController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return CourseResource::collection(Course::where('is_active', true)->orderBy('sort')->get());
    }
}
EOF

cat > $C/ContactController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreContactRequest;
use App\Services\Interfaces\ContactServiceInterface;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function __construct(private ContactServiceInterface $contacts)
    {
    }

    public function store(StoreContactRequest $request): JsonResponse
    {
        $this->contacts->store($request->validated());

        return response()->json(['data' => ['received' => true]], 201);
    }
}
EOF

cat > $C/DonationCampaignController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\DonationCampaignResource;
use App\Models\DonationCampaign;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DonationCampaignController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $campaigns = DonationCampaign::query()
            ->where('is_active', true)
            ->where(fn (Builder $q) => $q->whereNull('starts_at')->orWhere('starts_at', '<=', now()))
            ->where(fn (Builder $q) => $q->whereNull('ends_at')->orWhere('ends_at', '>=', now()))
            ->withSum(['donations as raised_cents' => fn (Builder $q) => $q->where('status', 'received')], 'amount_cents')
            ->orderBy('id')
            ->get();

        return DonationCampaignResource::collection($campaigns);
    }
}
EOF

cat > $C/DonationController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreRibDonationRequest;
use App\Services\Interfaces\DonationServiceInterface;
use Illuminate\Http\JsonResponse;

class DonationController extends Controller
{
    public function __construct(private DonationServiceInterface $donations)
    {
    }

    public function rib(): JsonResponse
    {
        return response()->json(['data' => $this->donations->ribDetails()]);
    }

    public function storeRib(StoreRibDonationRequest $request): JsonResponse
    {
        $donation = $this->donations->createRib($request->validated());

        return response()->json(['data' => [
            'reference' => $donation->reference,
            'amount_cents' => $donation->amount_cents,
            'currency' => $donation->currency,
            'rib' => $this->donations->ribDetails(),
        ]], 201);
    }
}
EOF

# ---------------------------------------------------------------- Routes
cat > api/routes/api.php <<'EOF'
<?php

use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\CourseController;
use App\Http\Controllers\Api\V1\DonationCampaignController;
use App\Http\Controllers\Api\V1\DonationController;
use App\Http\Controllers\Api\V1\EventController;
use App\Http\Controllers\Api\V1\GalleryController;
use App\Http\Controllers\Api\V1\PageController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\RegistrationController;
use App\Http\Controllers\Api\V1\SettingController;
use App\Http\Controllers\Api\V1\TeamController;
use App\Http\Middleware\SetLocale;
use Illuminate\Support\Facades\Route;

Route::middleware(SetLocale::class)->group(function () {
    // Content
    Route::get('settings', [SettingController::class, 'index']);
    Route::get('pages/{slug}', [PageController::class, 'show']);
    Route::get('team', [TeamController::class, 'index']);
    Route::get('gallery', [GalleryController::class, 'index']);
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('posts', [PostController::class, 'index']);
    Route::get('posts/{slug}', [PostController::class, 'show'])->name('posts.show');
    Route::get('events', [EventController::class, 'index']);
    Route::get('events/{slug}', [EventController::class, 'show'])->name('events.show');
    Route::get('courses', [CourseController::class, 'index']);

    // Registrations
    Route::get('registration-status', [RegistrationController::class, 'status']);
    Route::post('registrations', [RegistrationController::class, 'store'])->middleware('throttle:5,1');

    // Contact
    Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:5,1');

    // Donations
    Route::get('donation-campaigns', [DonationCampaignController::class, 'index']);
    Route::get('donations/rib', [DonationController::class, 'rib']);
    Route::post('donations/rib', [DonationController::class, 'storeRib'])->middleware('throttle:10,1');
});
EOF

# ---------------------------------------------------------------- Demo data seeder
cat > api/database/seeders/DemoContentSeeder.php <<'EOF'
<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\DonationCampaign;
use App\Models\Event;
use App\Models\Page;
use App\Models\Post;
use App\Models\Setting;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;

/** Fictional demo data: must be validated or replaced by the mosque before launch. */
class DemoContentSeeder extends Seeder
{
    public function run(): void
    {
        $fake = 'Texte fictif, à valider par les responsables.';

        $announcements = Category::updateOrCreate(['slug' => 'annonces'], ['name' => ['fr' => 'Annonces', 'en' => 'Announcements']]);
        $teaching = Category::updateOrCreate(['slug' => 'enseignement'], ['name' => ['fr' => 'Enseignement', 'en' => 'Teaching']]);

        $posts = [
            ['cours-de-coran', $teaching, 'Cours de Coran pour tous', 'Quran classes for everyone', 3],
            ['inscriptions-ouvertes', $announcements, "Inscriptions de l'année scolaire", 'School year registrations', 2],
            ['collecte-renovation', $announcements, 'Projet de rénovation', 'Renovation project', 1],
        ];
        foreach ($posts as [$slug, $category, $titleFr, $titleEn, $daysAgo]) {
            Post::updateOrCreate(['slug' => $slug], [
                'category_id' => $category->id,
                'title' => ['fr' => $titleFr, 'en' => $titleEn],
                'excerpt' => ['fr' => $fake],
                'body' => ['fr' => $fake.' Contenu de démonstration.'],
                'status' => 'published',
                'published_at' => now()->subDays($daysAgo),
            ]);
        }

        Event::updateOrCreate(['slug' => 'conference-exemple'], [
            'title' => ['fr' => 'Conférence (exemple)', 'en' => 'Lecture (example)'],
            'description' => ['fr' => $fake],
            'location' => 'À définir',
            'starts_at' => now()->addDays(10)->setTime(19, 0),
            'is_published' => true,
        ]);
        Event::updateOrCreate(['slug' => 'portes-ouvertes-exemple'], [
            'title' => ['fr' => 'Portes ouvertes (exemple)'],
            'description' => ['fr' => $fake],
            'location' => 'À définir',
            'starts_at' => now()->addDays(25)->setTime(14, 0),
            'is_published' => true,
        ]);

        foreach ([
            'history' => ['Histoire', 'History'],
            'mission' => ['Mission', 'Mission'],
            'values' => ['Valeurs', 'Values'],
            'privacy' => ['Politique de confidentialité', 'Privacy policy'],
            'legal-notice' => ['Mentions légales', 'Legal notice'],
        ] as $slug => [$fr, $en]) {
            Page::updateOrCreate(['slug' => $slug], [
                'title' => ['fr' => $fr, 'en' => $en],
                'body' => ['fr' => $fake],
                'is_published' => true,
            ]);
        }

        TeamMember::updateOrCreate(['name' => 'Responsable (exemple)'], ['role' => ['fr' => 'Président (exemple)', 'en' => 'President (example)'], 'sort' => 1]);
        TeamMember::updateOrCreate(['name' => 'Enseignant (exemple)'], ['role' => ['fr' => 'Enseignant (exemple)'], 'sort' => 2]);

        foreach ([
            ['coran-debutant', 'Coran débutant', 'Quran beginners', 'Samedi 10h-12h', 1],
            ['arabe-enfants', 'Arabe pour enfants', 'Arabic for children', 'Mercredi 14h-16h', 2],
            ['fiqh-adultes', 'Fiqh pour adultes', 'Fiqh for adults', 'Vendredi 19h-20h30', 3],
        ] as [$slug, $fr, $en, $schedule, $sort]) {
            Course::updateOrCreate(['slug' => $slug], [
                'title' => ['fr' => $fr, 'en' => $en],
                'description' => ['fr' => $fake],
                'schedule' => ['fr' => $schedule],
                'max_places' => 20,
                'sort' => $sort,
                'is_active' => true,
            ]);
        }

        DonationCampaign::updateOrCreate(['slug' => 'renovation'], [
            'title' => ['fr' => 'Rénovation (exemple)', 'en' => 'Renovation (example)'],
            'description' => ['fr' => $fake],
            'goal_cents' => 5000000,
            'is_active' => true,
        ]);

        Setting::updateOrCreate(['name' => 'site'], ['value' => ['name' => 'Institution Al-Houda · Illzach']]);
        Setting::updateOrCreate(['name' => 'contact'], ['value' => ['address' => 'Adresse à valider', 'phone' => '00 00 00 00 00', 'email' => 'contact@exemple.fr']]);
        Setting::updateOrCreate(['name' => 'social'], ['value' => ['facebook' => null, 'youtube' => null]]);
        Setting::updateOrCreate(['name' => 'rib'], ['value' => [
            'holder' => 'Association Al-Houda (exemple)',
            'iban' => 'FR76 0000 0000 0000 0000 0000 000',
            'bic' => 'XXXXXXXX',
        ]]);
    }
}
EOF

# ---------------------------------------------------------------- Run
docker compose exec -T api php artisan optimize:clear
docker compose exec -T api php artisan db:seed --class=DemoContentSeeder
docker compose exec -T api php artisan route:list --path=api

echo
echo "Done. 16 API routes expected above. Now test with curl (see chat)."
