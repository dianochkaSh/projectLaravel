import * as React from 'react';
import './InputButton.style.css';
const InputButton = (props) => {
    return (
        <div className="bt-container">
            <input
                className="btn btn-primary"
                type={props.typeBt}
                name={props.nameBt}
                value={props.nameBt}
                onClick={props.handlerBt}
            />
        </div>
    );
};
export default InputButton;