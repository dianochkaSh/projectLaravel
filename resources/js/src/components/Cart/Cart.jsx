import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {observable, reaction} from 'mobx';

/* store */
import userStore from '../../store/UserStore';

/* components */
import CartItem from './CartItem';
import Loader from '../Loader/LoaderElement';
import './Cart.style.css';

inject('userStore');
@observer
class Cart extends Component {
    @observable isLoaded = true;
    constructor(props){
        super(props);
        this.handlerDeleteProduct = this.handlerDeleteProduct.bind(this);
        this.handlerOpenOrder = this.handlerOpenOrder.bind(this);
        reaction(() => userStore.cart  , () => {
            this.isLoaded = false;
        });
    }

    handlerDeleteProduct(id) {
        userStore.deleteProductFromCart(id);
    }
    handlerOpenOrder = () => {
        this.props.history.push('/order');
    };

    render() {
        let totalCart = userStore.cart.length > 0 ? userStore.cart.reduce((acc, item) => acc += (parseInt(item.price) * parseInt(item.quantity)), 0 ) :0;
        return (
            <div className="cart">
                <h4>Cart</h4>
                {  userStore.cartIdsProduct.length === 0  && <div> Cart is empty </div> }
                { (userStore.cart.length === 0 && userStore.cartIdsProduct.length > 0 )
                    ? <Loader load={this.isLoaded}/>

                    : <div>
                        {userStore.cart.length > 0 &&
                        <div>
                            <div className="cart-container">
                                <div className="div-table">
                                    <div className="div-table-row">
                                        <div className="div-table-col"> №</div>
                                        <div className="div-table-col">Product</div>
                                        <div className="div-table-col">Price</div>
                                        <div className="div-table-col">Quantity</div>
                                        <div className="div-table-col">Total</div>
                                    </div>

                                    { userStore.cart.map((product, i) =>
                                        <CartItem
                                            product={product}
                                            key={i}
                                            deleteProduct={this.handlerDeleteProduct}
                                        />
                                        )
                                    }
                                </div>

                            </div>
                            <div className="content-cart-total">
                                <p><b>Total:</b> <span>{ totalCart }</span> </p>
                            </div>
                            <button
                                className="btn btn-primary btn-to-order"
                                onClick={this.handlerOpenOrder}
                            >
                                Proceed to
                                checkout
                            </button>
                        </div>
                        }
                    </div>
                }
            </div>
        )
    }
};

export default Cart;