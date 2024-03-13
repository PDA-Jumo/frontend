import React from "react";
import Rank from "../../assets/backgrounds/rank.png";
export default function TestLayout() {
  return (
    <div class="background-style">
      <img src={Rank} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 100,
        }}
      ></div>
    </div>
  );
}
