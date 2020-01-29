import { action, observable, runInAction } from 'mobx';
import axios from 'axios';
import userStore from './UserStore';

class CartStore {
    @observable cartIdsProduct = [];
    @observable cart = [];

    @action addProductToCart(id, title, price, img){

        if (this.cart.length > 0) {
            this.cart.map((cart) => {
                if (parseInt(cart.id) === parseInt(id) ) {
                    cart.quantity += 1;
                }
            })
        }
        if( !this.cart.find(el => parseInt(el.id) === parseInt(id))) {
            let newProductInCart = {
                id: id,
                title: title,
                quantity: 1,
                price: price,
                image: img
            };
            this.cart.push(newProductInCart);
        }

        this.cartIdsProduct.push(id);
        localStorage.setItem('cartIds', this.cartIdsProduct);
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    @action deleteProductFromCart(id) {
        if ( this.cartIdsProduct.length === 0 ) {
            this.cartIdsProduct = localStorage.getItem('cartIds');
        }

        let newCart = this.cartIdsProduct.filter(function(e) { return  parseInt(e) !== parseInt(id) });
        this.cartIdsProduct = newCart;
        localStorage.removeItem('cartIds');
        localStorage.setItem('cartIds', this.cartIdsProduct);
        if (this.cart.length > 0) {
            this.cart = this.cart.filter((cart) => cart.id !== id );
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    @action setCartIds () {
        let cartIds =  localStorage.getItem('cartIds');
        this.cartIdsProduct = (cartIds!== null && cartIds.length > 0) ? cartIds.split(','): [] ;
    }

    @action changeCartIds (quantity, id) {
        if ( this.cartIdsProduct.length > 0 ) {
            this.cartIdsProduct = this.cartIdsProduct.filter((el) => parseInt(el) !== id  );
            if (quantity > 0) {
                for( let i = 0; i < quantity; i ++) {
                    this.cartIdsProduct.push(id);
                }
            }
            localStorage.removeItem('cartIds');
            localStorage.setItem('cartIds', this.cartIdsProduct );
            this.cart.map((cart) => {
                if (cart.id === id) {
                    cart.quantity = quantity;
                }
            });
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }
    @action getCart() {
        if ( this.cartIdsProduct.length > 0 ) {
            const cart = localStorage.getItem('cart');
            this.cart = JSON.parse(cart);
        }
    }
    @action getOrder() {
        if (this.cartIdsProduct.length === 0) {
            this.setCartIds();

        }
        this.getCart();
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        };

        let idsProduct = this.cartIdsProduct.toString();
    }

    @action getSubmitOrder (total, idToken) {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        };
        let data = {
            totalSum: total,
            token: idToken,
            username: userStore.username === null ?  localStorage.getItem('username') : userStore.username
        };
        axios.post('/api/totalOrder', data, {headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('cart');
                    localStorage.removeItem('cartIds');
                    this.cartIdsProduct = [];
                    this.cart = [];
                    window.location.href = '/checkoutSuccess'
                }
            });
    }
}
const cartStore = new CartStore();
export default cartStore;