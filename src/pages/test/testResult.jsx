import React, { useEffect, useState } from "react";
import "./test.css";
import character1 from "../../assets/backgrounds/character1.png";
import { useNavigate, useLocation } from "react-router-dom";
import investType from "./investType.js"; // investType 불러오기

export default function TestResultLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score; // 전달받은 점수를 안전하게 접근
  const [result, setResult] = useState({}); // 투자성향 결과를 상태로 관리

  useEffect(() => {
    // 점수에 따른 투자성향 결정 로직
    const index = Math.min(Math.floor(score / 7), investType.length - 1); // 점수를 7점 단위로 나누고, 배열 범위를 초과하지 않도록 처리
    setResult(investType[index]); // 해당하는 투자성향 정보를 상태에 저장
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
