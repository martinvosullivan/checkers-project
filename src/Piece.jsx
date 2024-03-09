import React from "react";

const Piece = ({ player, isKing }) => {
  return <div className={`piece ${player} ${isKing ? "king" : ""}`}></div>;
};

export default Piece;
