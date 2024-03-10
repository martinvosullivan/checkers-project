import "./styles.css";
import "./Ad.css";
import { useState } from "react";
import Checkerboard from "./Board";
import CheckersGame from "./Game";
import AdAPI from "./AdAPI";
import * as React from "react";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameStart = () => {
    setGameStarted(true);
  };

  return (
    <div className="container">
      <div className="checkers-container">
        {!gameStarted ? (
          <CheckersGame onStartGame={handleGameStart} />
        ) : (
          <Checkerboard />
        )}
        <AdAPI />
      </div>
    </div>
  );
}
