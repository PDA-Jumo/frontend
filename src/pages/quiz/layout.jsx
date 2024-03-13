import React, { useState, useEffect } from "react";
import quizBackground from "../../assets/backgrounds/quiz.png";
import "./quiz.css"; // 스타일시트 임포트
import quizData from "./quizData";

export default function QuizLayout() {
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    // 퀴즈 데이터에서 랜덤한 문제를 선택합니다.
    const randomIndex = Math.floor(Math.random() * quizData.length);
    setCurrentQuiz(quizData[randomIndex]);
    setIsCorrect(null);
    setSelectedOption("");
  }, []);

  const checkAnswer = (selected) => {
    setSelectedOption(selected);
    if (selected === currentQuiz.answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div
      className="quiz-layout"
      style={{ backgroundImage: `url(${quizBackground})` }}
    >
      {currentQuiz.question && (
        <div>
          <div className="quiz-question">{currentQuiz.question}</div>

          <div
            className={`quiz-options-container ${
              currentQuiz.type === "OX" ? "flex-container" : ""
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
            <div className="quiz-result">
              {isCorrect ? "정답입니다!" : "틀렸습니다. 다시 시도해보세요."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
