import React from 'react';
import Loader from 'react-loader-spinner'
import './LoaderElements.style.css';

const LoaderElement = (props) => {
    return(
        <div className="loader-content">
            <Loader
                type="Circles"
                color="#00BFFF"
                height={100}
                width={100}
                visible={props.load}
            />
        </div>
    )
};

export default LoaderElement;