//TODO 여기부터 유저의 정보를 받아오고 있어야 함(persist를 통해 연동되는 로그인 기능)

import React, { useCallback, useState, useEffect } from "react";
import quizBackground from "../../assets/backgrounds/quiz.png";
import "./quiz.css";
import quizData from "./quizData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { quizSuccess } from "../../lib/apis/quiz";

export default function QuizLayout() {
  const navigate = useNavigate();
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
    if (!showQuiz) return;
    // 사용자의 레벨을 숫자로 변환합니다.
    const userLevel = parseInt(user.level, 10);
    // 사용자의 레벨보다 크거나 같은 문제들만 필터링합니다.
    const suitableQuizzes = quizData.filter((quiz) => {
      // 문제의 레벨을 숫자로 변환합니다.
      const quizLevel = parseInt(quiz.level, 10);
      return userLevel >= quizLevel;
    });
    // 적합한 문제가 없다면 함수를 종료합니다.
    if (suitableQuizzes.length === 0) return;
    // 적합한 문제들 중에서 랜덤하게 하나를 선택합니다.
    const randomIndex = Math.floor(Math.random() * suitableQuizzes.length);
    const quiz = suitableQuizzes[randomIndex];
    // OX 퀴즈인 경우 옵션을 그대로 사용하고, 아닌 경우 옵션을 섞습니다.
    const shuffledOptions =
      quiz.type === "OX" ? [...quiz.options] : shuffleArray([...quiz.options]);
    // 선택된 문제와 섞인 옵션을 현재 퀴즈로 설정합니다.
    const shuffledQuiz = { ...quiz, options: shuffledOptions };
    setCurrentQuiz(shuffledQuiz);
    setIsCorrect(null);
    setSelectedOption("");
  }, [showQuiz, user.level, quizData]);

  const upCash = useCallback(
    async (user_id, level) => {
      // async 키워드를 추가하여 비동기 함수임을 명시합니다.
      try {
        const resp = await quizSuccess({ user_id, level }); // await을 사용하여 비동기 로그인 함수의 완료를 기다립니다.
      } catch (error) {
        console.error(error); // 에러 처리
        // 필요하다면 에러에 대한 추가적인 처리를 여기에 작성할 수 있습니다.
      }
    },
    [] // 의존성 배열에 포함된 항목들
  );

  const checkAnswer = async (selected) => {
    //TODO 퀴즈를 맞췄을때 유저한테 돈을 지급하도록 UPDATE되어야 함
    if (isCorrect !== null) return;

    setSelectedOption(selected);
    if (selected === currentQuiz.answer) {
      setIsCorrect(true);

      // 이 안에 돈주는로직
      await upCash(user.user_id, user.level);
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
