import React, { Component } from 'react';
const Select = ({name,label,error,options,...rest}) => {
    return (  
        
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name}
            id={name} {...rest} className="form-control" >
            <option/>
                {options.map(option =>(
                    <option key={option._id }value={option._id}>{option.name}</option>
                ))}</select>
       { error&& <button className="alert alert-danger">{error}</button>}
        </div>
            
        

    );
}
 
export default Select;