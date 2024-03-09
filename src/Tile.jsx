import React from "react";
import "./Tile.css";

const Tile = ({ color, onClick, children }) => {
  return (
    <div className={`tile ${color}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Tile;
