import React, { useState } from "react";
const Square = ({ onSquareClick, value }) => {
  return (
    <div className="cell">
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    </div>
  );
};

export default Square;
