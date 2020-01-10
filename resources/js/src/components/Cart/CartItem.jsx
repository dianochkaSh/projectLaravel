import React from 'react';
import './Cart.style.css';

const CartItem = (props) => {
    console.log(props);
  return(
      <div className="div-table-row">
          <div className="div-table-col">
              { props.product.images.length > 0
                    ? <img alt="" src={props.product.images[0].original} height="50" width="50"/>
                    : <img height="50" width="50" src={require('../../assets/img/userPlaceholder.png')} />
              }
          </div>
          <div className="div-table-col">{props.product.title}</div>
          <div className="div-table-col">{props.product.price}</div>
          <div className="div-table-col">0</div>
          <div className="div-table-col">{props.product.price}</div>
      </div>
  )
};
export default  CartItem;