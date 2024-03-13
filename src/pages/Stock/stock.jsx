import React from "react";
import "../../styles/stock.css";
import Background from "../../assets/backgrounds/Stock.png";
import Folder from "../../assets/stock/folder.png"
export default function StockLayout() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img src={Background} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          width:"86%",
          top: 100,
          left: 100,
          display:"flex",
          justifyContent:"space-between"
        }}
      >
        <input class="input-style" type="text" />
        <div style={{display:"flex", gap:"5%", left:30}}>
        <tab class="korea"><img src={Folder}/>국내주식</tab>
        <tab class="korea"><img src={Folder}/>해외주식</tab>
        <tab class="korea"><img src={Folder}/>내주식</tab>

        </div>
       
      </div>
    </div>
  );
}
