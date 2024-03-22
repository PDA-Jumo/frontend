import React from "react";
import Book from "../../assets/backgrounds/Book.png";
import { useNavigate } from "react-router-dom";
import "./book.css"; // CSS 파일 임포트

export default function BookLayout() {
  const navigate = useNavigate();

  const handleBack = () => {
    console.log("뒤로가기 버튼이 클릭되었습니다.");
    navigate("/home");
  };

  return (
    <div className="BookLayout-container">
      <img
        src={Book}
        className="BookLayout-backgroundImage"
        alt="Book Background"
      />
      <div className="BookLayout-rectangle"></div>
      <button className="quiz-button back-button" onClick={handleBack}>
        뒤로가기
      </button>
    </div>
  );
}
