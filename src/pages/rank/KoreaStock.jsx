import React, { useState, useEffect } from "react";
import "../../styles/globalStyle.css";
import Coin from "../../assets/stock/coin.png";
import Chart from "../../assets/stock/Increase.png";
import Folder from "../../assets/stock/folder.png";
import Arrow from "../../assets/stock/arrow.png";
import { PieChartComponent } from "./PieChart.js";
import { getKoreaPortfolio } from "../../lib/apis/portfolio";
import levelData from "../home/levelData.js";
import { useNavigate } from "react-router-dom";

export default function KoreaStock({ level, nickname, userId }) {
  const [myStock, setMyStock] = useState([]);
  const [stockCodes, setStockCodes] = useState([]);
  const [assets, setAssets] = useState("0");
  const [chart, setChart] = useState([]);
  const [hoverdata, setHoverdata] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const setData = async () => {
      const resp = await getKoreaPortfolio(userId);
      setMyStock(resp.myStock);
      setStockCodes(resp.myStockCode);
      setAssets(resp.assets);
      setChart(resp.mystock_percent);
    };

    setData();
  }, [userId]);

  const handleArrowClick = (id) => {
    navigate(`/stock/detail/${stockCodes[id]}`, {
      state: { stock_code: stockCodes[id], stock_name: myStock[id] },
    });
  };

  function handleHover(data) {
    setHoverdata(data.stock_name);
  }

  return (
    <div className="koreaStockContainer">
      <div className="leftSection">
        <div
          style={{ textAlign: "left", marginLeft: "60px", marginTop: "-18px" }}
        >
          <div className="title">
            Lv.{level} {levelData[level] || "알 수 없음"}
          </div>
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
          <div style={{ marginTop: "4px" }}>
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

        <div className="stockList" style={{ height: "100%" }}>
          {myStock.length > 0 ? (
            myStock.map((stock, id) => {
              const isHovered = stock === hoverdata;
              return (
                // 주식이 하나라도 있을때는 기존처럼 출력
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
                  <img
                    src={Arrow}
                    className="arrowIcon"
                    alt="Arrow"
                    onClick={() => handleArrowClick(id)}
                  />
                </div>
              );
            })
          ) : (
            // 주식이 하나도 없으면 원래 표시되어야할 영역 정중앙에 텍스트 잡고,
            // ㅇㅇㅇ님은 현재 보유한 주식이 없습니다. 라고 작성했음.
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "white",
                fontSize: "36px",
              }}
            >
              {nickname} 님은 현재
              <br />
              보유한 주식이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
