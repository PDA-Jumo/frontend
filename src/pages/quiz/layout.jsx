import React, { useState, useEffect } from "react";
import quizBackground from "../../assets/backgrounds/quiz.png";
import "./quiz.css";
import quizData from "./quizData";

export default function QuizLayout() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (!showQuiz) return;

    const randomIndex = Math.floor(Math.random() * quizData.length);
    setCurrentQuiz(quizData[randomIndex]);
    setIsCorrect(null);
    setSelectedOption("");
  }, [showQuiz]);

  const checkAnswer = (selected) => {
    if (isCorrect !== null) return;

    setSelectedOption(selected);
    if (selected === currentQuiz.answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleBack = () => {
    console.log("뒤로가기 버튼이 클릭되었습니다.");
    window.location.href = "http://localhost:3000";
  };

  return (
    <div
      className="quiz-layout"
      style={{ backgroundImage: `url(${quizBackground})` }}
    >
      {!showQuiz ? (
        <>
          <div className="welcome-text">뿅뿅 주식오락실</div>
          <div className="welcome-text-exp">
            똑똑한 대주주가 되기 위해 차근차근 문제를 풀어보자 !
          </div>
          <button className="quiz-button" onClick={() => setShowQuiz(true)}>
            문제 풀러 가기
          </button>
          <button className="quiz-button back-button" onClick={handleBack}>
            뒤로가기
          </button>
        </>
      ) : currentQuiz.question ? (
        <div>
          <div className="quiz-question">{currentQuiz.question}</div>
          <div
            className={`quiz-options-container ${
              currentQuiz.options.length === 4
                ? "grid-container"
                : currentQuiz.type === "OX"
                ? "flex-container"
                : ""
            }`}
          >
            {currentQuiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(option)}
                className={`quiz-button ${
                  selectedOption === option ? "quiz-button-selected" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {isCorrect !== null && (
            <div>
              <div className="quiz-result">
                {isCorrect
                  ? "정답입니다!"
                  : `틀렸습니다. 정답은: ${currentQuiz.answer}`}
                {!isCorrect && (
                  <div className="quiz-explanation">
                    {currentQuiz.explanation}
                  </div>
                )}
              </div>
              <button className="quiz-button back-button" onClick={handleBack}>
                뒤로가기
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
