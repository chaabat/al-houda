<?php

namespace App\Http\Resources\Api\V1\Admin;

use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminModelResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = $this->resource->attributesToArray();

        if (method_exists($this->resource, 'getTranslatableAttributes')) {
            foreach ($this->resource->getTranslatableAttributes() as $attribute) {
                $translations = $this->resource->getTranslations($attribute);
                $data[$attribute] = $translations === [] ? (object) [] : $translations;
            }
        }

        foreach (['cover_image', 'photo', 'image'] as $field) {
            if (array_key_exists($field, $data)) {
                $data[$field.'_url'] = Media::url($data[$field]);
            }
        }

        return $data;
    }
}
