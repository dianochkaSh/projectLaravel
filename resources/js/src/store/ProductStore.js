import { action, observable, runInAction } from 'mobx';
import axios from 'axios';
class ProductStore {
    @observable products = [];
    @observable productOne = {};
    @observable categories = [];
    @observable authors = [];

    @action getProductList(params) {
        console.log(params);
        let uri;
        if (params === undefined) {
            uri = '/api/product/list';
        } else {
            uri='/api/product/list/' + params.priceStart + '/' + params.priceEnd + '/' + params.category + '/' + params.author;
        }
        console.log(uri);
        axios.get(uri)
            .then((response) => {
               if (response.status === 200) {
                   this.products = response.data;
               }
            });
    }
    @action getOneProduct(id) {
        axios.get('/api/product/getOneProduct/'+ id )
            .then((response) => {
               if (response.status === 200) {
                   this.productOne.title = response.data.title;
                   this.productOne.id = response.data.id;
                   this.productOne.description = response.data.description;
                   this.productOne.author = response.data.author;
                   this.productOne.price = response.data.price;
                   this.productOne.image = response.data.image;
                   this.productOne.category = response.data.category;
               }
            });
    }
    @action getCategories() {
        axios.get('/api/product/allCategories')
            .then((response) => {
                if (response.status === 200) {
                    this.categories = response.data;
                }

            })
    }
    @action getAuthors() {
        axios.get('api/product/allAuthor')
            .then((response) => {
                if (response.status === 200 ) {
                    this.authors = response.data;
                }
            })
    }

}
const productStore = new ProductStore();
export default  productStore;