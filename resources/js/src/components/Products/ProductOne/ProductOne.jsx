import React from 'react';
/* store */
import ProductStore from '../../../store/ProductStore';
import { inject, observer } from 'mobx-react';
import './ProductOne.style.css';

function ProductOne (props) {
    ProductStore.getOneProduct(props.match.params.id);
    return(
        <div className="container-product-one">
            {   ProductStore.productOne !== undefined && ProductStore.productOne.title !== undefined &&
                <div>
                    <h4>{ProductStore.productOne.title}</h4>
                    <div className="content-img">
                        <img src={ProductStore.productOne.image} width="200" height="250"/>
                    </div>
                    <div className="content">
                        <div className="about">
                            <div className="content-title">
                                <p><label>Автор:</label></p>
                                <p><label>Категория:</label></p>
                            </div>
                            <div className="content-text">
                                <p><label>{ProductStore.productOne.author}</label></p>
                                <p><label>{ProductStore.productOne.category}</label></p>
                            </div>
                        </div>
                        <div className="description">
                            <b>О книге:</b>
                            <p>{ProductStore.productOne.description}</p>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
};
export default inject('ProductStore')(observer(ProductOne));