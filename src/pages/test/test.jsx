import React, { useState } from "react";
import "./test.css";
import character1 from "../../assets/backgrounds/character1.png";
import testData from "./testData";

export default function TestLayout() {
  const [startTest, setStartTest] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 진행 상태를 계산하는 함수
  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / testData.length) * 100;
  };

  const handleAnswerClick = () => {
    if (currentQuestionIndex < testData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("테스트가 끝났습니다!");
      setStartTest(false);
      setCurrentQuestionIndex(0);
    }
  };

  const renderOptions = () => {
    const currentQuestion = testData[currentQuestionIndex];
    return (
      <div className="quiz-options">
        <div className="question-text">{currentQuestion.question}</div>
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            className="test-button"
            onClick={handleAnswerClick}
          >
            {answer}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="test-layout">
      <img src={character1} className="character-image" alt="Character" />
      <div className="test-content">
        <div className="test-title">투자 성향 테스트</div>
        <hr className="test-line" />
        {/* 진행 상태바를 추가 */}
        {startTest && (
          <div className="progress-bar-background">
            <div
              className="progress-bar-fill"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        )}
        <div className="test-intro">
          {!startTest && (
            <div className="intro-text">
              본인의 투자 성향을 알아볼 수 있는 간단한 테스트입니다.
              <br />
              문항은 총 7문항, 예상 소요시간은 3~5분입니다.
            </div>
          )}
          {!startTest && (
            <button
              className="start-test-button"
              onClick={() => setStartTest(true)}
            >
              테스트 하러 가기
            </button>
          )}
        </div>
        {startTest && <div className="test-questions">{renderOptions()}</div>}
      </div>
    </div>
  );
}
