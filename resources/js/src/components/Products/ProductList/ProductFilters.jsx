import React, { Component } from 'react';
import { observable } from 'mobx';

/* components */
import InputField from '../../FormElements/InputField/InputField';


class ProductFilters extends Component {
    @observable filters = {
      priceStart: null,
      priceEnd: null,
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container-filters">
                <h4>Filters</h4>
                <div className="content-price">
                    <label>Price:</label>
                    <InputField
                        typeFiled='text'
                        nameField='priceStart'
                        titleField=''
                        IdInput='priceStart'
                        valueField={this.priceStart}
                        handlerFiled={this.handlerFieldValue}
                    />
                    <InputField
                        typeFiled='text'
                        nameField='priceEnd'
                        titleField=''
                        IdInput='priceEnd'
                        valueField={this.priceEnd}
                        handlerFiled={this.handlerFieldValue}
                    />
                </div>
                <div>
                    <label>Categories:</label>
                </div>

                <div>Author:</div>
                <div>
                    <button className="btn btn-primary" >Apply filters</button>
                </div>
            </div>
        )
    }
};
export default ProductFilters;