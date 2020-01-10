import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {observable, reaction} from 'mobx';

/* store */
import userStore from '../../store/UserStore';
import CartItem from './CartItem';
import './Cart.style.css';

inject('userStore');
@observer
class Cart extends Component {
    constructor(props){
        super(props);
        this.handlerDeleteProduct = this.handlerDeleteProduct.bind(this);
        this.handlerOpenOrder = this.handlerOpenOrder.bind(this);
    }
    componentDidMount() {
        if( userStore.cartUser.length > 0 ) {
            userStore.getCartProduct();
        }
    }
    handlerDeleteProduct(id) {
        userStore.deleteProductFromCart(id);
    }
    handlerOpenOrder = () => {
        this.props.history.push('/order');
    };

    render() {
        return (
            <div>
                <h4>Cart</h4>
                {   userStore.cart.length > 0
                ? <div className="cart">
                        <div className="cart-container">
                            <div className="div-table">
                                <div className="div-table-row">
                                    <div className="div-table-col"> №</div>
                                    <div className="div-table-col">Product</div>
                                    <div className="div-table-col">Price</div>
                                    <div className="div-table-col">Quantity</div>
                                    <div className="div-table-col">Total</div>
                                </div>

                                {userStore.cart.map((product, i) =>
                                    <CartItem
                                        product={product}
                                        key={i}
                                        deleteProduct={this.handlerDeleteProduct}
                                    />
                                )
                                }
                            </div>
                        </div>
                    <button className="btn btn-primary btn-to-order" onClick={this.handlerOpenOrder}>Proceed to checkout</button>

                </div>
                    : <div>Cart is empty</div>

                }
            </div>
        )
    }
};

export default Cart;