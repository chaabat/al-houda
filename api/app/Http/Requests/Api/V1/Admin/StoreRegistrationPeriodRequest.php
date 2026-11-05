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
