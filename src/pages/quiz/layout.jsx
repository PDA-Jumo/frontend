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
  const [bonus, setBonus] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const calBonus = () => {
    if (user.level <= 3) setBonus(1000);
    else if (user.level === 4) setBonus(5000);
    else if (user.level === 5) setBonus(10000);
    else setBonus(50000);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    calBonus();
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
            문제는 총 5문제!
            <br />
            <span style={{ WebkitTextStroke: "1.5px #ff70b7" }}>
              주식에 대한 지식
            </span>
            과 <span style={{ WebkitTextStroke: "1.2px #6899fe" }}>캐시</span>를
            함께 쌓을 수 있는 기회!
          </div>
          <div
            className="quiz-button"
            onClick={() => setShowQuiz(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? "GO!" : "도전하기"}
          </div>
          {/* <div className="back-button quiz-button" onClick={handleBack}>
            뒤로가기
          </div> */}
        </>
      ) : quizFinished ? (
        <div className="quiz-finished-message">
          <div style={{ marginBottom: "24px" }}>퀴즈가 끝났습니다!</div>
          <div>
            5문제 중{" "}
            <span
              style={{
                color: "black",
                marginInline: "4px",
                textShadow:
                  "-6px 0 white, 0 6px white, 6px 0 white, 0 -6px white",
              }}
            >
              {correctCount}문제 정답
            </span>
            으로,
            <br />총{" "}
            <span
              style={{
                color: "black",
                marginInline: "4px",
                textShadow:
                  "-6px 0 white, 0 6px white, 6px 0 white, 0 -6px white",
              }}
            >
              {correctCount * bonus} 캐시
            </span>
            를 벌었습니다!
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
        <>
          {isCorrect !== null && (
            <div
              style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                className={`quiz-result ${
                  isCorrect ? "correct-answer" : "wrong-answer"
                }`}
                style={{ fontSize: "70px", WebkitTextStroke: "2.5px white" }}
              >
                {isCorrect
                  ? "정답입니다!"
                  : `땡! 정답은 "${quizList[currentQuizIndex].answer}" 입니다.`}
                {!isCorrect && (
                  <div
                    className="quiz-explanation"
                    style={{ fontSize: "40px" }}
                  >
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

          <div className="current-quiz-info">Q{currentQuizIndex + 1}.</div>

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

          {/* {isCorrect !== null && (
            <div>
              <div
                className={`quiz-result ${
                  isCorrect ? "correct-answer" : "wrong-answer"
                }`}
              >
                {isCorrect
                  ? "정답입니다!"
                  : `틀렸습니다. 정답은 ${quizList[currentQuizIndex].answer} 입니다.`}
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
          )} */}
        </>
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
