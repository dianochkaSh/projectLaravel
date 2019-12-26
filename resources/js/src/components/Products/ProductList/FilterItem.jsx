import React, { Component } from 'react';
import { observable, observe } from 'mobx';
import { observer } from 'mobx-react';

@observer
class FilterItem extends Component{
    @observable selected = null;
    constructor(props){
        super(props);
        this.selectCurrentCategory = this.selectCurrentCategory.bind(this);
    }
    selectCurrentCategory = (id) => {
        if ( this.selected === id) {
            this.selected = null;
        } else {
            this.selected = id;
        }

        this.props.selectFilters(id);
    };
    render() {
        return (
            <div className={this.selected === this.props.id ? "selected": ""} onClick={() => this.selectCurrentCategory(this.props.id)}>{this.props.title}</div>
        )
    }
};
export default FilterItem;