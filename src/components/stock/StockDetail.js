import React, { useState } from "react";

//css
import "../../styles/stockDetails.css";

//assets
import character from "../../assets/character/shinhan_computer.png";
import TradeModal from "./TradeModal";

export default function StockDetail() {
  const [isTrade, setIsTrade] = useState(false);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        overflowX: "hidden",
        backgroundColor: "white",
      }}
    >
      {isTrade ? <TradeModal setIsTrade={setIsTrade} /> : null}
      <div
        style={{
          backgroundColor: "#0F3AB1",
          height: "70px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginLeft: "16px",
          }}
        >
          <span className="largeText" style={{ color: "white" }}>
            신한지주
          </span>
          <span
            style={{ marginBottom: "5px", color: "#B9B9B9", marginLeft: "8px" }}
          >
            A05550
          </span>
        </div>
        <span
          className="largeText"
          style={{ color: "white", marginRight: "16px" }}
        >
          46,000
        </span>
      </div>
      <div
        style={{
          display: "flex",
          height: "300px",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "60%",
            backgroundColor: "black",
            borderRadius: "16px",
            marginBlock: "16px",
          }}
        />
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={character}
            style={{
              height: "100px",
              alignSelf: "center",
              marginBottom: "8px",
            }}
          />

          <div style={{ display: "flex", gap: "8px" }}>
            <div className="stockDetailTradeButton">커뮤니티</div>
            <div className="stockDetailTradeButton">소수점 거래하기</div>
            <div
              className="stockDetailTradeButton"
              onClick={() => setIsTrade(true)}
            >
              주식 거래하기
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", marginLeft: "20px" }}>
        <div className="stockDetailTab" style={{ marginLeft: "10px" }}>
          종목 정보
        </div>
        <div className="stockDetailTab">뉴스</div>
      </div>
      <div
        style={{
          border: "3px solid #0F3AB1",
          height: "200px",
          borderRadius: "16px",
          marginInline: "16px",
          marginBottom: "16px",
        }}
      ></div>
    </div>
  );
}
