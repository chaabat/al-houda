<?php

namespace App\Models;

use App\Enums\RegistrationStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Registration extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'status' => RegistrationStatus::class,
            'consent_at' => 'datetime',
            'decided_at' => 'datetime',
            'notified_at' => 'datetime',
        ];
    }

    public function period(): BelongsTo
    {
        return $this->belongsTo(RegistrationPeriod::class, 'period_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(RegistrationChild::class);
    }

    public function decider(): BelongsTo
    {
        return $this->belongsTo(User::class, 'decided_by');
    }
}
