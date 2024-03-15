//TODO 여기부터 유저의 정보를 받아오고 있어야 함(persist를 통해 연동되는 로그인 기능)

import React, { useState, useEffect } from "react";
import quizBackground from "../../assets/backgrounds/quiz.png";
import "./quiz.css";
import quizData from "./quizData";
import { useNavigate } from "react-router-dom";

export default function QuizLayout() {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (!showQuiz) return;

    const randomIndex = Math.floor(Math.random() * quizData.length);
    const quiz = quizData[randomIndex];

    //TODO if userlevel<minLevel reshuffle

    const shuffledOptions =
      quiz.type === "OX" ? [...quiz.options] : shuffleArray([...quiz.options]);

    const shuffledQuiz = { ...quiz, options: shuffledOptions };

    setCurrentQuiz(shuffledQuiz);
    setIsCorrect(null);
    setSelectedOption("");
  }, [showQuiz]);

  const checkAnswer = (selected) => {
    //TODO 퀴즈를 맞췄을때 유저한테 돈을 지급하도록 UPDATE되어야 함
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
    navigate("/");
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
                className={`quiz-button ${option === "X" ? "x-stroke" : ""} ${
                  selectedOption
                    ? selectedOption === option
                      ? "quiz-button-selected"
                      : currentQuiz.type === "OX"
                      ? "unselected-text-stroke"
                      : "unselected"
                    : ""
                } ${currentQuiz.type === "OX" ? "ox-quiz-button" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
          {isCorrect !== null && (
            <div>
              <div
                className={`quiz-result ${
                  isCorrect ? "correct-answer" : "wrong-answer"
                }`}
              >
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
