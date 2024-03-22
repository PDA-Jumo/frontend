import React, { useState } from "react";
import Book from "../../assets/backgrounds/Book.png";
import { useNavigate } from "react-router-dom";
import "./book.css";
import { data } from "./bookdata.js";

const levels = [
  "Lv.0 주탄생",
  "Lv.1 주얼딩",
  "Lv.2 주린이",
  "Lv.3 주초딩",
  "Lv.4 주중딩",
  "Lv.5 주고딩",
  "Lv.6 주대딩",
  "Lv.7 주졸부",
  "Lv.8 주대주주",
];

export default function BookLayout() {
  const navigate = useNavigate();
  const [selectedLevelData, setSelectedLevelData] = useState([]);

  const handleBack = () => {
    console.log("뒤로가기 버튼이 클릭되었습니다.");
    navigate("/home");
  };

  const handleLevelClick = (level) => {
    const filteredData = data.filter((item) => item.level === level);
    setSelectedLevelData(filteredData);
  };

  return (
    <div className="BookLayout-container">
      <img
        src={Book}
        className="BookLayout-backgroundImage"
        alt="Book Background"
      />
      <div className="BookLayout-content">
        <div className="BookLayout-rectangle">
          <div className="BookLayout-text">레벨을 선택해보세요!</div>
          <ul className="BookLayout-list">
            {levels.map((level, index) => (
              <li key={index} onClick={() => handleLevelClick(level)}>
                {level}
              </li>
            ))}
          </ul>
        </div>
        {selectedLevelData.length > 0 && (
          <div className="BookLayout-grid">
            {selectedLevelData.map((item, index) => (
              <div key={index} className="BookLayout-gridItem">
                <div>{item.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="quiz-button back-button" onClick={handleBack}>
        뒤로가기
      </button>
    </div>
  );
}
