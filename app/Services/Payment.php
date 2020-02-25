<?php

namespace App\Services;
use Stripe;

class Payment
{
    public function handlerPayment($token, $total)
    {
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        Stripe\Charge::create([
            "amount" => round(($total / 62)) * 100,
            "currency" => "usd",
            "source" => $token,
            "description" => "test payment"
        ]);
    }
}
