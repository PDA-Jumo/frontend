import React, { useCallback, useState, useEffect } from "react";
import quizBackground from "../../assets/backgrounds/quiz.png";
import "./quiz.css";
import quizData from "./quizData";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { quizSuccess } from "../../lib/apis/quiz";
import { updateFinancialsAction } from "../../store/reducers/user";

export default function QuizLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) || {};
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizList, setQuizList] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (!showQuiz) return;

    const userLevel = parseInt(user.level, 10);

    const suitableQuizzes = quizData.filter((quiz) => {
      const quizLevel = parseInt(quiz.level, 10);
      return userLevel >= quizLevel;
    });
    const shuffledQuizzes = shuffleArray(suitableQuizzes);

    setQuizList(shuffledQuizzes.slice(0, 5));
    setCurrentQuizIndex(0);
    setIsCorrect(null);
    setSelectedOption("");
    setCorrectCount(0);
  }, [showQuiz, user.level]);

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
    if (selected === quizList[currentQuizIndex].answer) {
      setIsCorrect(true);
      setCorrectCount(correctCount + 1);

      await upCash(user.user_id, user.level);
    } else {
      setIsCorrect(false);
    }
  };
  const handleNextQuestion = () => {
    if (currentQuizIndex < quizList.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setIsCorrect(null);
      setSelectedOption("");
    } else {
      setQuizFinished(true);
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
      {!showQuiz && !quizFinished ? (
        <>
          <div className="welcome-text">뿅뿅 주식오락실</div>
          <div className="welcome-text-exp">
            똑똑한 대주주가 되기 위해 차근차근 문제를 풀어보자!
          </div>
          <button className="quiz-button" onClick={() => setShowQuiz(true)}>
            문제 풀러 가기
          </button>
          <button className="quiz-button back-button" onClick={handleBack}>
            뒤로가기
          </button>
        </>
      ) : quizFinished ? (
        <div className="quiz-finished-message">
          <div style={{ marginBottom: "24px" }}>퀴즈가 끝났습니다!</div>
          <div>
            맞은 개수: {correctCount}, 틀린 개수: {5 - correctCount}
          </div>
          <div className="quiz-button-container">
            <button
              className="quiz-end-button"
              onClick={() => {
                setShowQuiz(false);
                setQuizFinished(false);
                navigate("/home");
              }}
            >
              홈으로
            </button>
          </div>
        </div>
      ) : quizList.length > 0 && currentQuizIndex < quizList.length ? (
        <div>
          {isCorrect === null && (
            <div className="current-quiz-info">
              문제 {currentQuizIndex + 1} / {quizList.length}
            </div>
          )}
          <div className="quiz-question">
            {quizList[currentQuizIndex].question}
          </div>
          <div
            className={`quiz-options-container ${
              quizList[currentQuizIndex].options.length === 4
                ? "grid-container"
                : quizList[currentQuizIndex].type === "OX"
                ? "flex-container"
                : ""
            }`}
          >
            {quizList[currentQuizIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(option)}
                className={`quiz-button ${option === "X" ? "x-stroke" : ""} ${
                  selectedOption
                    ? selectedOption === option
                      ? "selected-option-animation"
                      : "unselected-option-animation"
                    : ""
                } ${
                  quizList[currentQuizIndex].type === "OX"
                    ? "ox-quiz-button"
                    : ""
                }`}
                style={
                  quizList[currentQuizIndex].type === "OX" &&
                  selectedOption &&
                  selectedOption !== option
                    ? {
                        border: "transparent",
                        WebkitTextStroke: "3px gray",
                      }
                    : {}
                }
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
                  : `틀렸습니다. 정답은: ${quizList[currentQuizIndex].answer}`}
                {!isCorrect && (
                  <div className="quiz-explanation">
                    {quizList[currentQuizIndex].explanation}
                  </div>
                )}
              </div>
              <div className="center-button-container">
                <button
                  className="quiz-button next-question-button"
                  onClick={handleNextQuestion}
                >
                  다음 문제로
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button className="quiz-button back-button" onClick={handleBack}>
            뒤로가기
          </button>
        </div>
      )}
    </div>
  );
}
