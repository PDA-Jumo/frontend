import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rank from "../../assets/backgrounds/rank.png";
import Coin from "../../assets/coin.png";
import KoreaStock from "./KoreaStock";
import WorldStock from "./WorldStock";
import "./rank.css";
import "./portfolio.css";
import "./stockPortfolio.css";

export default function PortfolioList() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("");
  return (
    <div className="background-style">
      <img src={Rank} className="background-image" alt="Rank Background" />
      <div className="ranking-header-container">
        <div className="ranking-header text-white">포트폴리오</div>
      </div>
      <div className="pp-position">
        {selectedTab === "" && (
          <>
            <div className="ranking-content">
              <div>
                <div className="pp-title">주대주주</div>
                <div className="text-white text-bigtitle">김광태가뭐야</div>
                <div className="asset-container">
                  <div className="text-white text-title">
                    <img src={Coin} className="coin-image" alt="" />총 보유자산
                  </div>
                  <div className="text-white text-title">1,000,000,000원</div>
                </div>
              </div>
            </div>
            <div className="tabs-container">
              <button
                className="tab-button"
                onClick={() => setSelectedTab("korean")}
              >
                국내주식
              </button>
              <button
                className="tab-button"
                onClick={() => setSelectedTab("world")}
              >
                해외주식
              </button>
            </div>
          </>
        )}
        {selectedTab === "korean" && <KoreaStock />}
        {selectedTab === "world" && <WorldStock />}
      </div>

      {selectedTab == "" && (
        <button className="back-button1" onClick={() => navigate("/home")}>
          홈으로
        </button>
      )}

      {selectedTab !== "" && (
        <button
          className="back-button1"
          style={{ padding: "10px 28px" }}
          onClick={() => setSelectedTab("")}
        >
          뒤로가기
        </button>
      )}
    </div>
  );
}
