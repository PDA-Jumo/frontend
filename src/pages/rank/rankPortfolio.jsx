import React from "react";
import Rank from "../../assets/backgrounds/rank.png";
import { useNavigate } from "react-router-dom";
import Coin from "../../assets/coin.png";
import "./rank.css";
import "./portfolio.css";

//TODO 랭크를 누르면, 해당 userId 정보에 해당하는 페이지로 redirect 되어야 함
//TODO 라우터 링크도 /portfolio가 아닌 /:userId로 변경 예정

export default function PortfolioList() {
  const navigate = useNavigate();

  return (
    <div className="background-style">
      <img src={Rank} className="background-image" alt="Rank Background" />
      <div className="ranking-header-container">
        <div className="ranking-header text-white">포트폴리오</div>
      </div>
      <div className="pp-position">
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
        {/* TODO 전체적으로 사용자의 정보 및 보유자산을 userId를 통해 받아올 수 있어야 한다*/}
        <div className="tabs-container">
          <button className="tab-button">국내주식</button>
          <button className="tab-button">해외주식</button>
          <button className="tab-button">관심종목</button>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate("/home")}>

        홈으로
      </button>
    </div>
  );
}
