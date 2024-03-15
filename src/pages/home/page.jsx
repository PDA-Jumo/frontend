import React from "react";
// 아래 이미지 경로는 예시입니다. 실제 프로젝트에 맞게 조정해주세요.
import rankingIcon from "../../assets/main/ranking.png";
import tradeIcon from "../../assets/main/trade.png";
import quizIcon from "../../assets/main/quiz.png";
import messageIcon from "../../assets/main/message.png";
import encyclopediaIcon from "../../assets/main/encyclopedia.png";
import { useNavigate } from "react-router-dom"; // react-router-dom을 사용하여 페이지 이동을 처리
import { useSelector } from "react-redux";

function MainPage() {
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
      {/* 사용자 프로필 이미지 및 기본 정보 표시 */}
      <div className="user-info">
        <img
          src={user?.profile_img}
          alt="프로필 이미지"
          className="profile-img"
        />
        <div className="details">
          <div>닉네임: {user?.nickname}</div>
          <div>현금: ₩{user?.cash?.toLocaleString()}</div>
          <div>총 자산: ₩{user?.total_assets?.toLocaleString()}</div>
          <div>레벨: {user?.level}</div>
          <div>유형: {user?.type}</div>
        </div>
      </div>

      {/* 보유 종목 버튼 */}
      <button onClick={() => navigateTo("/holdings")}>보유종목</button>

      {/* 기능별 이동 버튼 */}
      <div className="navigation-buttons">
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

export default MainPage;
