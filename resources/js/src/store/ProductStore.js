import { action, observable, runInAction } from 'mobx';
import axios from 'axios';
class ProductStore {
    @observable products = [];

    @action getProductList() {
        axios.get('/api/product/list')
            .then((response) => {
               if (response.status === 200) {
                   this.products = response.data;
               }
            });
    }

}
const productStore = new ProductStore();
export default  productStore;