import { action, observable, runInAction } from 'mobx';
import axios from 'axios';
class ProductStore {
    @observable products = [];
    @observable productOne = {};

    @action getProductList() {
        axios.get('/api/product/list')
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
                   this.productOne.category = response.data.name;
               }
            });
    }

}
const productStore = new ProductStore();
export default  productStore;