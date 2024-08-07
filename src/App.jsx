import { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Design from "./Game/design";
import Game from "./Game/game";
import RegisterWrapper from "./Game/registerWrapper";
import StartWrapper from "./Game/startWrapper";
import MainGame from "./Game/maingame";
import BackGame from "./Game/backgame";
import LoginWrapper from "./Game/loginWrapper";
import { Context } from "./Game/context";
import Skeletons from "./skeleton/skeletons";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer />
      <main className="container">
        <Routes>
          <Route path="/register" element={<RegisterWrapper />} />
          <Route
            path="/backgame"
            element={
              <Context>
                <BackGame />
              </Context>
            }
          />
          <Route path="/game" element={<Game />} />
          <Route path="/" element={<LoginWrapper />} />
          <Route path="/design" element={<Design />} />
          <Route path="/skeleton" element={<Skeletons />} />
          <Route
            path="/start"
            element={
              <Context>
                <StartWrapper />
              </Context>
            }
          />
          <Route
            path="/maingame"
            element={
              <Context>
                <MainGame />
              </Context>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
