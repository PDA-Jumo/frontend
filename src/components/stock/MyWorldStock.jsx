import React from "react";
import "../../styles/globalStyle.css";
import Coin from "../../assets/stock/coin.png";
import Chart from "../../assets/stock/Increase.png";
import Folder from "../../assets/stock/folder.png";
import Arrow from "../../assets/stock/arrow.png";

let color = ["#FF98CC", "#6366F1", "#3B82F6", "#F59E0B", "#D9D9D9"];

let mykstock = ["삼성전자", "어쩌구", "저쩌구", "에구구", "얌마"];

export default function MyWorldStock() {
  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        right: "100px",
        width: "86%",
        height: "77%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <div>
          <div style={{ fontSize: "18px", color: "#F9C93E" }}>주대주주</div>
          <div class="mediumText">김광태가뭐야</div>
        </div>

        <div
          style={{
            border: "3px solid #FFDE68",
            borderRadius: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div class="smallText" style={{ display: "flex" }}>
            <img src={Coin} style={{ height: "40px", width: "40px" }} />
            보유자산
          </div>
          <div class="smallText" style={{ display: "flex" }}>
            500,000,000원
          </div>
          <div
            style={{ width: "50%", height: "250px", backgroundColor: "blue" }}
          ></div>
          <div
            style={{
              width: "65%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "43%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              전체 수익률<div style={{ color: "red" }}>19.37%</div>
            </div>
            <div
              style={{
                width: "55%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              평가 수익 금액 <div style={{ color: "red" }}>7,040,204</div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "45%",
          height: "1000px",
        }}
      >
        <div>
          <div class="mediumText" style={{ display: "flex" }}>
            <img src={Chart} style={{ height: "40px", width: "40px" }} />
            해외 보유종목
          </div>
        </div>

        <div style={{ height: "35%", overflow: "auto" }}>
          {mykstock.map((stock, id) => {
            return (
              <div
                key={id}
                className="mediumText"
                style={{
                  padding: "2% 5%",
                  border: `5px solid ${color[id]}`,
                  borderRadius: "30px",
                  margin: "10px 0",
                  display: "flex",
                  justifyContent:"space-between",
                  alignItems:"center"
                }}
              >
                <div>
                  <img src={Folder} />
                  {stock}
                </div>
                <img
                  src={Arrow}
                  style={{
                    width: "8%",
                    height: "4%",
                  
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
