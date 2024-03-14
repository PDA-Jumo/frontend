import React, { useEffect, useState } from "react";
import "./test.css";
import character1 from "../../assets/backgrounds/character1.png";
import { useNavigate, useLocation } from "react-router-dom";
import investType from "./investType.js";

export default function TestResultLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score;
  const [result, setResult] = useState({});

  useEffect(() => {
    // 점수에 따른 투자성향 결정 로직
    const index = Math.min(Math.floor(score / 7), investType.length - 1);
    setResult(investType[index]);
  }, [score]);

  const handleBack = () => {
    console.log("홈으로 버튼이 클릭되었습니다.");
    navigate("/");
  };

  //TODO 이때 사용자의 투자성향을 user DB에 넣어줄 수 있어야 함. 칭호는 나중에 개발?

  return (
    <div className="test-layout">
      <img src={character1} className="character-image" alt="Character" />
      <div className="test-content">
        <div className="test-title">투자 성향 테스트</div>
        <hr className="test-line" />

        <div className="test-intro">
          <div className="result-text">
            <div>
              <strong>성향:</strong> {result.성향}
            </div>
            <div>
              <strong>특징:</strong> {result.특징}
            </div>
            <div>
              <strong>장점:</strong> {result.장점}
            </div>
            <div>
              <strong>단점:</strong> {result.단점}
            </div>
            <div>
              <strong>추천상품:</strong> {result.추천상품}
            </div>
          </div>
        </div>
        <button className="home-button" onClick={handleBack}>
          홈으로
        </button>
      </div>
    </div>
  );
}
