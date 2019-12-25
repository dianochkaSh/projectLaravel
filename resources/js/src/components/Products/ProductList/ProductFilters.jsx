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
        category: null,
        author: null

    };
    constructor(props) {
        super(props);
        this.handlerSelectCategory = this.handlerSelectCategory.bind(this);
        this.handlerSelectAuthor = this.handlerSelectAuthor.bind(this);
        this.handlerClearFilter = this.handlerClearFilter.bind(this);
        this.handlerFilters = this.handlerFilters.bind(this);
        this.handlerFieldValue = this.handlerFieldValue.bind(this);
    }
    componentDidMount() {
        productStore.getCategories();
        productStore.getAuthors();
    }
    handlerSelectCategory = (id) => {
        this.filters.category = id;
    };
    handlerSelectAuthor = (id) => {
        this.filters.author = id;
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
                                    key={i}
                                    id={category.id}
                                    title={category.name}
                                    selectFilters={this.handlerSelectCategory}
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
                                key={i}
                                id={author.id}
                                title={author.author}
                                selectFilters={this.handlerSelectAuthor}
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