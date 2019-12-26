import React from 'react';

/* styles */
import './Product.styles.css';

const ProductItem = (props) => {
    const handlerOpenItem = (id) => {
        props.openOneProduct(id);
    };
    return(
        <div className="one-item" key={props.product.id} onClick={() => handlerOpenItem(props.product.id)}>
            <img src={props.product.image} width="200" height="250"/>
            <div className="item">
                <p className="price">{props.product.price}&thinsp;₽</p>
                <p className="item-title">{props.product.title}</p>
            </div>
        </div>
    )
};
export default ProductItem;