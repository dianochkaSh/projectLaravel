import React from 'react';
import './Cart.style.css';

const CartItem = (props) => {
    console.log(props);
    const handlerDelete = (id) => {
      props.deleteProduct(id);
    };
  return(
      <div className="div-table-row">
          <div className="div-table-col">
              <button className="bt-delete-product" onClick={() => handlerDelete(props.product.id)}><img src={require('../../assets/img/close-red.png')}/></button>
              { props.product.images.length > 0
                    ? <img alt="" src={props.product.images[0].original} height="50" width="50"/>
                    : <img height="50" width="50" src={require('../../assets/img/userPlaceholder.png')} />
              }
          </div>
          <div className="div-table-col title">{props.product.title}</div>
          <div className="div-table-col">{props.product.price}</div>
          <div className="div-table-col">0</div>
          <div className="div-table-col">{props.product.price}</div>
      </div>
  )
};
export default  CartItem;