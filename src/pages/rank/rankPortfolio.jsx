import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Rank from "../../assets/backgrounds/rank.png";
import Coin from "../../assets/coin.png";
import "./rank.css";
import "./portfolio.css";
import "./stockPortfolio.css";
import KoreaStock from "./KoreaStock";

export default function PortfolioList() {
  const navigate = useNavigate();
  const [showKoreanStock, setShowKoreanStock] = useState(false);

  useEffect(() => {
    // document 객체 직접 접근 지양 (reacT는 virtual-dom )
    // WRAPPER element를 만들고,
    // 전역적(모든 컴포넌트에서) wrapper element에 접근 및 조작이 필요.
    // (전역적= > context), wrapper element에 접근(ref)
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleKoreanStockClick = () => {
    setShowKoreanStock(true);
  };

  return (
    <div className="background-style">
      <img src={Rank} className="background-image" alt="Rank Background" />
      <div className="ranking-header-container">
        <div className="ranking-header text-white">포트폴리오</div>
      </div>
      <div className="pp-position">
        {!showKoreanStock && (
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
              <button className="tab-button" onClick={handleKoreanStockClick}>
                국내주식
              </button>
              <button className="tab-button">해외주식</button>
            </div>
          </>
        )}
        {showKoreanStock && <KoreaStock />}
      </div>
      <button className="back-button1" onClick={() => navigate("/home")}>
        홈으로
      </button>
      {showKoreanStock && (
        <button
          className="back-button1"
          onClick={() => setShowKoreanStock(false)}
        >
          뒤로가기
        </button>
      )}
    </div>
  );
}
