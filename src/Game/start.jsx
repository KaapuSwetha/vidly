import React, { useState, useContext } from "react";
import { ContextCreate } from "./context";

const Start = () => {
  const { handleSubmit } = useContext(ContextCreate);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleClick = () => {
    setIsButtonDisabled(true);
    handleSubmit("1");
  };
  const image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4O4XFOeFP6uj6nmVzHgyPkfyXeB6qztEhpw&s";
  return (
    <div>
      <img src={image} alt="" />
      <br />
      <button
        className="btn btn-primary"
        disabled={isButtonDisabled}
        onClick={handleClick}
      >
        {isButtonDisabled ? "Please wait" : "Start"}
      </button>
    </div>
  );
};

export default Start;
