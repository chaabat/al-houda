<?php

namespace App\Services\Implementations;

use App\Models\ContactMessage;
use App\Services\Interfaces\ContactServiceInterface;

class ContactService implements ContactServiceInterface
{
    public function store(array $data): ContactMessage
    {
        return ContactMessage::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'subject' => $data['subject'] ?? null,
            'message' => $data['message'],
            'locale' => $data['locale'] ?? 'fr',
            'status' => 'new',
        ]);
    }

    public function markRead(ContactMessage $message): ContactMessage
    {
        if ($message->status === 'new') {
            $message->update(['status' => 'read', 'read_at' => now()]);
        }

        return $message;
    }
}
