import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { updateFinancialsAction } from "../../store/reducers/user";
import { upCash } from "../../lib/apis/home";
import "./page.css";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useSelector 훅을 사용하여 Redux store에서 사용자 정보를 가져옵니다.
  const user = useSelector((state) => state.user.user) || {};
  console.log(user);

  // 페이지 이동 함수
  const navigateTo = (path) => {
    navigate(path);
  };

  const upCashByWork = async (user_id, cash) => {
    try {
      // 퀴즈 성공시 DB 업데이트
      const resp = await upCash({ user_id, cash });
      const data = resp.data;

      // DB 업데이트 성공시 Redux Store State 업데이트
      if (data === "성공") {
        dispatch(updateFinancialsAction(cash));
      }
    } catch (error) {
      console.error(error);
    }
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
                  <span> {user?.type}</span>
                </div>
                <div>닉네임: {user?.nickname}</div>
              </div>
            </div>
          </div>
          <div className="white-rounded-box-row">
            <img
              src={dollarIcon}
              alt="달러 아이콘"
              style={{
                width: "24px",
                height: "24px",
                marginRight: "10px",
                marginTop: "6px",
              }}
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
              style={{
                width: "24px",
                height: "24px",
                marginRight: "10px",
                marginTop: "6px",
              }}
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
      <div className="clickme">
        <img
          src={clickmeIcon}
          alt="노가다"
          onClick={() => upCashByWork(user.user_id, 1000)}
        />
      </div>
    </div>
  );
}

export default HomePage;
