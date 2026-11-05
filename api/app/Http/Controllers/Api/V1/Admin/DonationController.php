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
