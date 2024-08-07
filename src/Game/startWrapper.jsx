import React from "react";
import { useNavigate } from "react-router-dom";
import Start from "./start";

const StartWrapper = () => {
  const navigate = useNavigate();
  return <Start navigate={navigate} />;
};

export default StartWrapper;
