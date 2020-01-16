import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';
import { observable, reaction } from 'mobx';

import './Cart.style.css';
import { observer } from 'mobx-react';
import userStore from '../../store/UserStore';

@observer
class CartItem extends Component {
    @observable quantity = 1;
    @observable count = 0;
    @observable total = this.quantity * this.props.product.price;
    constructor(props){
        super(props);
        this.handlerDelete = this.handlerDelete.bind(this);
        this.handlerQuantity = this.handlerQuantity.bind(this);
    }
    componentDidMount() {
        userStore.cartIdsProduct.map( (el) => parseInt(el) ===  parseInt(this.props.product.id) ? this.count++ : 0);
        this.quantity = (this.count);
        userStore.totalSumCart +=  this.quantity * this.props.product.price;
    }

    handlerDelete = (id) => {
        this.props.deleteProduct(id);
    };

    handlerQuantity = (val) => {
        this.quantity = val;
        userStore.changeCartIds(val, this.props.product.id);
        if (  this.quantity > this.count ) {
            userStore.totalSumCart += (this.quantity - this.count) * this.props.product.price;
        } else {
            userStore.totalSumCart -=  (this.count - this.quantity) * this.props.product.price;
        }

    };
    render() {
        return (
            <div className="div-table-row">
                <div className="div-table-col">
                    <button className="bt-delete-product" onClick={() => this.handlerDelete(this.props.product.id)}>
                        <img src={require('../../assets/img/close-red.png')}/>
                    </button>
                    {this.props.product.images.length > 0
                        ? <img alt="" src={this.props.product.images[0].original} height="50" width="50"/>
                        : <img height="50" width="50" src={require('../../assets/img/userPlaceholder.png')}/>
                    }
                </div>
                <div className="div-table-col title">{this.props.product.title}</div>
                <div className="div-table-col">{this.props.product.price}</div>
                <div className="div-table-col">
                    <NumericInput
                        min={0}
                        max={100}
                        value={this.quantity}
                        size={3}
                        onChange={value => this.handlerQuantity(value)}
                    />
                </div>
                <div className="div-table-col">{this.quantity * this.props.product.price}</div>
            </div>
        )
    }
};
export default  CartItem;