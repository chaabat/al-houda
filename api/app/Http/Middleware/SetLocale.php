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
