import React from "react";
import "../../styles/globalStyle.css";
import Character from "../../assets/stock/character.png";
import Chart from "../../assets/stock/Increase.png";
import Folder from "../../assets/stock/folder.png";
import Arrow from "../../assets/stock/arrow.png";

let color = ["#FF98CC", "#6366F1", "#3B82F6", "#F59E0B", "#D9D9D9"];

let mykstock = ["삼성전자", "어쩌구", "저쩌구", "에구구", "얌마"];

export default function MyLikeStock() {
  return (
    <div
      style={{
        top: "190px",
        right: "100px",
        width: "86%",
        height: "77%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "40%", padding:"2% 5%"}}>
        <div>
          <div style={{ fontSize: "18px", color: "#F9C93E" }}>주대주주</div>
          <div class="mediumText">김광태가뭐야</div>
        </div>

        <div style={{display:"flex", justifyContent:"center"}}>
          <img src={Character} style={{ width: "250px", height: "300px", padding:"5% 0" }} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          height: "1000px",
          padding:"2% 0%"
        }}
      >
        <div>
          <div class="mediumText" style={{ display: "flex" }}>
            <img src={Chart} style={{ height: "40px", width: "40px" }} />
            국내 보유종목
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
                  justifyContent: "space-between",
                  alignItems: "center",
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
