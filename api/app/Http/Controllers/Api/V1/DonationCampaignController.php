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
