<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe;

class OrderController extends Controller {

    public function createOrder(Request $request) {

        $result = $this->payment($request->get('totalSum'), $request->get('token'));
       // send mail
    }

    public function payment($total, $token) {
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $charge = Stripe\Charge::create ([
            "amount" => round(($total / 62 ))* 100,
            "currency" => "usd",
            "source" => $token,
            "description" => "test payment"
        ]);

        return $charge;
    }
}