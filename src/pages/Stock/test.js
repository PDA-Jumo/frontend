import React from "react";
import WorldStockDetails from "../../components/stock/WorldStockDetails";

export default function TestStockPage() {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "5px solid black",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1F409A",
          height: "60px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          border: "4px solid black",
        }}
      >
        <span style={{ marginRight: "16px", color: "white" }}>
          주린이의 모험
        </span>
      </div>
      <div
        style={{
          border: "4px solid black",
          width: "95%",
          height: "80%",
          marginBlock: "8px",
          padding: "16px",
        }}
      >
        <WorldStockDetails />
      </div>
      <div
        style={{
          height: "40px",
          backgroundColor: "#1F409A",
          width: "100%",
          border: "4px solid black",
        }}
      />
    </div>
  );
}
