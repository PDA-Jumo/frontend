import React, { useContext } from "react";
import "../../styles/globalStyle.css";
import Character from "../../assets/stock/character.png";
import Coin from "../../assets/stock/coin.png";
import { MyStockPageContext } from "../../pages/Stock/Stock";
import "../../styles/myStock.css";

export default function MyStock() {
  const { setMyStockPage } = useContext(MyStockPageContext);

  return (
    <div
      style={{
        top: "190px",
        width: "100%",
        height: "1000px",
        display: "flex",
        //justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "space-between",
          padding:"4% 5%"
        }}
      >
        <img src={Character}></img>
        <div>
          <div class="smallText" style={{ color: "#F9C93E" }}>
            주대주주
          </div>
          <div class="xxxLargeText">김광태가뭐야</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div class="largeText" style={{ display: "flex" }}>
              <img src={Coin} style={{ height: "56px", width: "56px" }} />총
              보유자산
            </div>
            <div class="largeText">1,000,000,000원</div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8%",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingTop: "2%",
        }}
      >
        <div class="tab" onClick={() => setMyStockPage("2")}>
          국내주식
        </div>
        <div class="tab" onClick={() => setMyStockPage("3")}>
          해외주식
        </div>
        <div class="tab" onClick={() => setMyStockPage("4")}>
          관심종목
        </div>
      </div>
    </div>
  );
}
