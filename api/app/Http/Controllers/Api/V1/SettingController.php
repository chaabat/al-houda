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
