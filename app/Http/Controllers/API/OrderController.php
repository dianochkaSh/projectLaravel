<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe;

class OrderController extends Controller {

    public function createOrder(Request $request) {

        $s = 2;
        $this->payment();
    }

    public function payment() {
//        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
//        Stripe\Charge::create ([
//            "amount" => 100 * 100,
//            "currency" => "usd",
//            "source" => $request->stripeToken,
//            "description" => "Test payment from itsolutionstuff.com."
//        ]);
//
//
//
//        return back();
    }
}