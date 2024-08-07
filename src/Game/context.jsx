import React, { useState, createContext, useContext } from "react";
import { start } from "../service/userRegister";
const ContextCreate = createContext();
import { useNavigate } from "react-router-dom";
import helpers from "./../service/crypto";
import { ToastContainer } from "react-toastify";

const Context = ({ children }) => {
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (firstPlayer) => {
    // console.log(helpers.decryptobj(localStorage.getItem("token")));

    const fetch = async () => {
      try {
        const response = await start("/game/start", {
          firstPlayer: firstPlayer,
        });
        setResponse(response);
        navigate("/backgame");
        toast.success("Start the game");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          setErrors({ ...errors, firstPlayer: ex.response.data });
        }
      }
    };
    fetch();
  };
  return (
    <div>
      <ToastContainer />
      <ContextCreate.Provider value={{ handleSubmit, response }}>
        {children}
      </ContextCreate.Provider>
    </div>
  );
};

export { Context, ContextCreate };
