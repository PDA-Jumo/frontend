import React from "react";
import Rank from "../../assets/backgrounds/rank.png";
import rankStar from "../../assets/rankStar.png";
import "./rank.css";
export default function PortfolioList() {
  return (
    <div className="background-style">
      <img src={Rank} className="background-image" alt="Rank Background" />
      <div className="ranking-header-container">
        <div className="ranking-header">포트폴리오</div>
      </div>
      <div className="content-position">테스트</div>
      <button className="back-button" onClick={() => window.history.back()}>
        홈으로
      </button>
    </div>
  );
}
