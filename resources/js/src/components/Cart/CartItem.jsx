import React from 'react';
import NumericInput from 'react-numeric-input';

/* style */
import './Cart.style.css';

/* store */
import userStore from '../../store/UserStore';

const CartItem  = (props) => {
    const handlerDelete = (id) => {
        props.deleteProduct(id);
    };

    const handlerQuantity = (val) => {
        userStore.changeCartIds(val, props.product.id);
    };
    return (
        <div className="div-table-row">
            <div className="div-table-col">
                <button className="bt-delete-product" onClick={() => handlerDelete(props.product.id)}>
                    <img src={require('../../assets/img/close-red.png')}/>
                </button>
                {/*{this.props.product.images.length > 0*/}
                {/*? <img alt="" src={this.props.product.images[0].original} height="50" width="50"/>*/}
                {/*: <img height="50" width="50" src={require('../../assets/img/userPlaceholder.png')}/>*/}
                {/*}*/}
            </div>
            <div className="div-table-col title">{props.product.title}</div>
            <div className="div-table-col">{props.product.price}</div>
            <div className="div-table-col">
                <NumericInput
                    min={0}
                    max={100}
                    value={props.product.quantity}
                    size={3}
                    onChange={value => handlerQuantity(value)}
                />
            </div>
            <div className="div-table-col">{props.product.quantity * props.product.price}</div>
        </div>
    )
};
export default  CartItem;
