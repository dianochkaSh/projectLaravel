import React, { Component } from 'react';

/* store */
import userStore from '../../store/UserStore';
import CartItem from './CartItem';
import './Cart.style.css';

class Cart extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
        if( userStore.cartUser.length > 0 ) {
            userStore.getCartProduct();
        }
    }

    render() {
        return (
            <div>
                <h4>Cart</h4>
                {   userStore.cart &&
                <div className="cart-container">
                        {   userStore.cart.map(( product, i ) =>
                                <CartItem
                                    product={product}
                                    key={i}
                                />
                            )
                        }

                    </div>

                }
            </div>
        )
    }
};

export default Cart;