<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class GalleryItem extends Model
{
    use HasTranslations;

    public array $translatable = ['caption'];

    protected $guarded = [];

    protected function casts(): array
    {
        return ['is_published' => 'boolean'];
    }
}
