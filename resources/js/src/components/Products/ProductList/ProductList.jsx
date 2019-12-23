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
        this.handlerOpenProduct = this.handlerOpenProduct.bind(this);
    }
    componentDidMount() {
        productStore.getProductList();
    }

    handlerOpenProduct = (id) => {
        this.props.history.push('/product/oneProduct/'+id);
    };

    render() {
        return(
            <div className='product-list-container'>
                <h4 className="title-page">List of products</h4>
                <div className="filters">
                    <ProductFilters />
                </div>
                <div className="content">
                { (productStore.products) &&
                    <div className="content-one-product">
                        {   productStore.products.map((product, i)=>
                                <ProductItem
                                    key={i}
                                    product={product}
                                    openOneProduct={this.handlerOpenProduct}
                                />
                            )
                        }
                    </div>
                }
                </div>
            </div>
        )
    }
}
export default ProductsList;