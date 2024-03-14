import React from "react";
import "./test.css";
import character1 from "../../assets/backgrounds/character1.png";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가

export default function TestResultLayout() {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 사용
  const score = location.state?.score; // 전달받은 점수를 안전하게 접근

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
          <div className="intro-text">
            테스트 종료 당신의 점수는 {score}점 입니다.
          </div>
        </div>
        <button className="home-button" onClick={handleBack}>
          홈으로
        </button>
      </div>
    </div>
  );
}
