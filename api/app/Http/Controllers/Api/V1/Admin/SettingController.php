<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    private const RULES = [
        'site' => [
            'value' => ['required', 'array:name'],
            'value.name' => ['required', 'string', 'max:120'],
        ],
        'contact' => [
            'value' => ['required', 'array:address,phone,email'],
            'value.address' => ['nullable', 'string', 'max:255'],
            'value.phone' => ['nullable', 'string', 'max:30'],
            'value.email' => ['nullable', 'email', 'max:190'],
        ],
        'social' => [
            'value' => ['required', 'array:facebook,youtube,instagram'],
            'value.facebook' => ['nullable', 'url:https', 'max:255'],
            'value.youtube' => ['nullable', 'url:https', 'max:255'],
            'value.instagram' => ['nullable', 'url:https', 'max:255'],
        ],
        'opening_hours' => [
            'value' => ['required', 'array', 'max:20'],
            'value.*' => ['nullable', 'string', 'max:200'],
        ],
        'mawaqit_widget_url' => [
            'value' => ['nullable', 'url:https', 'max:500'],
        ],
        'rib' => [
            'value' => ['required', 'array:holder,iban,bic'],
            'value.holder' => ['required', 'string', 'max:120'],
            'value.iban' => ['required', 'string', 'regex:/^[A-Z]{2}[0-9A-Z ]{13,32}$/'],
            'value.bic' => ['required', 'string', 'regex:/^[A-Z0-9]{8,11}$/'],
        ],
    ];

    public function index(): JsonResponse
    {
        $stored = Setting::all()->mapWithKeys(fn (Setting $s) => [$s->name => $s->value]);
        $data = [];

        foreach (array_keys(self::RULES) as $key) {
            $data[$key] = $stored[$key] ?? null;
        }

        return response()->json(['data' => $data]);
    }

    public function update(Request $request, string $name): JsonResponse
    {
        $rules = self::RULES[$name] ?? null;
        abort_if($rules === null, 404);

        $validated = $request->validate($rules);
        $setting = Setting::updateOrCreate(['name' => $name], ['value' => $validated['value'] ?? null]);

        rescue(fn () => activity('admin')
            ->causedBy($request->user())
            ->event('updated')
            ->withProperties(['setting' => $name])
            ->log("setting {$name} updated"));

        return response()->json(['data' => ['name' => $name, 'value' => $setting->value]]);
    }
}
