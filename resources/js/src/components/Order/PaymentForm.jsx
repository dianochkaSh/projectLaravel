import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { STRIPE_PUBLIC_KEY } from '../../constants/costants';

import './PaymentForm.style.css';
import CheckoutForm from './CheckoutForm/CheckoutForm';

/* components */
const PaymentForm = (props) => {
    return (
        <div className="payment-content">
            <h4>Payment details</h4>
            <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
                <div>
                    <Elements>
                        <CheckoutForm
                            total = {props.total}
                        />
                    </Elements>
                </div>
            </StripeProvider>
        </div>
    );
};
export default PaymentForm;
