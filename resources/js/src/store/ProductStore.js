import { action, observable, runInAction } from 'mobx';
import axios from 'axios';
class ProductStore {
    @observable products = [];
    @observable productOne = {};
    @observable categories = [];
    @observable authors = [];

    @action getProductList(params) {
        let authorParam = null;
        let categoryParam = null;
        if (params !== undefined) {
            authorParam = params.author.length > 0 ? params.author.toString() : 0;
            categoryParam = params.category.length > 0 ? params.category.toString(): 0;
        }

        let uri;
        if (params === undefined) {
            uri = '/api/product/list';
        } else {
            uri='/api/product/list/' + params.priceStart + '/' + params.priceEnd + '/' + categoryParam + '/' + authorParam;
        }
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
                   this.productOne.images = response.data.images;
               }
            });
    }
    @action getCategories() {
        axios.get('/api/product/allCategories')
            .then((response) => {
                if (response.status === 200) {
                    this.categories = response.data;
                }
            });
    }
    @action getAuthors() {
        axios.get('api/product/allAuthor')
            .then((response) => {
                if (response.status === 200 ) {
                    this.authors = response.data;
                }
            });
    }
    @action setOneProduct() {
        this.productOne = {};
    }

}
const productStore = new ProductStore();
export default  productStore;
