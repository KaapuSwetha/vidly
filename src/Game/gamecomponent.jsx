import React, { useState } from "react";
import Draggable from "react-draggable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GameComponent = ({ image, tor }) => {
  const [imagePositions, setImagePositions] = useState([
    { id: 1, defaultPosition: { x: 0, y: 0 } },
    { id: 2, defaultPosition: { x: 50, y: 0 } },
    { id: 3, defaultPosition: { x: 100, y: 0 } },
  ]);

  const [torPositions, setTorPositions] = useState([
    { id: 1, defaultPosition: { x: 0, y: 0 } },
    { id: 2, defaultPosition: { x: 60, y: 0 } },
    { id: 3, defaultPosition: { x: 120, y: 0 } },
  ]);

  return (
    <div>
      <div className="img">
        {imagePositions.map((pos) => (
          <Draggable
            key={pos.id}
            defaultPosition={pos.defaultPosition}
            onStop={(e, data) => {
              setImagePositions((prevPositions) =>
                prevPositions.map((p) =>
                  p.id === pos.id
                    ? { ...p, defaultPosition: { x: data.x, y: data.y } }
                    : p
                )
              );
            }}
          >
            <img height={50} src={image} alt="" />
          </Draggable>
        ))}
      </div>

      <div className="img">
        {torPositions.map((pos) => (
          <Draggable
            key={pos.id}
            defaultPosition={pos.defaultPosition}
            onStop={(e, data) => {
              setTorPositions((prevPositions) =>
                prevPositions.map((p) =>
                  p.id === pos.id
                    ? { ...p, defaultPosition: { x: data.x, y: data.y } }
                    : p
                )
              );
            }}
          >
            <img height={60} src={tor} alt="" />
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default GameComponent;
