import React from "react";

export default function StockDetail() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          backgroundColor: "#FBD115",
          height: "70px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <span className="largeText">신한지주</span>
          <span
            style={{ marginBottom: "5px", color: "#62616D", marginLeft: "8px" }}
          >
            A05550
          </span>
        </div>
        <span className="largeText">46,000</span>
      </div>
    </div>
  );
}
