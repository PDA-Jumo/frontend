import React from "react";
import "../../styles/stock.css";
import Background from "../../assets/backgrounds/Stock.png";
export default function StockLayout() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img src={Background} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 100,
        }}
      >
        <input class="input-style" type="text" />
      </div>
    </div>
  );
}
