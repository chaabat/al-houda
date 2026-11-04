<?php

namespace App\Enums;

enum DonationStatus: string
{
    case Pending = 'pending';
    case Received = 'received';
    case Failed = 'failed';
    case Refunded = 'refunded';
}
