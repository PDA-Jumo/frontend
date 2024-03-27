import React, { useState } from "react";

//css
import "../../styles/globalStyle.css";
import "../../styles/stockDetails.css";

//assets
import Flag from "../../assets/icons/flag.png";
import shinhan_heart_chatbox from "../../assets/stock/shinhan_heart_chatbox.png";

//components
import StockList from "./StockList";

export default function StockPrice() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedMySmallTab, setSelectedMySmallTab] = useState(1);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "45%" }}>
        <div style={{ display: "flex" }}>
          <img
            src={Flag}
            className="iconSmall"
            style={{ marginRight: "8px" }}
          />
          <div
            className="myStockTab"
            style={{
              backgroundColor: selectedTab === 0 ? "#ffe27a" : "white",
            }}
            onClick={() => setSelectedTab(0)}
          >
            나의 종목 시세
          </div>
          <div
            className="myStockTab"
            style={{
              backgroundColor: selectedTab === 1 ? "#ffe27a" : "white",
            }}
            onClick={() => setSelectedTab(1)}
          >
            추천 종목
          </div>
        </div>
        <div
          style={{
            width: "100%",
            marginLeft: "3px",
            // border: "3px solid #6082E1",
            borderRadius: "16px",
            boxShadow: "2px 0px 5px 0px rgba(0,0,0,0.2)",
            padding: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "2%" }}>
            <div
              className={
                selectedMySmallTab === 0 ? "smallTabSelected" : "smallTab"
              }
              onClick={() => setSelectedMySmallTab(0)}
            >
              최근종목
            </div>
            <div
              className={
                selectedMySmallTab === 1 ? "smallTabSelected" : "smallTab"
              }
              onClick={() => setSelectedMySmallTab(1)}
            >
              보유종목
            </div>
            <div
              className={
                selectedMySmallTab === 2 ? "smallTabSelected" : "smallTab"
              }
              onClick={() => setSelectedMySmallTab(2)}
            >
              관심종목
            </div>
          </div>
          <div>
            <StockList />
            <StockList />
            <StockList />
            <StockList />
            <StockList />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "45%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          src={shinhan_heart_chatbox}
          style={{ width: "300px", height: "300px" }}
        />
      </div>
    </div>
  );
}
