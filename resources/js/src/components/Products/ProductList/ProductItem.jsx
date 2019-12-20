import React from 'react';

/* styles */
import './Product.styles.css';

const ProductItem = (props) => {
    return(
        <div className="one-item">
            <img src={require('../../../assets/img/userPlaceholder.png')} width="200" height="200"/>
            <div className="item">
                <p className="price">{props.product.price}&thinsp;₽</p>
                <p className="item-title">{props.product.name}</p>
            </div>
        </div>
    )
};
export default ProductItem;