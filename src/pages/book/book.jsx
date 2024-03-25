import React, { useState } from "react";
import Book from "../../assets/backgrounds/Book.png";
import { useNavigate } from "react-router-dom";
import "./book.css";
import { data } from "./bookdata.js";
import { useSelector } from "react-redux";

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");

  const user = useSelector((state) => state.user.user) || {};

  console.log(user?.level);

  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
    } else {
      navigate("/home");
    }
  };

  const handleLevelClick = (level) => {
    const filteredData = data.filter((item) => item.level === level);
    setSelectedLevelData(filteredData);
    setSelectedItem(null);
    setSelectedLevel(level);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="BookLayout-container">
      <img
        src={Book}
        className="BookLayout-backgroundImage"
        alt="Book Background"
      />
      {!selectedItem && (
        <div className="BookLayout-content">
          <div className="BookLayout-rectangle">
            <div className="BookLayout-text">레벨을 선택해보세요!</div>
            <ul className="BookLayout-list">
              {levels.map((level, index) => {
                const levelNum = parseInt(level.match(/\d+/)[0]);

                console.log(levelNum);
                // const isDisabled = 100 < levelNum; 테스트 코드임. 실제로는 아래줄이 맞는코드.
                const isDisabled = user?.level < levelNum;
                return (
                  <li
                    key={index}
                    className={isDisabled ? "BookLayout-listItem-disabled" : ""}
                    onClick={() => !isDisabled && handleLevelClick(level)}
                  >
                    {level}
                    {selectedLevel === level && " →"}
                  </li>
                );
              })}
            </ul>
          </div>
          {selectedLevelData.length > 0 && (
            <div className="BookLayout-grid">
              {selectedLevelData.map((item, index) => (
                <div
                  key={index}
                  className="BookLayout-gridItem"
                  onClick={() => handleItemClick(item)}
                >
                  <div>{item.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {selectedItem && (
        <div className="BookLayout-content">
          <div className="BookLayout-detail">
            <h1>
              {selectedLevel} → {selectedItem.title}
            </h1>
            <div className="BookLayout-itemWrapper">
              <h1 className="BookLayout-itemTitle">{selectedItem.title}</h1>
              <p className="BookLayout-itemBody">{selectedItem.body}</p>
            </div>
          </div>
        </div>
      )}

      <button className="room-back-button" onClick={handleBack}>
        뒤로가기
      </button>
    </div>
  );
}
