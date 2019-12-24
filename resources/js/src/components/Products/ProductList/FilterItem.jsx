import React from 'react';

const FilterItem = (props) => {
    const selectCurrentCategory = (id) => {
        props.selectFilters(id);
    };
    return (
        <div onClick={() => selectCurrentCategory(props.id)}>{props.title}</div>
    )
};
export default FilterItem;