import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const InputPass = ({ name, label, error, ...rest }) => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <div style={{ position: "relative" }} className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          id={name}
          {...rest}
          type={visible ? "password" : "text"}
          className="form-control d-flex"
        />
        <span
          className="d-flex justify-content-sm-end "
          style={{
            position: "absolute",
            right: "30px",
            top: "70%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
          onClick={() => setVisible(!visible)}
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {error && <button className="alert alert-danger">{error}</button>}
    </div>
  );
};

export default InputPass;
