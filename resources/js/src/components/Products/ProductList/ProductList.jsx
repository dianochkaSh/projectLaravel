import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import ProductStore from '../../../store/ProductStore';

inject('ProductStore');
@observer
class ProductsList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <h4>List of products</h4>
            </div>
        )
    }
}
export default ProductsList;