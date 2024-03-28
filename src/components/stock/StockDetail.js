import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

//css
import "../../styles/stockDetails.css";

//assets
import character from "../../assets/character/shinhan_computer.png";
import TradeModal from "./TradeModal";

import { getStockDetail, getStockNews } from "../../lib/apis/stock";

export default function StockDetail() {
  const [isTrade, setIsTrade] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [stockd, setStockD] = useState([]);
  const [stocknews, setStockNews] = useState([{}]);
  const location = useLocation();

  useEffect(() => {
    const setData = async () => {
      const resp = await getStockDetail(location.state.stock_code); //종목 정보 (시가총액, per ...)
      const res = await getStockNews(location.state.stock_code); // 종목 뉴스
      setStockD(resp);
      setStockNews(res);
      console.log(location);
    };
    setData();
  }, []);

  console.log(stockd);

  console.log(stocknews);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        overflowX: "hidden",
        backgroundColor: "white",
      }}
    >
      {isTrade ? <TradeModal setIsTrade={setIsTrade} /> : null}
      <div
        style={{
          // backgroundColor: "#FFDE6B",
          height: "70px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginLeft: "16px",
            borderBottom: "5px solid #FFDE6B",
            boxSizing: "border-box",
            paddingInline: "8px",
          }}
        >
          <span className="largeText">
            {location.state.stock_name || location.state.stbd_nm}
          </span>
          <span
            style={{ marginBottom: "5px", color: "#B9B9B9", marginLeft: "8px" }}
          >
            {location.state.stock_code}
          </span>
        </div>
        <span
          className="largeText"
          style={{ color: "white", marginRight: "16px" }}
        >
          {stockd.prpr}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          height: "300px",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "60%",
            backgroundColor: "black",
            borderRadius: "16px",
            marginBlock: "16px",
          }}
        />
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={character}
            style={{
              height: "100px",
              alignSelf: "center",
              marginBottom: "8px",
            }}
          />

          <div style={{ display: "flex", gap: "8px" }}>
            <div className="stockDetailTradeButton">커뮤니티</div>
            <div className="stockDetailTradeButton">소수점 거래하기</div>
            <div
              className="stockDetailTradeButton"
              onClick={() => setIsTrade(true)}
            >
              주식 거래하기
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", marginLeft: "20px" }}>
        <div
          className={"stockDetailTab" + (activeTab === "info" ? " active" : "")}
          style={{ marginLeft: "10px", cursor: "pointer" }}
          onClick={() => setActiveTab("info")}
        >
          종목 정보
        </div>
        <div
          className={"stockDetailTab" + (activeTab === "news" ? " active" : "")}
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("news")}
        >
          뉴스
        </div>
      </div>
      <div
        style={{
          border: "3px solid #ffde6b",
          height: "200px",
          borderRadius: "16px",
          marginInline: "16px",
          marginBottom: "16px",
        }}
      >
        {activeTab === "info" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30vh",
              gap: "5%",
            }}
          >
            <div>
              <div class="info">
                시가 총액<div>{stockd.hts_avls}</div>
              </div>
              <hr />
              <div class="info">
                pbr <div>{stockd.pbr}</div>
              </div>
              <hr />
            </div>

            <div>
              <div class="info">
                per<div>{stockd.per}</div>
              </div>
              <hr />
              <div class="info">
                외국인 소진율<div>{stockd.hts_frgn_ehrt}</div>
              </div>
              <hr />
            </div>
          </div>
        )}
        {activeTab === "news" && (
          <div style={{ height: "200px", overflowY: "scroll" }}>
            <div style={{ margin: "2% 2%" }}>
              {stocknews.map((item, id) => (
                <div
                  key={id}
                  onClick={() => {
                    window.location.href = item.url;
                  }}
                  style={{ cursor: "pointer", marginTop: "1%" }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
