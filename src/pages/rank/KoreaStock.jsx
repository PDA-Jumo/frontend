import React, { useState, useEffect } from "react";
import "../../styles/globalStyle.css";
import Coin from "../../assets/stock/coin.png";
import Chart from "../../assets/stock/Increase.png";
import Folder from "../../assets/stock/folder.png";
import Arrow from "../../assets/stock/arrow.png";
import { PieChartComponent } from "./PieChart.js";

export default function KoreaStock({ level, nickname }) {
  const [myStock, setMyStock] = useState([]);
  const [assets, setAssets] = useState("0");
  const [chart, setChart] = useState([]);
  const [hoverdata, setHoverdata] = useState("");

  /* API 오면 현재 코드 폐기하고 아래의 방식으로 유저데이터를 받을수 있지 않을까?. rankPortfolio.jsx에는 이미 userId가 존재한다.
 useEffect(() => {
    const setData = async () => {
      const resp = await getKoreaPortfolio(2);
      setMyStock(resp.myStock);
      setAssets(resp.assets);
      setChart(resp.mystock_percent);
    };

    setData();
  }, []);*/

  // 여기부터
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
    // 여기까지 : dummy로 채우는중인거임
    setData();
  }, []);

  function handleHover(data) {
    setHoverdata(data.stock_name);
  }

  return (
    <div className="koreaStockContainer">
      <div className="leftSection">
        <div style={{ textAlign: "left", marginLeft: "60px" }}>
          <div className="title">주대주주</div>
          <div className="xLargeText text-white" style={{ marginTop: "-10px" }}>
            {nickname}
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
