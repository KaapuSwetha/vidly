import React, { useState, useEffect, useRef, useContext } from "react";
import "../Game/fake.css";
import { game } from "../service/userRegister";
import { ContextCreate } from "./context";
import { log } from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
const initialPositions = {
  1: { available: true, occupiedBy: "pending" },
  2: { available: true, occupiedBy: "pending" },
  3: { available: true, occupiedBy: "pending" },
  4: { available: true, occupiedBy: "pending" },
  5: { available: true, occupiedBy: "pending" },
  6: { available: true, occupiedBy: "pending" },
  7: { available: true, occupiedBy: "pending" },
  8: { available: true, occupiedBy: "pending" },
  9: { available: true, occupiedBy: "pending" },
};

const MainGame = () => {
  const [clickedImage, setClickedImage] = useState(null);
  const [cellState, setCellState] = useState(Array(9).fill(null));
  const [cellStates, setCellStates] = useState(Array(9).fill(null));
  const [availableMemberKey, setAvailableMemberKey] = useState("1");
  const { response } = useContext(ContextCreate);
  const [positions, setPositions] = useState(initialPositions);
  const [loading, setLoading] = useState(false);
  const previousClassNames = useRef({});
  const [imageChange, setImageChange] = useState(true);
  const handleImageClick = (imgId) => {
    if (loading) {
      return;
    }

    setClickedImage(imgId);

    let memberKey;
    if (imgId === "playerImg1") {
      memberKey = "1";
    } else if (imgId === "playerImg2") {
      memberKey = "2";
    } else if (imgId === "playerImg3") {
      memberKey = "3";
    }

    setAvailableMemberKey(memberKey);
  };

  const handleCellClick = async (cellId) => {
    console.log(cellId);
    if (clickedImage && positions[cellId].available && !loading) {
      setLoading(true);
      const newPositions = { ...positions };
      newPositions[cellId] = {
        available: false,
        occupiedBy: "user",
      };
      if (clickedImage) {
        const newCellState = [...cellState];
        const oldCellIndex = cellState.indexOf(clickedImage);

        if (oldCellIndex !== -1) {
          newCellState[oldCellIndex] = null;
        }
        newCellState[cellId - 1] = clickedImage;

        setCellState(newCellState);
        setClickedImage(null);
      }
      const position = cellId + "";
      try {
        const responses = await game("/game/make_move", {
          gameId: response.gameId,
          player: "1",
          member: availableMemberKey,
          position: position,
        });
        console.log(responses);

        if (responses && responses.bot) {
          const occupiedByZeroPositions = Object.keys(
            responses.positions
          ).filter((key) => responses.positions[key].occupiedBy === "0");
          console.log(occupiedByZeroPositions, "occupied");

          const botPositions = Object.entries(responses.bot)
            .filter(([key, bot]) => bot.position !== "pending")

            .map(([key, bot]) => ({
              position: bot.position,
              imgId: `botImg${key}`,
            }));

          const newCellState = [...cellStates];
          botPositions.forEach(({ position, imgId }) => {
            const oldBotCellIndex = cellStates.indexOf(imgId);
            if (oldBotCellIndex !== -1) {
              newCellState[oldBotCellIndex] = null;
            }
            newCellState[position - 1] = imgId;
          });

          setCellStates(newCellState);
        }

        if (responses.winner === "0") {
          toast.success("Bot is the winner");
        } else if (responses.winner === "1") {
          toast.success("Player is the winner");
        }
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.info("This member cannot be moved");
          setImageChange(false);
          return;
        }
      }
      setLoading(false);
    }
  };

  const getClassName = (imageId, baseClass, cellId) => {
    let className = baseClass;
    if (imageChange) {
      console.log(className);

      if (clickedImage === imageId) {
        className += " selected-img";
      }

      if (cellState[cellId - 1] === imageId) {
        className += ` player-cell${cellId}`;
      }

      previousClassNames.current[imageId] = className;
      console.log(previousClassNames.current[imageId]);
    } else {
      className = previousClassNames.current[imageId] || baseClass;

      console.log(previousClassNames.current[imageId]);
      console.log(baseClass);
    }
    return className;
  };
  const getClassNames = (imageId, baseClass, cellId) => {
    return cellStates[cellId - 1] === imageId
      ? `${baseClass} robo-cell${cellId}`
      : baseClass;
  };

  return (
    <div className="main">
      <ToastContainer />
      <h1>Let's Play</h1>
      <div className="main-bg">
        <div className="grid">
          {["botImg1", "botImg2", "botImg3"].map((imgId, index) => (
            <img
              key={imgId}
              id={imgId}
              className={getClassNames(
                imgId,
                `robo-img robo-img-${index + 1}`,
                cellStates.indexOf(imgId) + 1
              )}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BqdX6x-UFCifc6_PiT42HGXME2su3nFT2g&s"
              alt={`Player ${index + 1}`}
            />
          ))}

          <div className="cell-row">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                onClick={() => handleCellClick(id)}
                className="cell"
              >
                <span className="placeNumber">{id}</span>
              </div>
            ))}
          </div>
          <div className="cell-row">
            {[4, 5, 6].map((id) => (
              <div
                key={id}
                onClick={() => handleCellClick(id)}
                className="cell"
              >
                <span className="placeNumber">{id}</span>
              </div>
            ))}
          </div>
          <div className="cell-row">
            {[7, 8, 9].map((id) => (
              <div
                key={id}
                onClick={() => handleCellClick(id)}
                className="cell"
              >
                <span className="placeNumber">{id}</span>
              </div>
            ))}
          </div>

          {["playerImg1", "playerImg2", "playerImg3"].map((imgId, index) => (
            <img
              key={imgId}
              id={imgId}
              className={getClassName(
                imgId,
                `player-img player-img-${index + 1}`,
                cellState.indexOf(imgId) + 1
              )}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLRm-hn-MRiL-1jPhzA4JRVaqS3G3RFz6j9Q&s"
              alt={`Player ${index + 1}`}
              onClick={() => handleImageClick(imgId)}
            />
          ))}
        </div>
      </div>
      <button
        style={{ marginTop: "-30px", marginLeft: "50px" }}
        className="btn btn-primary"
      >
        <Link style={{ color: "white" }} to="/start">
          Play Again
        </Link>
      </button>
    </div>
  );
};

export default MainGame;
