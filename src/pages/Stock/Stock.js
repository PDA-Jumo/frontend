import React from "react";
import SearchTab from "../../components/stock/SearchTab";
import WorldStockDetails from "../../components/stock/WorldStockDetails";

import "../../styles/stock.css";

export default function StockPage() {
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
      <SearchTab />
      <div
        style={{
          border: "4px solid black",
          width: "95%",
          height: "70%",
          marginBlock: "8px",
          padding: "8px",
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
