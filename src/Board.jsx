import React, { useState } from "react";
import "./Checkerboard.css";

const Checkerboard = () => {
  // Define the initial state for the checkerboard
  const [board, setBoard] = useState([
    [" ", "W", " ", "W", " ", "W", " ", "W"],
    ["W", " ", "W", " ", "W", " ", "W", " "],
    [" ", "W", " ", "W", " ", "W", " ", "W"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["B", " ", "B", " ", "B", " ", "B", " "],
    [" ", "B", " ", "B", " ", "B", " ", "B"],
    ["B", " ", "B", " ", "B", " ", "B", " "],
  ]);

  // Render the board
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, colIndex) => (
          <div key={colIndex} className={getCellColor(rowIndex, colIndex)}>
            {cell !== " " && <div className={`piece ${cell}`}></div>}
          </div>
        ))}
      </div>
    ));
  };

  // Determine cell color based on position
  const getCellColor = (row, col) => {
    return (row + col) % 2 === 0 ? "white-cell" : "black-cell";
  };

  return <div className="checkerboard">{renderBoard()}</div>;
};

export default Checkerboard;
