import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rank from "../../assets/backgrounds/rank.png";
import Coin from "../../assets/coin.png";
import KoreaStock from "./KoreaStock";
import WorldStock from "./WorldStock";
import "./rank.css";
import "./portfolio.css";
import "./stockPortfolio.css";
import levelData from "../home/levelData";
import { letsGetUserInfo } from "../../lib/apis/user";

export default function PortfolioList() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [selectedTab, setSelectedTab] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await letsGetUserInfo(userId);
        setUserInfo(userInfo);
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
      }
    };

    getUserInfo();
  }, [userId, selectedTab]);

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
                <div className="pp-title">{levelData[userInfo?.level]} </div>
                <div className="text-white text-bigtitle">
                  {userInfo?.nickname || "로딩 중..."}
                </div>
                <div className="asset-container">
                  <div className="text-white text-title">
                    <img src={Coin} className="coin-image" alt="" />총 보유자산
                  </div>
                  <div className="text-white text-title">
                    {userInfo?.total_assets}원
                  </div>
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
        {selectedTab === "korean" && (
          <KoreaStock level={userInfo?.level} nickname={userInfo?.nickname} />
        )}
        {selectedTab === "world" && <WorldStock />}
      </div>

      {selectedTab === "" && (
        <button className="back-button1" onClick={() => navigate("/ranking")}>
          뒤로가기
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
