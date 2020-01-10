import React from 'react';
import './Order.style.css';

const OrderItem = (props) => {
    return(
        <div className="div-table-row">
            <div className="div-table-col title">{props.product.title}</div>
            <div className="div-table-col">{props.product.price}</div>
        </div>
    )
};
export default OrderItem;