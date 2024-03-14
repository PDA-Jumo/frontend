import React from "react";
import "./test.css";
import character1 from "../../assets/backgrounds/character1.png";

export default function TestResultLayout() {
  // '홈으로' 버튼 클릭 시 동작하는 함수
  const handleBack = () => {
    console.log("홈으로 버튼이 클릭되었습니다.");
    window.location.href = "http://localhost:3000"; //TODO: 이 부분을 react-router의 navigate를 사용하는 것으로 변경하는 것을 고려해볼 수 있음
  };

  return (
    <div className="test-layout">
      <img src={character1} className="character-image" alt="Character" />
      <div className="test-content">
        <div className="test-title">투자 성향 테스트</div>
        <hr className="test-line" />

        <div className="test-intro">
          <div className="intro-text">테스트 종료</div>
        </div>
        {/* '홈으로' 버튼 추가 */}
        <button className="home-button" onClick={handleBack}>
          홈으로
        </button>
      </div>
    </div>
  );
}
