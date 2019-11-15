import * as React from 'react';

const InputField = (props) => {
    const handlerChangeValue = (e) => {
        props.handlerFiled(props.nameField, e.target.value);
    };
    return (
        <div>
           <label htmlFor={props.IdInput}>{props.titleField}</label>
           <input
               type={props.typeFiled}
               name={props.nameField}
               id={props.IdInput}
               className="form-control"
               value={props.valueField}
               onChange={handlerChangeValue}
           />
        </div>
    );
};
export default InputField;
