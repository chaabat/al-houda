<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'parent_name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:190'],
            'phone' => ['required', 'string', 'max:30', 'regex:/^[0-9+().\s-]{6,30}$/'],
            'address' => ['nullable', 'string', 'max:255'],
            'locale' => ['required', Rule::in(['fr', 'ar', 'en', 'de'])],
            'consent' => ['required', 'accepted'],
            'children' => ['required', 'array', 'min:1', 'max:8'],
            'children.*.first_name' => ['required', 'string', 'max:80'],
            'children.*.last_name' => ['required', 'string', 'max:80'],
            'children.*.birth_date' => ['required', 'date_format:Y-m-d', 'before:today', 'after:'.now()->subYears(25)->toDateString()],
            'children.*.gender' => ['nullable', Rule::in(['male', 'female'])],
            'children.*.level' => ['nullable', 'string', 'max:50'],
            'children.*.course_id' => ['nullable', Rule::exists('courses', 'id')->where('is_active', true)],
        ];
    }
}
