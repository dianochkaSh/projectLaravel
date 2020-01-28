import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CardNumberElement, injectStripe, CardExpiryElement, CardElement, CardCVCElement } from 'react-stripe-elements';

/* store */
import cartStore from '../../../store/CartStore';

/* style */
import './CheckoutForm.style.css';

inject('cartStore');
@observer
class CheckoutForm extends Component {
    constructor(props){
        super(props);
        this.handlerOrder = this.handlerOrder.bind(this);
    }

    async handlerOrder () {
        let {token} = await this.props.stripe.createToken({name: 'test'});
        cartStore.getSubmitOrder(this.props.total, token.id);

    };
    render() {
        return (
            <div>
                <div>
                    <div>
                        <label className='label-checkout-payment'>
                            Number card
                            <CardNumberElement
                                className='form-control donate-input-element'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='label-checkout-payment'>
                            Expiration Date
                            <CardExpiryElement
                                className='form-control donate-input-element'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='label-checkout-payment'>
                            CVC
                            <CardCVCElement
                                className='form-control donate-input-element'
                            />
                        </label>
                    </div>
                    <div className="content-btn-order-submit">
                        <button onClick={() => this.handlerOrder()} className="btn btn-primary"> Submit Order
                        </button>
                    </div>
                </div>
            </div>
        );
    };
};
export default injectStripe(CheckoutForm);
