import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction, observable } from 'mobx';

/* store */
import cartStore from '../../../store/CartStore';
import userStore from '../../../store/UserStore'

/* styles */
import './Product.styles.css';

inject('cartStore, userStore');
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
        if (cartStore.cartIdsProduct.length === 0 ) {
            cartStore.setCartIds();
        }
        if( cartStore.cartIdsProduct.length > 0 ) {
            if( cartStore.cartIdsProduct.find(el => parseInt(el) === parseInt(id))) {
                this.changeTitleBt();
            }
        }
        if (userStore.isAuthorization === undefined && localStorage.getItem('isAutorization') !== null) {
            userStore.isAuthorization = localStorage.getItem('isAutorization');
        }
    }

    handlerOpenItem = (id) => {
        this.props.openOneProduct(id);
    };
    handlerAddToCart = (id, title, price, img) => {
      this.props.addToCart(id,title, price, img);
      this.changeTitleBt();

    };
    changeTitleBt = () => {
        this.titleBt = 'In Cart';
        this.classBtCart = 'btn btn-light';
    };
    render() {
        const images = this.props.product !== undefined ?  this.props.product.images : null;
        let imgThumbnail = null;
        images !== null && images.map( (image)=> {
            if (image.order === 0) {
                imgThumbnail = image.original;
            }
        } );
        return (
            <div>
                <div className="one-item" key={this.props.product.id} onClick={() => this.handlerOpenItem(this.props.product.id)}>
                    {images !== null && images.map((image, i) =>
                        image.order === 1 && <img key={i} alt='' src={image.original} width="200" height="250"/>
                    )}
                    <div className="item">
                        <p className="price">{this.props.product.price}&thinsp;₽</p>
                        <p className="item-title">{this.props.product.title}</p>
                    </div>
                </div>
                { userStore.isAuthorization === true &&
                    <button
                        className={this.classBtCart}
                        onClick={() => this.handlerAddToCart(this.props.product.id, this.props.product.title, this.props.product.price, imgThumbnail)}
                    >
                        {this.titleBt}
                    </button>
                }
            </div>
        )
    }
};
export default ProductItem;
