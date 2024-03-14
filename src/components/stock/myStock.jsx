import React from "react";
import "../../styles/globalStyle.css";
import Character from "../../assets/stock/character.png";
import Coin from "../../assets/stock/coin.png";

export default function MyStock() {
  return (
    <div
      style={{
        position: "absolute",
        top: "270px",
        width: "100%",
        height: "77%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "47%",
          justifyContent: "space-between",
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
          paddingTop: "4%",
        }}
      >
        <div
          class="mediumText"
          style={{
            width: "200px",
            height: "60px",
            border: "5px solid #FFDE68",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          국내주식
        </div>
        <div
          class="mediumText"
          style={{
            width: "200px",
            height: "60px",
            border: "5px solid #FFDE68",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          해외주식
        </div>
        <div
          class="mediumText"
          style={{
            width: "200px",
            height: "60px",
            border: "5px solid #FFDE68",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          관심종목
        </div>
      </div>
    </div>
  );
}
