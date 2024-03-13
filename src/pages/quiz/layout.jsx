import React, { useState, useEffect } from "react";
import quizBackground from "../../assets/backgrounds/quiz.png";
import "./quiz.css";
import quizData from "./quizData";

export default function QuizLayout() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  // 배열을 랜덤으로 섞는 함수
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // ES6 구조 분해 할당을 사용한 요소 교환
    }
    return array;
  };

  useEffect(() => {
    if (!showQuiz) return;

    const randomIndex = Math.floor(Math.random() * quizData.length);
    const quiz = quizData[randomIndex];
    const shuffledOptions = shuffleArray([...quiz.options]); // options 배열 복사본을 섞음
    const shuffledQuiz = { ...quiz, options: shuffledOptions }; // 섞은 options을 포함한 새로운 quiz 객체 생성

    setCurrentQuiz(shuffledQuiz);
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
