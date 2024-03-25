//TODO 여기부터 유저의 정보를 받아오고 있어야 함(persist를 통해 연동되는 로그인 기능)

import React, { useCallback, useState, useEffect } from "react";
import quizBackground from "../../assets/backgrounds/quiz.png";
import "./quiz.css";
import quizData from "./quizData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { quizSuccess } from "../../lib/apis/quiz";
import { updateFinancialsAction } from "../../store/reducers/user";
import { useDispatch } from "react-redux";

export default function QuizLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) || {};
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
    if (!showQuiz || isCorrect !== null) return; // isCorrect가 null이 아니면, 즉 정답을 맞추었거나 틀렸으면 새로운 문제를 불러오지 않습니다.

    const userLevel = parseInt(user.level, 10);

    const suitableQuizzes = quizData.filter((quiz) => {
      const quizLevel = parseInt(quiz.level, 10);
      return userLevel >= quizLevel;
    });

    if (suitableQuizzes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * suitableQuizzes.length);
    const quiz = suitableQuizzes[randomIndex];

    const shuffledOptions =
      quiz.type === "OX" ? [...quiz.options] : shuffleArray([...quiz.options]);

    const shuffledQuiz = { ...quiz, options: shuffledOptions };
    setCurrentQuiz(shuffledQuiz);
    setIsCorrect(null);
    setSelectedOption("");
  }, [showQuiz, user.level, quizData, isCorrect]);

  const upCash = useCallback(async (user_id, level) => {
    try {
      const resp = await quizSuccess({ user_id, level });
      const { result, value } = resp.data;

      if (result === "성공") {
        dispatch(updateFinancialsAction(value));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const checkAnswer = async (selected) => {
    if (isCorrect !== null) return;

    setSelectedOption(selected);
    if (selected === currentQuiz.answer) {
      setIsCorrect(true);

      await upCash(user.user_id, user.level);
    } else {
      setIsCorrect(false);
    }
  };

  const handleBack = () => {
    console.log("뒤로가기 버튼이 클릭되었습니다.");
    navigate("/home");
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
