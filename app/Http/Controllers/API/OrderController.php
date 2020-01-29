<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailtrapCheckoutSuccessfull;

class OrderController extends Controller {

    public function createOrder(Request $request) {

        $result = $this->payment($request->get('totalSum'), $request->get('token'));
        $sendMail = Mail::to('dianochkad@yandex.ru')->send(new MailtrapCheckoutSuccessfull($request->get('username')));
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