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
