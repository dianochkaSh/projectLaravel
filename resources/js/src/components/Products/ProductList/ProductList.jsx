import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import productStore from '../../../store/ProductStore';

/* components */
import ProductItem from './ProductItem';
import ProductFilters from './ProductFilters';

/* styles */
import './Product.styles.css';

inject('productStore');
@observer
class ProductsList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        productStore.getProductList();
    }

    render() {
        console.log(productStore);
        return(
            <div className='product-list-container'>
                <h4 className="title-page">List of products</h4>
                <div className="filters">
                    <ProductFilters />
                </div>
                <div className="content">
                { (productStore.products) &&
                    <div className="content-one-product">
                        {   productStore.products.map(product =>
                                <ProductItem product={product} /> )
                        }
                    </div>
                }
                </div>
            </div>
        )
    }
}
export default ProductsList;