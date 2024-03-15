import React from "react";
// 아래 이미지 경로는 예시입니다. 실제 프로젝트에 맞게 조정해주세요.
import rankingIcon from "/src/assets/main/ranking.png";
import tradeIcon from "/src/assets/main/trade.png";
import quizIcon from "/src/assets/main/quiz.png";
import messageIcon from "/src/assets/main/message.png";
import encyclopediaIcon from "/src/assets/main/encyclopedia.png";
import { useHistory } from "react-router-dom"; // react-router-dom을 사용하여 페이지 이동을 처리

function PortfolioPage() {
  let history = useHistory(); // useHistory 훅을 사용하여 페이지 이동

  // 페이지 이동 함수
  const navigateTo = (path) => {
    history.push(path);
  };

  return (
    <div className="portfolio-page">
      {/* 현금 보유액 표시 */}
      <div className="cash-display">현금: ₩100,000</div>

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

export default PortfolioPage;
