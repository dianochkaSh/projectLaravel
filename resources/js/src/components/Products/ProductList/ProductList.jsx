import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {observable, reaction} from 'mobx';
import productStore from '../../../store/ProductStore';
import userStore from '../../../store/UserStore';

/* components */
import ProductItem from './ProductItem';
import ProductFilters from './ProductFilters';
import LoaderElement from '../../Loader/LoaderElement';

/* styles */
import './Product.styles.css';

inject('productStore', 'userStore');
@observer
class ProductsList extends Component {
    @observable isLoaded = true;
    constructor(props) {
        super(props);
        this.handlerOpenProduct = this.handlerOpenProduct.bind(this);
        reaction(() => productStore.products, () => {
            this.isLoaded = false
        });
        this.handlerAddToCart = this.handlerAddToCart.bind(this);
    }
    componentDidMount() {
        productStore.getProductList();
    }

    handlerOpenProduct = (id) => {
        this.props.history.push('/product/oneProduct/'+id);
    };
    handlerAddToCart = (id, title, price) => {
        console.log(11111111);
        userStore.addProductToCart(id, title, price);
    };

    render() {
        return(
            <div className='product-list-container'>
                <h4 className="title-page">List of products</h4>
                {this.isLoaded
                    ? <div>
                        <LoaderElement load={this.isLoaded}/>
                    </div>
                    : <div>
                        <div className="filters">
                            <ProductFilters/>
                        </div>
                        <div className="content">
                            {(productStore.products) &&
                            <div className="content-one-product">
                                {productStore.products.map((product, i) =>
                                    <ProductItem
                                        key={i}
                                        product={product}
                                        openOneProduct={this.handlerOpenProduct}
                                        addToCart={this.handlerAddToCart}
                                    />
                                )
                                }
                            </div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default ProductsList;