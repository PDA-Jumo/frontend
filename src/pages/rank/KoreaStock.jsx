import React, { useState, useEffect } from "react";
import "../../styles/globalStyle.css";
import Coin from "../../assets/stock/coin.png";
import Chart from "../../assets/stock/Increase.png";
import Folder from "../../assets/stock/folder.png";
import Arrow from "../../assets/stock/arrow.png";
import { PieChartComponent } from "./PieChart.js";
import { getKoreaPortfolio } from "../../lib/apis/portfolio";
import levelData from "../home/levelData.js";

export default function KoreaStock({ level, nickname, userId }) {
  const [myStock, setMyStock] = useState([]);
  const [assets, setAssets] = useState("0");
  const [chart, setChart] = useState([]);
  const [hoverdata, setHoverdata] = useState("");

  useEffect(() => {
    const setData = async () => {
      const resp = await getKoreaPortfolio(userId);
      setMyStock(resp.myStock);
      setAssets(resp.assets);
      setChart(resp.mystock_percent);
    };

    setData();
  }, [userId]);

  function handleHover(data) {
    setHoverdata(data.stock_name);
  }

  return (
    <div className="koreaStockContainer">
      <div className="leftSection">
        <div style={{ textAlign: "left", marginLeft: "60px" }}>
          <div className="title">{levelData[level] || "알 수 없음"}</div>
          <div className="xLargeText text-white" style={{ marginTop: "-10px" }}>
            {nickname}
          </div>
        </div>

        <div className="stockInfoSection">
          <div className="largeText text-white assetsDisplay">
            <img src={Coin} className="icon" alt="Coin" />
            평가금액
          </div>
          <div className="mediumText text-white">{assets}원</div>
          <div>
            {chart && chart.length > 0 && (
              <PieChartComponent
                codeRatioArray={chart}
                onHover={handleHover}
                hoverdata={hoverdata}
              />
            )}
          </div>
        </div>
      </div>

      <div className="rightSection">
        <div>
          <div className="largeText text-white stockDisplay">
            <img src={Chart} className="icon" alt="Increase" />
            국내 보유종목
          </div>
        </div>

        <div className="stockList">
          {myStock.map((stock, id) => {
            const isHovered = stock === hoverdata;
            return (
              <div
                key={id}
                className={`stockItem ${isHovered ? "hovered" : ""}`}
                onMouseEnter={() => handleHover({ stock_name: stock })}
                onMouseLeave={() => setHoverdata("")}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={Folder}
                    alt="Folder"
                    style={{ marginRight: "8px" }}
                  />
                  {stock}
                </div>
                <img src={Arrow} className="arrowIcon" alt="Arrow" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
