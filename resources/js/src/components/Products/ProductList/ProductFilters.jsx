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
        category: [],
        author: []

    };
    constructor(props) {
        super(props);
        this.handlerSelectItem = this.handlerSelectItem.bind(this);
        this.handlerClearFilter = this.handlerClearFilter.bind(this);
        this.handlerFilters = this.handlerFilters.bind(this);
        this.handlerFieldValue = this.handlerFieldValue.bind(this);
    }
    componentDidMount() {
        productStore.getCategories();
        productStore.getAuthors();
    }

    handlerSelectItem = (selectedItem, actionItem, id) => {
        if (actionItem === 'add') {
            this.filters[selectedItem].push(id);
        } else if(actionItem === 'remove') {
            let newArrayItems = this.filters[selectedItem].filter(function(e) {
                return e !== id
            });
            this.filters[selectedItem] = [];
            this.filters[selectedItem] = newArrayItems;
        }
        console.log(this.filters);
    };
    handlerClearFilter = () => {
      this.filters = {};
    };
    handlerFieldValue = (key, value) => {
        this.filters[key] = value;
    };
    handlerFilters = () => {
        productStore.getProductList(this.filters);
    };
    render() {
        return (
            <div className="container-filters">
                <h4 className="title-filters">Filters</h4>
                <a href="#" onClick={this.handlerClearFilter} className="clear-filters">Очистить</a>
                <div className="content-price">
                    <label><b>Price:</b></label>
                    <InputField
                        typeFiled='number'
                        nameField='priceStart'
                        titleField=''
                        IdInput='priceStart'
                        valueField={this.filters.priceStart}
                        handlerFiled={this.handlerFieldValue}
                    />
                    <InputField
                        typeFiled='number'
                        nameField='priceEnd'
                        titleField=''
                        IdInput='priceEnd'
                        valueField={this.filters.priceEnd}
                        handlerFiled={this.handlerFieldValue}
                    />
                </div>
                <div>
                    <label><b>Categories:</b></label>
                    <div className="list-filters">
                        { productStore.categories !== undefined &&
                            productStore.categories.map((category, i)=>
                                <FilterItem
                                    selectedItem='category'
                                    key={i}
                                    id={category.id}
                                    title={category.name}
                                    selectFilters={this.handlerSelectItem}
                                />
                            )
                        }
                    </div>
                </div>

                <div><b>Author:</b></div>
                <div className="list-filters">
                    {productStore.authors !== undefined &&
                        productStore.authors.map((author, i) =>
                            <FilterItem
                                selectedItem='author'
                                key={i}
                                id={author.id}
                                title={author.author}
                                selectFilters={this.handlerSelectItem}
                            />
                        )
                    }
                </div>
                <div>
                    <button className="btn btn-primary" onClick={this.handlerFilters}>Apply filters</button>
                </div>
            </div>
        )
    }
};
export default ProductFilters;