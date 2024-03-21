import React, { useState, useEffect } from "react";
import "../../styles/globalStyle.css";
import Coin from "../../assets/stock/coin.png";
import Chart from "../../assets/stock/Increase.png";
import Folder from "../../assets/stock/folder.png";
import Arrow from "../../assets/stock/arrow.png";
import { PieChartComponent } from "./PieChart.js";

export default function KoreaStock() {
  const [myStock, setMyStock] = useState([]);
  const [assets, setAssets] = useState("0");
  const [chart, setChart] = useState([]);
  const [hoverdata, setHoverdata] = useState("");
  function handleMouseEnter(stockName) {
    setHoverdata(stockName);
  }

  function handleMouseLeave() {
    setHoverdata("");
  }
  useEffect(() => {
    const setData = async () => {
      const resp = {
        myStock: [
          "삼성전자",
          "LG화학",
          "현대자동차",
          "KT&G",
          "오브젠",
          "프로티아",
        ],
        assets: "100,000,000",
        mystock_percent: [
          { stock_name: "삼성전자", percent: 10 },
          { stock_name: "LG화학", percent: 20 },
          { stock_name: "현대자동차", percent: 10 },
          { stock_name: "KT&G", percent: 10 },
          { stock_name: "오브젠", percent: 20 },
          { stock_name: "프로티아", percent: 20 },
        ],
      };
      setMyStock(resp.myStock);
      setAssets(resp.assets);
      setChart(resp.mystock_percent);
    };

    setData();
  }, []);

  function handleHover(data) {
    console.log(data.stock_name);
    setHoverdata(data.stock_name);
  }

  return (
    <div className="koreaStockContainer">
      <div className="leftSection">
        <div style={{ textAlign: "left", marginLeft: "60px" }}>
          <div className="title">주대주주</div>
          <div className="xLargeText text-white" style={{ marginTop: "-10px" }}>
            김광태가뭐야
          </div>
        </div>

        <div className="stockInfoSection">
          <div className="largeText text-white assetsDisplay">
            <img src={Coin} className="icon" alt="Coin" />
            보유자산
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
