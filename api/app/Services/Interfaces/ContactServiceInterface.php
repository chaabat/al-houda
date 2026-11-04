<?php

namespace App\Services\Interfaces;

use App\Models\ContactMessage;

interface ContactServiceInterface
{
    public function store(array $data): ContactMessage;

    public function markRead(ContactMessage $message): ContactMessage;
}
