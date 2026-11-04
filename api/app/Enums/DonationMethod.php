<?php

namespace App\Enums;

enum DonationMethod: string
{
    case Rib = 'rib';
    case Stripe = 'stripe';
    case HelloAsso = 'helloasso';
}
