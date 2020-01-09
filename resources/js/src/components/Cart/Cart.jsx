import React, { Component } from 'react';

/* store */
import userStore from '../../store/UserStore';

class Cart extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
        console.log(userStore.cartUser);
    }

    render() {
        return (
            <div>
                <h4>Cart</h4>
            </div>
        )
    }
};

export default Cart;