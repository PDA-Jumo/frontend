import React, { useState } from "react";
import "./test.css";
import character1 from "../../assets/backgrounds/character1.png";
import testData from "./testData";
import { useNavigate } from "react-router-dom";

//TODO 여기부터 user의 정보를 받아올 수 있어야 함 (quiz 와 동일)

export default function TestLayout() {
  const navigate = useNavigate();
  const [startTest, setStartTest] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleBack = () => {
    console.log("뒤로가기 버튼이 클릭되었습니다.");
    navigate("/");
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / testData.length) * 100;
  };

  const handleAnswerClick = (point) => {
    const newScore = score + point;
    if (currentQuestionIndex < testData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setScore(newScore);
    } else {
      alert(`테스트가 끝났습니다! 결과창으로 이동합니다.`);
      setStartTest(false);
      setCurrentQuestionIndex(0);
      navigate("/test/result", { state: { score: newScore } });
      setScore(0);
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
            onClick={() => handleAnswerClick(answer.point)}
          >
            {answer.text}
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
              본인의 투자 성향을 알아볼 수 있는 간단한 테스트입니다. <br />
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
      {!startTest && (
        <button className="home-button" onClick={handleBack}>
          홈으로
        </button>
      )}
    </div>
  );
}
