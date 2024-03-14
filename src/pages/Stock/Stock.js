import React from "react";

//assets
import Folder from "../../assets/stock/folder.png";
//components
import SearchTab from "../../components/stock/SearchTab";
import WorldStockDetails from "../../components/stock/WorldStockDetails";

//css
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          marginBlock: "8px",
        }}
      >
        <SearchTab />
        <div style={{ display: "flex", gap: "5%", left: 30 }}>
          <tab class="korea">
            <img src={Folder} />
            국내주식
          </tab>
          <tab class="korea">
            <img src={Folder} />
            해외주식
          </tab>
          <tab class="korea">
            <img src={Folder} />
            내주식
          </tab>
        </div>
      </div>
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
