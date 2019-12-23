import React from 'react';

/* styles */
import './Product.styles.css';

const ProductItem = (props) => {
    const handlerOpenItem = (id) => {
        props.openOneProduct(id);
    };

    return(
        <div className="one-item" key={props.product.id} onClick={() => handlerOpenItem(props.product.id)}>
            <img src={require('../../../assets/img/userPlaceholder.png')} width="200" height="200"/>
            <div className="item">
                <p className="price">{props.product.price}&thinsp;₽</p>
                <p className="item-title">{props.product.name}</p>
            </div>
        </div>
    )
};
export default ProductItem;