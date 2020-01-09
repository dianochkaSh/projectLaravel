import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction, observable } from 'mobx';
import userStore from '../../../store/UserStore';

/* styles */
import './Product.styles.css';

inject('userStore');
@observer
class ProductItem extends Component {
    @observable titleBt = 'Add to Cart';
    @observable classBtCart = 'btn btn-primary';
    constructor(props){
        super(props);
        this.handlerOpenItem = this.handlerOpenItem.bind(this);
        this.handlerAddToCart = this.handlerAddToCart.bind(this);
        this.changeTitleBt = this.changeTitleBt.bind(this);

    }
    componentDidMount() {
        let id = this.props.product.id;
        if( userStore.cartUser.length > 0 ) {
            if( userStore.cartUser.find(el => el === id)) {
                this.changeTitleBt();
            }
        }
    }

    handlerOpenItem = (id) => {
        this.props.openOneProduct(id);
    };
    handlerAddToCart = (id) => {
      this.props.addToCart(id);
      this.changeTitleBt();

    };
    changeTitleBt = () => {
        this.titleBt = 'In Cart';
        this.classBtCart = 'btn btn-light';
    };
    render() {
        return (
            <div>
                <div className="one-item" key={this.props.product.id} onClick={() => this.handlerOpenItem(this.props.product.id)}>
                    <img src={this.props.product.images[0].original} width="200" height="250"/>
                    <div className="item">
                        <p className="price">{this.props.product.price}&thinsp;₽</p>
                        <p className="item-title">{this.props.product.title}</p>
                    </div>
                </div>
                <button
                    className={this.classBtCart}
                    onClick={() => this.handlerAddToCart(this.props.product.id)}
                >
                    {this.titleBt}
                </button>
            </div>
        )
    }
};
export default ProductItem;