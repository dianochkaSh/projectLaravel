import React, { Component } from 'react';
import InputMask from 'react-input-mask';

import './PaymentForm.style.css';

/* components */
const PaymentForm = () => {
    return(
        <div className="payment-content">
            <h4>Payment details</h4>
            <InputMask
                className="input-card"
                mask="9999-9999-9999-9999"
                placeholder="Card number"
            />
            <InputMask
                className="input-fields"
                mask="99/99"
                placeholder="MM/YY"
            />
            <InputMask
                mask="999"
                className="input-fields"
                placeholder="CVC"
            />

        </div>
    );
};
export default PaymentForm;