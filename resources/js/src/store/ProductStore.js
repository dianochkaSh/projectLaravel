import { action, observable, runInAction } from 'mobx';
import axios from 'axios';
class ProductStore {
    @observable products = {};

}
const productStore = new ProductStore();
export default  productStore;