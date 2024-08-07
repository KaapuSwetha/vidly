import React, { Component, useState } from "react";

const InputMail = ({ name, label, error, ...rest }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input name={name} id={name} {...rest} className="form-control" />
      </div>
      {error && <button className="alert alert-danger">{error}</button>}
    </div>
  );
};

export default InputMail;
