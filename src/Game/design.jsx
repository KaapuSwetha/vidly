import React, { useState } from "react";
import Square from "./square";
import "../Game/external.css";
const Design = ({ xIsNext, square, onPlay }) => {
  const image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BqdX6x-UFCifc6_PiT42HGXME2su3nFT2g&s";
  const tor =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTExMVExUTFxUYExYYGRUXEhYXFxcWFhYTFxUYHiggGBsmGxcVITEtJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGzcmICU3LS03Ny0tKysyNy01Ly0rLi0vLS8tLS0vLSstLS8tLTUtLTAtLS8rKy0tLS0tLy0tK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwIDBAUGAQj/xABFEAABAwIDAwgGBwUHBQAAAAABAAIDBBEFEiExQVEGBxMyYXGBkSJCUqGx0RQjM2KCksEVQ3Lh8CRTg6KywtIIVGNzw//EABoBAQADAQEBAAAAAAAAAAAAAAACAwQFAQb/xAAwEQEAAgEDAgMGBAcAAAAAAAAAAQIDBBEhEjETQVEFQmGBkfAUcbHBIjJSYqHR4f/aAAwDAQACEQMRAD8AmtERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERWH2uc2a2lrZvHYgvorcOzftNr7bblcQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBFQ+QDb4cSvAHncGjt1PkEFxFT9G4ucfID3BedAzZmN/4jf4oK0VJpuDnDyI94XhY8cHe4/JBWitslB02HgdqrJQeorRqG8R8U6ccHH8LvkguorXTfdd+V3yTpxvuO8FBdRW2zNOwhXEBERAREQEREBERAREQEREBERAVuR+4ak7B+p7FW51hc7lQxwYx0ryGgAucToGtAvqdwA1KCiomip43TTPaxrBd8jiA1o7zsCiPHud+pqZTT4PTmQ/3z2km3tNjNgwbNX+QWlxrEKjlJWGOJzocPpzt2ZvvlvrSO3A9Ud5vI2CYLBSRCKCMMbv8Aacfae7a4rDq9dXD/AAxzZVkyxXjzRJi+D4vO+1dWvDjY5MznN1G5jLM8lsqfmbY6NrjVva9zQSDENCRexGf9VLBC1uM4hJFlyR5817nU22aacVg/H5su1cfE/L93PtqMmPe97cekR9yjCv5J1+Hlv0bEpM20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";
  function handleSquare(i) {
    if (square[i] || Winner(square)) {
      return;
    }
    const nextSquares = square.slice();
    if (xIsNext) {
      nextSquares[i] = <img height={60} src={tor} alt="" />;
    } else {
      nextSquares[i] = <img height={50} src={image} alt="" />;
    }
    onPlay(nextSquares);
  }
  const winner = Winner(square);
  let status;
  if (winner) {
    status = "Winner" + winner;
  } else {
    status = "FIRST USER START THE GAME :" + (xIsNext ? "X" : "O");
  }
  return (
    <div>
      <div>{status}</div>
      <div className="img">
        <img height={50} src={image} alt="" />
        <img height={50} src={image} alt="" />
        <img height={50} src={image} alt="" />
      </div>
      <div className="board col-sm-12 col-md-6 col-lg-4 ">
        <Square value={square[0]} onSquareClick={() => handleSquare(0)} />
        <Square value={square[1]} onSquareClick={() => handleSquare(1)} />
        <Square value={square[2]} onSquareClick={() => handleSquare(2)} />
      </div>
      <div className="board col-sm-12 col-md-6 col-lg-4 ">
        <Square value={square[3]} onSquareClick={() => handleSquare(3)} />
        <Square value={square[4]} onSquareClick={() => handleSquare(4)} />
        <Square value={square[5]} onSquareClick={() => handleSquare(5)} />
      </div>
      <div className="board col-sm-12 col-md-6 col-lg-4 ">
        <Square value={square[6]} onSquareClick={() => handleSquare(6)} />
        <Square value={square[7]} onSquareClick={() => handleSquare(7)} />
        <Square value={square[8]} onSquareClick={() => handleSquare(8)} />
      </div>
      <img height={60} src={tor} alt="" />
      <img height={60} src={tor} alt="" />
      <img height={60} src={tor} alt="" />
    </div>
  );
  function Winner(square) {
    console.log(square);
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      console.log(square[a]);
      console.log(square[b]);
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }
};

export default Design;
