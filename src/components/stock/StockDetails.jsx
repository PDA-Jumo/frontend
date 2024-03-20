import React from "react";

//css
import "../../styles/globalStyle.css";

//assets
import Flag from "../../assets/icons/flag.png";

export default function StockDetails() {
  return (
    <div
      style={{
        position: "absolute",
        top: "90px",
        left: "100px",
        right: "100px",
        width: "86%",
        height: "77%",
      }}
    >
      <div
        className="textShadow"
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        <img src={Flag} className="iconSmall" style={{ margin: "8px" }} />
        주요 지수
      </div>
    </div>
  );
}
