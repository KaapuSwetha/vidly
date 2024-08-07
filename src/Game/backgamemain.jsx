import React, { useState, useEffect } from "react";
import "../dummy/dummy.css";

const Dummy = () => {
  const [clickedImage, setClickedImage] = useState(null);
  const [cellState, setCellState] = useState(Array(9).fill(null));
  const [gameState, setGameState] = useState(null);
  const [availableMemberKey, setAvailableMemberKey] = useState(null);

  const [clickedImages, setClickedImages] = useState(null);
  const [clickedCells, setClickedCells] = useState(null);
  const handleImageClicks = (imageId) => {
    setClickedImages(imageId);
  };
  const handleCellClicks = (cellId) => {
    setClickedCells(cellId);
  };
  const getClassNames = (imageId, baseClass) => {
    return imageId === clickedImage && clickedCells
      ? `${baseClass} player-cell${clickedCells}`
      : baseClass;
  };

  const handleImageClick = (imageId) => {
    setClickedImage(imageId);
  };

  const handleCellClick = async (cellId) => {
    if (clickedImage && !cellState[cellId - 1]) {
      const newCellState = [...cellState];
      newCellState[cellId - 1] = clickedImage;
      setCellState(newCellState);
      setClickedImage(null); // Clear the clicked image after placing
      const position = cellId;
      const responses = await game("/game/make_move", {
        gameId: gameState.gameId,
        player: "1",
        member: availableMemberKey,
        position: position,
      });
      if (responses.success) {
        // Update the bot's move in the game state
        const updatedGameState = { ...gameState };
        updatedGameState.bot.position = responses.position; // Update bot's position
        // Update other game state properties as needed
        setGameState(updatedGameState);
      }
    }
  };

  const getClassName = (imageId, baseClass, cellId) => {
    return cellState[cellId - 1] === imageId
      ? `${baseClass} player-cell${cellId}`
      : baseClass;
  };

  return (
    <div className="main-bg">
      <div className="grid">
        <img
          id="botImg1"
          className={getClassName("botImg1", "robo-img robo-img-first")}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BqdX6x-UFCifc6_PiT42HGXME2su3nFT2g&s"
          alt=""
        />
        <img
          id="botImg2"
          className="robo-img robo-img-second"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BqdX6x-UFCifc6_PiT42HGXME2su3nFT2g&s"
          alt=""
        />

        <img
          id="botImg3"
          className="robo-img robo-img-last"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BqdX6x-UFCifc6_PiT42HGXME2su3nFT2g&s"
          alt=""
        />
        <div className="cell-row">
          {[1, 2, 3].map((id) => (
            <div key={id} onClick={() => handleCellClick(id)} className="cell">
              <span className="placeNumber">{id}</span>
            </div>
          ))}
        </div>
        <div className="cell-row">
          {[4, 5, 6].map((id) => (
            <div key={id} onClick={() => handleCellClick(id)} className="cell">
              <span className="placeNumber">{id}</span>
            </div>
          ))}
        </div>
        <div className="cell-row">
          {[7, 8, 9].map((id) => (
            <div key={id} onClick={() => handleCellClick(id)} className="cell">
              <span className="placeNumber">{id}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
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
  );
};

export default Dummy;
// setPositions(newPositions);
// console.log(newPositions);

// const newCellState = [...cellState];
// newCellState[cellId - 1] = clickedImage;
// setCellState(newCellState);

// console.log(newCellState, "cellstate");
// console.log(cellId, "cellID");

// setClickedImage(null);
