#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

[ -f api/artisan ] || { echo "ERROR: api/artisan not found." >&2; exit 1; }
[ -f api/routes/admin.php ] || { echo "ERROR: run the Sanctum script first (api/routes/admin.php missing)." >&2; exit 1; }

mkdir -p api/app/Support \
  api/app/Http/Controllers/Api/V1/Admin \
  api/app/Http/Requests/Api/V1/Admin \
  api/app/Http/Resources/Api/V1/Admin

C=api/app/Http/Controllers/Api/V1/Admin
Q=api/app/Http/Requests/Api/V1/Admin
R=api/app/Http/Resources/Api/V1/Admin

# ------------------------------------------------------------ CSV helper
cat > api/app/Support/Csv.php <<'EOF'
<?php

namespace App\Support;

use Symfony\Component\HttpFoundation\StreamedResponse;

class Csv
{
    /** Neutralizes spreadsheet formulas (CSV injection). */
    public static function cell(mixed $value): string
    {
        $text = (string) ($value ?? '');

        return preg_match('/^[=+\-@\t\r]/', $text) ? "'".$text : $text;
    }

    public static function download(string $filename, array $header, array $rows): StreamedResponse
    {
        return response()->streamDownload(function () use ($header, $rows) {
            $out = fopen('php://output', 'w');
            fwrite($out, "\xEF\xBB\xBF"); // UTF-8 BOM so Excel reads accents
            fputcsv($out, $header, ';', '"', '');
            foreach ($rows as $row) {
                fputcsv($out, $row, ';', '"', '');
            }
            fclose($out);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }
}
EOF

# ------------------------------------------------------------ Requests
cat > $Q/RefuseRegistrationRequest.php <<'EOF'
<?php

namespace App\Http\Requests\Api\V1\Admin;

use Illuminate\Foundation\Http\FormRequest;

class RefuseRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['reason' => ['nullable', 'string', 'max:500']];
    }
}
EOF

cat > $Q/UpdateRegistrationNotesRequest.php <<'EOF'
<?php

namespace App\Http\Requests\Api\V1\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRegistrationNotesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['admin_notes' => ['nullable', 'string', 'max:2000']];
    }
}
EOF

cat > $Q/StoreRegistrationPeriodRequest.php <<'EOF'
<?php

namespace App\Http\Requests\Api\V1\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRegistrationPeriodRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $required = $this->isMethod('post') ? 'required' : 'sometimes';

        $rules = [
            'school_year' => [$required, 'string', 'max:20'],
            'opens_at' => ['nullable', 'date'],
            'closes_at' => ['nullable', 'date', Rule::when($this->filled('opens_at'), ['after:opens_at'])],
            'is_open' => ['sometimes', 'boolean'],
            'closed_message' => ['nullable', 'array'],
        ];

        foreach (['fr', 'ar', 'en', 'de'] as $locale) {
            $rules["closed_message.$locale"] = ['nullable', 'string', 'max:500'];
        }

        return $rules;
    }
}
EOF

# ------------------------------------------------------------ Resources
cat > $R/RegistrationAdminResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Registration */
class RegistrationAdminResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'status' => $this->status->value,
            'parent_name' => $this->parent_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'locale' => $this->locale,
            'refusal_reason' => $this->refusal_reason,
            'admin_notes' => $this->admin_notes,
            'consent_at' => $this->consent_at,
            'decided_at' => $this->decided_at,
            'notified_at' => $this->notified_at,
            'created_at' => $this->created_at,
            'period' => $this->whenLoaded('period', fn () => [
                'id' => $this->period->id,
                'school_year' => $this->period->school_year,
            ]),
            'decided_by' => $this->whenLoaded('decider', fn () => $this->decider?->name),
            'children_count' => $this->whenCounted('children'),
            'children' => $this->whenLoaded('children', fn () => $this->children->map(fn ($child) => [
                'id' => $child->id,
                'first_name' => $child->first_name,
                'last_name' => $child->last_name,
                'birth_date' => $child->birth_date?->format('Y-m-d'),
                'gender' => $child->gender,
                'level' => $child->level,
                'course' => $child->course ? ['id' => $child->course->id, 'title' => $child->course->title] : null,
            ])),
        ];
    }
}
EOF

cat > $R/RegistrationPeriodAdminResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\RegistrationPeriod */
class RegistrationPeriodAdminResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'school_year' => $this->school_year,
            'opens_at' => $this->opens_at,
            'closes_at' => $this->closes_at,
            'is_open' => $this->is_open,
            'is_currently_open' => $this->isCurrentlyOpen(),
            'closed_message' => $this->getTranslations('closed_message'),
            'registrations_count' => $this->whenCounted('registrations'),
        ];
    }
}
EOF

cat > $R/DonationAdminResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Donation */
class DonationAdminResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'method' => $this->method->value,
            'status' => $this->status->value,
            'amount_cents' => $this->amount_cents,
            'currency' => $this->currency,
            'donor_name' => $this->donor_name,
            'donor_email' => $this->donor_email,
            'locale' => $this->locale,
            'wants_receipt' => $this->wants_receipt,
            'provider_ref' => $this->provider_ref,
            'received_at' => $this->received_at,
            'created_at' => $this->created_at,
            'campaign' => $this->whenLoaded('campaign', fn () => $this->campaign
                ? ['id' => $this->campaign->id, 'title' => $this->campaign->title]
                : null),
            'received_by' => $this->whenLoaded('receiver', fn () => $this->receiver?->name),
        ];
    }
}
EOF

cat > $R/ContactMessageAdminResource.php <<'EOF'
<?php

namespace App\Http\Resources\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\ContactMessage */
class ContactMessageAdminResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'subject' => $this->subject,
            'message' => $this->message,
            'locale' => $this->locale,
            'status' => $this->status,
            'read_at' => $this->read_at,
            'created_at' => $this->created_at,
        ];
    }
}
EOF

# ------------------------------------------------------------ Controllers
cat > $C/RegistrationController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\RefuseRegistrationRequest;
use App\Http\Requests\Api\V1\Admin\UpdateRegistrationNotesRequest;
use App\Http\Resources\Api\V1\Admin\RegistrationAdminResource;
use App\Models\Registration;
use App\Services\Interfaces\RegistrationServiceInterface;
use App\Support\Csv;
use DomainException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RegistrationController extends Controller
{
    private const RELATIONS = ['period', 'children.course', 'decider'];

    public function __construct(private RegistrationServiceInterface $registrations)
    {
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $items = $this->filtered($request)
            ->with('period')
            ->withCount('children')
            ->paginate(min(max((int) $request->query('per_page', 20), 1), 100));

        return RegistrationAdminResource::collection($items);
    }

    public function show(Registration $registration): RegistrationAdminResource
    {
        return new RegistrationAdminResource($registration->load(self::RELATIONS));
    }

    public function update(UpdateRegistrationNotesRequest $request, Registration $registration): RegistrationAdminResource
    {
        $registration->update($request->validated());

        return new RegistrationAdminResource($registration->load(self::RELATIONS));
    }

    public function accept(Request $request, Registration $registration): JsonResponse
    {
        try {
            $this->registrations->accept($registration, $request->user());
        } catch (DomainException $e) {
            return response()->json(['message' => $e->getMessage(), 'code' => 'already_decided'], 409);
        }

        return (new RegistrationAdminResource($registration->fresh(self::RELATIONS)))->response();
    }

    public function refuse(RefuseRegistrationRequest $request, Registration $registration): JsonResponse
    {
        try {
            $this->registrations->refuse($registration, $request->user(), $request->validated('reason'));
        } catch (DomainException $e) {
            return response()->json(['message' => $e->getMessage(), 'code' => 'already_decided'], 409);
        }

        return (new RegistrationAdminResource($registration->fresh(self::RELATIONS)))->response();
    }

    public function export(Request $request): StreamedResponse
    {
        $rows = [];

        foreach ($this->filtered($request)->with(['period', 'children.course'])->get() as $r) {
            foreach ($r->children as $child) {
                $rows[] = [
                    $r->reference,
                    $r->status->value,
                    $r->period?->school_year,
                    Csv::cell($r->parent_name),
                    Csv::cell($r->email),
                    $r->phone,
                    $r->locale,
                    Csv::cell($child->first_name),
                    Csv::cell($child->last_name),
                    $child->birth_date?->format('Y-m-d'),
                    Csv::cell($child->course?->title),
                    $r->created_at?->format('Y-m-d H:i'),
                ];
            }
        }

        return Csv::download(
            'inscriptions-'.now()->format('Ymd-His').'.csv',
            ['reference', 'statut', 'annee', 'parent', 'email', 'telephone', 'langue', 'prenom_enfant', 'nom_enfant', 'naissance', 'cours', 'recue_le'],
            $rows,
        );
    }

    private function filtered(Request $request): Builder
    {
        return Registration::query()
            ->when($request->query('status'), fn (Builder $q, string $v) => $q->where('status', $v))
            ->when($request->query('period_id'), fn (Builder $q, $v) => $q->where('period_id', $v))
            ->when($request->query('search'), fn (Builder $q, string $s) => $q->where(
                fn (Builder $w) => $w->where('reference', 'ilike', "%{$s}%")
                    ->orWhere('parent_name', 'ilike', "%{$s}%")
                    ->orWhere('email', 'ilike', "%{$s}%")
            ))
            ->latest();
    }
}
EOF

cat > $C/RegistrationPeriodController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\StoreRegistrationPeriodRequest;
use App\Http\Resources\Api\V1\Admin\RegistrationPeriodAdminResource;
use App\Models\RegistrationPeriod;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RegistrationPeriodController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return RegistrationPeriodAdminResource::collection(
            RegistrationPeriod::withCount('registrations')->latest('id')->get()
        );
    }

    public function show(RegistrationPeriod $period): RegistrationPeriodAdminResource
    {
        return new RegistrationPeriodAdminResource($period->loadCount('registrations'));
    }

    public function store(StoreRegistrationPeriodRequest $request): JsonResponse
    {
        $period = RegistrationPeriod::create($this->payload($request->validated()));

        return (new RegistrationPeriodAdminResource($period))->response()->setStatusCode(201);
    }

    public function update(StoreRegistrationPeriodRequest $request, RegistrationPeriod $period): RegistrationPeriodAdminResource
    {
        $period->update($this->payload($request->validated()));

        return new RegistrationPeriodAdminResource($period->loadCount('registrations'));
    }

    public function destroy(RegistrationPeriod $period): JsonResponse
    {
        if ($period->registrations()->exists()) {
            return response()->json(['message' => 'This period has registrations.', 'code' => 'has_registrations'], 409);
        }

        $period->delete();

        return response()->json(null, 204);
    }

    public function open(RegistrationPeriod $period): RegistrationPeriodAdminResource
    {
        $period->update(['is_open' => true]);

        return new RegistrationPeriodAdminResource($period->loadCount('registrations'));
    }

    public function close(RegistrationPeriod $period): RegistrationPeriodAdminResource
    {
        $period->update(['is_open' => false]);

        return new RegistrationPeriodAdminResource($period->loadCount('registrations'));
    }

    private function payload(array $data): array
    {
        if (array_key_exists('closed_message', $data)) {
            $data['closed_message'] = array_filter($data['closed_message'] ?? [], fn ($v) => filled($v));
        }

        return $data;
    }
}
EOF

cat > $C/DonationController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\Admin\DonationAdminResource;
use App\Models\Donation;
use App\Services\Interfaces\DonationServiceInterface;
use App\Support\Csv;
use DomainException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DonationController extends Controller
{
    public function __construct(private DonationServiceInterface $donations)
    {
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $items = $this->filtered($request)
            ->with(['campaign', 'receiver'])
            ->paginate(min(max((int) $request->query('per_page', 20), 1), 100));

        return DonationAdminResource::collection($items);
    }

    public function show(Donation $donation): DonationAdminResource
    {
        return new DonationAdminResource($donation->load(['campaign', 'receiver']));
    }

    public function markReceived(Request $request, Donation $donation): JsonResponse
    {
        try {
            $this->donations->markReceived($donation, $request->user());
        } catch (DomainException $e) {
            return response()->json(['message' => $e->getMessage(), 'code' => 'not_pending'], 409);
        }

        return (new DonationAdminResource($donation->fresh(['campaign', 'receiver'])))->response();
    }

    public function export(Request $request): StreamedResponse
    {
        $rows = [];

        foreach ($this->filtered($request)->with('campaign')->get() as $d) {
            $rows[] = [
                $d->reference,
                $d->method->value,
                $d->status->value,
                number_format($d->amount_cents / 100, 2, ',', ''),
                $d->currency,
                Csv::cell($d->donor_name),
                Csv::cell($d->donor_email),
                $d->wants_receipt ? 'oui' : 'non',
                Csv::cell($d->campaign?->title),
                $d->created_at?->format('Y-m-d H:i'),
                $d->received_at?->format('Y-m-d H:i'),
            ];
        }

        return Csv::download(
            'dons-'.now()->format('Ymd-His').'.csv',
            ['reference', 'methode', 'statut', 'montant', 'devise', 'donateur', 'email', 'recu_fiscal', 'campagne', 'cree_le', 'recu_le'],
            $rows,
        );
    }

    private function filtered(Request $request): Builder
    {
        return Donation::query()
            ->when($request->query('status'), fn (Builder $q, string $v) => $q->where('status', $v))
            ->when($request->query('method'), fn (Builder $q, string $v) => $q->where('method', $v))
            ->when($request->query('campaign_id'), fn (Builder $q, $v) => $q->where('campaign_id', $v))
            ->when($request->query('search'), fn (Builder $q, string $s) => $q->where(
                fn (Builder $w) => $w->where('reference', 'ilike', "%{$s}%")
                    ->orWhere('donor_name', 'ilike', "%{$s}%")
                    ->orWhere('donor_email', 'ilike', "%{$s}%")
            ))
            ->latest();
    }
}
EOF

cat > $C/ContactMessageController.php <<'EOF'
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
EOF

cat > $C/StatsController.php <<'EOF'
<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\DonationStatus;
use App\Enums\RegistrationStatus;
use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Donation;
use App\Models\Registration;
use App\Services\Interfaces\RegistrationServiceInterface;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    public function __construct(private RegistrationServiceInterface $registrations)
    {
    }

    public function __invoke(): JsonResponse
    {
        return response()->json(['data' => [
            'registrations' => [
                'pending' => Registration::where('status', RegistrationStatus::Pending->value)->count(),
                'accepted' => Registration::where('status', RegistrationStatus::Accepted->value)->count(),
                'refused' => Registration::where('status', RegistrationStatus::Refused->value)->count(),
                'is_open' => $this->registrations->currentPeriod() !== null,
            ],
            'donations' => [
                'pending' => Donation::where('status', DonationStatus::Pending->value)->count(),
                'received_count' => Donation::where('status', DonationStatus::Received->value)->count(),
                'received_total_cents' => (int) Donation::where('status', DonationStatus::Received->value)->sum('amount_cents'),
            ],
            'messages' => [
                'unread' => ContactMessage::where('status', 'new')->count(),
            ],
        ]]);
    }
}
EOF

# ------------------------------------------------------------ Routes
cat > api/routes/admin.php <<'EOF'
<?php

use App\Http\Controllers\Api\V1\Admin\AuthController;
use App\Http\Controllers\Api\V1\Admin\ContactMessageController;
use App\Http\Controllers\Api\V1\Admin\DonationController;
use App\Http\Controllers\Api\V1\Admin\RegistrationController;
use App\Http\Controllers\Api\V1\Admin\RegistrationPeriodController;
use App\Http\Controllers\Api\V1\Admin\StatsController;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware(['auth:sanctum', EnsureAdmin::class])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    Route::get('stats', StatsController::class);

    // Registrations
    Route::get('registrations/export', [RegistrationController::class, 'export']);
    Route::get('registrations', [RegistrationController::class, 'index']);
    Route::get('registrations/{registration}', [RegistrationController::class, 'show']);
    Route::patch('registrations/{registration}', [RegistrationController::class, 'update']);
    Route::post('registrations/{registration}/accept', [RegistrationController::class, 'accept']);
    Route::post('registrations/{registration}/refuse', [RegistrationController::class, 'refuse']);

    // Registration periods
    Route::apiResource('periods', RegistrationPeriodController::class);
    Route::post('periods/{period}/open', [RegistrationPeriodController::class, 'open']);
    Route::post('periods/{period}/close', [RegistrationPeriodController::class, 'close']);

    // Donations
    Route::get('donations/export', [DonationController::class, 'export']);
    Route::get('donations', [DonationController::class, 'index']);
    Route::get('donations/{donation}', [DonationController::class, 'show']);
    Route::post('donations/{donation}/mark-received', [DonationController::class, 'markReceived']);

    // Contact messages
    Route::apiResource('messages', ContactMessageController::class)->only(['index', 'show', 'destroy']);

    // Next batch: courses, posts, categories, events, pages, gallery, team, campaigns, settings, uploads.
});
EOF

docker compose exec -T api php artisan optimize:clear
docker compose exec -T api php artisan route:list --path=api/v1/admin

echo
echo "Done. Test with curl (see chat)."
