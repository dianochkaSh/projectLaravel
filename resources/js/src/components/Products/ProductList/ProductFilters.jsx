import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import productStore from '../../../store/ProductStore';

/* components */
import InputField from '../../FormElements/InputField/InputField';
import FilterItem  from './FilterItem';



inject(productStore);
@observer
class ProductFilters extends Component {
    @observable filters = {
        priceStart: null,
        priceEnd: null,
        category: null

    };
    constructor(props) {
        super(props);
        this.handlerSelectCategory = this.handlerSelectCategory.bind(this);
    }
    componentDidMount() {
        productStore.getCategories();
    }
    handlerSelectCategory = (id) => {
        this.filters.category = id;
    };

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
                    <div className="list-categories">
                        { productStore.categories !== undefined &&
                            productStore.categories.map((category, i)=>
                                <FilterItem
                                    key={i}
                                    id={category.id}
                                    title={category.name}
                                    selectCategory={this.handlerSelectCategory}
                                />
                            )
                        }
                    </div>
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