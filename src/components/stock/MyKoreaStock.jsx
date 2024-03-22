import React, { useState, useEffect } from "react";
import "../../styles/globalStyle.css";
import Coin from "../../assets/stock/coin.png";
import Chart from "../../assets/stock/Increase.png";
import Folder from "../../assets/stock/folder.png";
import Arrow from "../../assets/stock/arrow.png";
import { getKoreaPortfolio } from "../../lib/apis/portfolio";
import { PieChartComponent } from "./PieChart";
import { useSelector } from "react-redux";

export default function MyKoreaStock() {
  const [myStock, setMyStock] = useState([]);
  const [assets, setAssets] = useState("0");
  const [chart, setChart] = useState({});
  const [hoverdata, setHoverdata] = useState("");
  const user = useSelector((state) => state.user.user) || {};

  console.log(user.user_id);

  useEffect(() => {
    const setData = async () => {
      const resp = await getKoreaPortfolio(user.user_id);
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          padding: "2% 5%",
        }}
      >
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
            {assets}
          </div>
          <div>
            {chart && chart.length > 0 && (
              <PieChartComponent codeRatioArray={chart} onHover={handleHover} />
            )}
          </div>

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
          padding: "2% 0%",
        }}
      >
        <div>
          <div class="mediumText" style={{ display: "flex" }}>
            <img src={Chart} style={{ height: "40px", width: "40px" }} />
            국내 보유종목
          </div>
        </div>

        <div style={{ height: "35%", overflow: "auto" }}>
          {myStock.map((stock, id) => {
            const isHovered = stock === hoverdata;
            return (
              <div
                key={id}
                className="mediumText"
                style={{
                  padding: "2% 5%",
                  border: `5px solid #FCD8D4`,
                  borderRadius: "30px",
                  margin: "10px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: isHovered ? "#FCD8D4" : "white",
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
