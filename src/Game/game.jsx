import React, { useState } from "react";
import Design from "./design";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const move = history.map((square, move) => {
    let descrption;
    if (move > 0) {
      descrption = "Go to move #" + move;
    } else {
      descrption = "Play Again";
    }
    return <button onClick={() => jumpTo(move)}>{descrption}</button>;
  });
  return (
    <div className="main">
      <div>
        <Design xIsNext={xIsNext} square={currentSquare} onPlay={handlePlay} />
      </div>
      <div>{move}</div>
    </div>
  );
};

export default Game;
