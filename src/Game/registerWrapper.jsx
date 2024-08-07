import React from "react";
import Register from "./register";
import { useNavigate } from "react-router-dom";

const RegisterWrapper = () => {
  const navigate = useNavigate();
  return <Register navigate={navigate} />;
};
export default RegisterWrapper;
