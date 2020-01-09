import React from 'react';

const CartItem = (props) => {
    console.log(props);
  return(
      <div>
          <p>
              { (props.product.images.length > 0 && props.product.images[0].original)
                    ? <img height="50" width="50" src={require('../../assets/img/userPlaceholder.png')} />
                    : <img alt="" src={props.product.images[0].original} height="50" width="50"/>
              }
              <span>{props.product.title}</span>
          </p>
      </div>
  )
};
export default  CartItem;