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
    const index = Math.min(Math.floor(score / 7), investType.length - 1);
    setResult(investType[index]);
  }, [score]);

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

        <div className="result-container">
          <div className="result-text">
            <div>
              <strong>성향:</strong> {result.성향}
            </div>
            <div>
              <strong className="highlight">특징:</strong> {result.특징}
            </div>
            <div>
              <strong className="highlight">장점:</strong> {result.장점}
            </div>
            <div>
              <strong className="highlight">단점:</strong> {result.단점}
            </div>
            <div>
              <strong className="highlight">추천:</strong> {result.추천상품}
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
