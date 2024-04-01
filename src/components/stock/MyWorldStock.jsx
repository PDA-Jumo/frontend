import React, { useState, useEffect } from "react";
import "../../styles/globalStyle.css";
import "../../styles/stock.css";
import Coin from "../../assets/stock/coin.png";
import Chart from "../../assets/stock/Increase.png";
import Folder from "../../assets/stock/folder.png";
import Arrow from "../../assets/stock/arrow.png";
import { getWorldPortfolio } from "../../lib/apis/portfolio";
import { PieChartComponent } from "./PieChart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import character from "../../assets/stock/character.png";

export default function MyWorldStock() {
  const [assets, setAssets] = useState("0");
  const [chart, setChart] = useState([]);
  const [hoverdata, setHoverdata] = useState("");
  const user = useSelector((state) => state.user.user) || {};
  const [yieldrate, setYieldrate] = useState("0");
  const [yieldmoney, setYieldmoney] = useState("0");
  const navigate = useNavigate();

  console.log(user.user_id);

  useEffect(() => {
    const setData = async () => {
      const resp = await getWorldPortfolio(user.user_id);
      setAssets(resp.assets);
      setChart(resp.mystock_percent);
      setYieldrate(resp.yield_rate);
      setYieldmoney(resp.yield_money);
    };

    setData();
  }, []);

  console.log();
  function handleHover(data) {
    console.log(data.stock_name);
    setHoverdata(data.stock_name);
  }

  console.log(chart);

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
          <div style={{ fontSize: "18px", color: "#F9C93E" }}>
            {user.level_name}
          </div>
          <div class="mediumText">{user.nickname}</div>
        </div>

        {chart.length === 0 ? (
          <div
            style={{
              display: "flex",
              paddingTop: "7%",
              justifyContent: "flex-end",
            }}
          >
            <img src={character} />
          </div>
        ) : (
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
                <PieChartComponent
                  codeRatioArray={chart}
                  onHover={handleHover}
                  onMouseOut={() => setHoverdata(null)}
                />
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
                전체 수익률<div style={{ color: "red" }}>{yieldrate}%</div>
              </div>
              <div
                style={{
                  width: "55%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                평가 수익 금액 <div style={{ color: "red" }}>{yieldmoney}</div>
              </div>
            </div>
          </div>
        )}
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
            해외 보유종목
          </div>
        </div>

        <div style={{ height: "35%", overflow: "auto" }}>
          {chart.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: "36px",
              }}
            >
              {user.nickname} 님은 현재
              <br />
              보유한 주식이 없습니다.
            </div>
          ) : (
            chart.map((stock, id) => {
              const isHovered = stock.stock_name === hoverdata;
              return (
                <div
                  key={id}
                  className={`koreastock ${isHovered ? "hovered" : ""}`}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    onClick={() => {
                      navigate(`/stock/detail/${stock.stock_code}`);
                    }}
                  >
                    <img src={Folder} />
                    {stock.stock_name}
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
            })
          )}
        </div>
      </div>
    </div>
  );
}
