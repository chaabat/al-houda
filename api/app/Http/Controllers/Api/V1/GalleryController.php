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
