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

  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleCellClick = (row, col, piece) => {
    if (selectedPiece) {
      if (
        isValidMove(
          selectedPiece.row,
          selectedPiece.col,
          row,
          col,
          selectedPiece.player,
        )
      ) {
        movePiece(selectedPiece.row, selectedPiece.col, row, col);
        setSelectedPiece(null);
      }
    } else {
      if (piece !== " ") {
        setSelectedPiece({ row, col, player: piece });
      }
    }
  };

  const movePiece = (startRow, startCol, endRow, endCol) => {
    const newBoard = [...board];
    newBoard[endRow][endCol] = newBoard[startRow][startCol];
    newBoard[startRow][startCol] = " ";
    setBoard(newBoard);
  };

  const isValidMove = (startRow, startCol, endRow, endCol, player) => {
    const diffRow = Math.abs(endRow - startRow);
    const diffCol = Math.abs(endCol - startCol);
    const direction = player === "W" ? -1 : 1;

    // Check if the move is within the board bounds and destination is empty
    if (
      endRow >= 0 &&
      endRow < 8 &&
      endCol >= 0 &&
      endCol < 8 &&
      board[endRow][endCol] === " "
    ) {
      // Normal move
      if (diffRow === 1 && diffCol === 1) {
        return true;
      }
      // Capture move
      else if (diffRow === 2 && diffCol === 2) {
        const middleRow = (startRow + endRow) / 2;
        const middleCol = (startCol + endCol) / 2;
        if (
          board[middleRow][middleCol] !== " " &&
          board[middleRow][middleCol] !== player
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Render the board
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className={getCellColor(rowIndex, colIndex)}
            onClick={() => handleCellClick(rowIndex, colIndex, cell)}
          >
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
