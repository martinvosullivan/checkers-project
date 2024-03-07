import React, { useState } from "react";
import "./Checkerboard.css";

const Checkerboard = () => {
  // Define the initial state for the checkerboard
  const [board, setBoard] = useState([
    [
      { player: " ", isKing: false },
      { player: "W", isKing: false },
      { player: " ", isKing: false },
      { player: "W", isKing: false },
      { player: " ", isKing: false },
      { player: "W", isKing: false },
      { player: " ", isKing: false },
      { player: "W", isKing: false },
    ],
    [
      { player: "W", isKing: false },
      { player: " ", isKing: false },
      { player: "W", isKing: false },
      { player: " ", isKing: false },
      { player: "W", isKing: false },
      { player: " ", isKing: false },
      { player: "W", isKing: false },
      { player: " ", isKing: false },
    ],
    [
      { player: " ", isKing: false },
      { player: "W", isKing: false },
      { player: " ", isKing: false },
      { player: "W", isKing: false },
      { player: " ", isKing: false },
      { player: "W", isKing: false },
      { player: " ", isKing: false },
      { player: "W", isKing: false },
    ],
    [
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
    ],
    [
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
      { player: " ", isKing: false },
    ],
    [
      { player: "B", isKing: false },
      { player: " ", isKing: false },
      { player: "B", isKing: false },
      { player: " ", isKing: false },
      { player: "B", isKing: false },
      { player: " ", isKing: false },
      { player: "B", isKing: false },
      { player: " ", isKing: false },
    ],
    [
      { player: " ", isKing: false },
      { player: "B", isKing: false },
      { player: " ", isKing: false },
      { player: "B", isKing: false },
      { player: " ", isKing: false },
      { player: "B", isKing: false },
      { player: " ", isKing: false },
      { player: "B", isKing: false },
    ],
    [
      { player: "B", isKing: false },
      { player: " ", isKing: false },
      { player: "B", isKing: false },
      { player: " ", isKing: false },
      { player: "B", isKing: false },
      { player: " ", isKing: false },
      { player: "B", isKing: false },
      { player: " ", isKing: false },
    ],
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
          selectedPiece.isKing,
        )
      ) {
        movePiece(selectedPiece.row, selectedPiece.col, row, col);
        setSelectedPiece(null);
      } else {
        setSelectedPiece(null);
      }
    } else {
      if (piece.player !== " ") {
        setSelectedPiece({
          row,
          col,
          player: piece.player,
          isKing: piece.isKing,
        });
      }
    }
  };

  const movePiece = (startRow, startCol, endRow, endCol) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[endRow][endCol] = newBoard[startRow][startCol];
    newBoard[startRow][startCol] = { player: " ", isKing: false };

    // Check for promotion to king
    if (
      (endRow === 7 && newBoard[endRow][endCol].player === "W") ||
      (endRow === 0 && newBoard[endRow][endCol].player === "B")
    ) {
      newBoard[endRow][endCol].isKing = true;
    }

    // Capture move: Remove the captured piece
    if (
      Math.abs(endRow - startRow) === 2 &&
      Math.abs(endCol - startCol) === 2
    ) {
      const middleRow = (startRow + endRow) / 2;
      const middleCol = (startCol + endCol) / 2;
      newBoard[middleRow][middleCol] = { player: " ", isKing: false };
    }

    setBoard(newBoard);
  };

  const isValidMove = (startRow, startCol, endRow, endCol, player, isKing) => {
    const diffRow = endRow - startRow;
    const diffCol = Math.abs(endCol - startCol);
    const direction = player === "W" ? -1 : 1;

    // Check if the move is within the board bounds and destination is empty
    if (
      endRow >= 0 &&
      endRow < 8 &&
      endCol >= 0 &&
      endCol < 8 &&
      board[endRow][endCol].player === " "
    ) {
      // Normal move for kings
      if (isKing && Math.abs(diffRow) === 1 && diffCol === 1) {
        return true;
      }
      // Move forward for normal pieces
      else if (!isKing && direction * diffRow === -1 && diffCol === 1) {
        return true;
      }
      // Capture move
      else if (Math.abs(diffRow) === 2 && diffCol === 2) {
        const middleRow = (startRow + endRow) / 2;
        const middleCol = (startCol + endCol) / 2;
        if (
          board[middleRow][middleCol].player !== " " &&
          board[middleRow][middleCol].player !== player
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
            {cell.player !== " " && (
              <div
                className={`piece ${cell.player} ${cell.isKing ? "king" : ""}`}
              ></div>
            )}
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
