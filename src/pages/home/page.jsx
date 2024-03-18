import React from "react";
// 아래 이미지 경로는 예시입니다. 실제 프로젝트에 맞게 조정해주세요.
import rankingIcon from "../../assets/main/ranking.png";
import tradeIcon from "../../assets/main/trade.png";
import quizIcon from "../../assets/main/quiz.png";
import messageIcon from "../../assets/main/message.png";
import encyclopediaIcon from "../../assets/main/encyclopedia.png";
import dollarIcon from "../../assets/main/dollar.png";
import stockIcon from "../../assets/main/stock.png";
import clickmeIcon from "../../assets/main/clickme.png";
import tipsIcon from "../../assets/main/tips.png";
import { useNavigate } from "react-router-dom"; // react-router-dom을 사용하여 페이지 이동을 처리
import { useSelector } from "react-redux";
import "./page.css";

function HomePage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user) || {};
  console.log(user);

  // useSelector 훅을 사용하여 Redux store에서 사용자 정보를 가져옵니다.
  // const user = useSelector((state) => state.userReducer.user);

  // 페이지 이동 함수
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="portfolio-page">
      <div className="user-info">
        <div className="info-overlay">
          <div className="basic-info white-rounded-box">
            <div className="profile-and-info">
              <img
                src={user?.profile_img}
                alt="프로필 이미지"
                className="profile-img"
              />
              <div className="info-text">
                <div className="level-type">
                  <span>레벨: {user?.level}</span>
                  <span>유형: {user?.type}</span>
                </div>
                <div>닉네임: {user?.nickname}</div>
              </div>
            </div>
          </div>
          <div className="white-rounded-box-row">
            <img
              src={dollarIcon}
              alt="달러 아이콘"
              style={{ width: "24px", height: "24px", marginRight: "10px" }}
            />
            <div>{user?.cash?.toLocaleString()}</div>
          </div>
          <div
            className="white-rounded-box-row"
            onClick={() => navigateTo("/holdings")}
          >
            <img
              src={stockIcon}
              alt="보유 종목"
              style={{ width: "24px", height: "24px", marginRight: "10px" }}
            />
            <span>보유종목</span>
          </div>
        </div>
      </div>
      <div className="navigation-buttons vertical">
        <img
          src={rankingIcon}
          alt="랭킹"
          onClick={() => navigateTo("/ranking")}
        />
        <img
          src={tradeIcon}
          alt="매수매도"
          onClick={() => navigateTo("/trade")}
        />
        <img src={quizIcon} alt="퀴즈" onClick={() => navigateTo("/quiz")} />
        <img
          src={messageIcon}
          alt="메시지"
          onClick={() => navigateTo("/messages")}
        />
        <img
          src={encyclopediaIcon}
          alt="주식도감"
          onClick={() => navigateTo("/encyclopedia")}
        />
      </div>
    </div>
  );
}

export default HomePage;
