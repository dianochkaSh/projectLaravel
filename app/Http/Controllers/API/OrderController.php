<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Payment;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailtrapCheckoutSuccessfull;

class OrderController extends Controller
{

    public function createOrder(Request $request)
    {
        $payment  = new Payment();
        $payment->handlerPayment($request->get('token'), $request->get('totalSum'));
        Mail::to($request->get('email'))->send(new MailtrapCheckoutSuccessfull($request->get('username')));
    }
}
