import React from "react";
import "./test.css";
import character1 from "../../assets/backgrounds/character1.png";
import { useNavigate } from "react-router-dom";

export default function TestResultLayout() {
  const navigate = useNavigate();
  const handleBack = () => {
    console.log("홈으로 버튼이 클릭되었습니다.");
    navigate("/");
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
