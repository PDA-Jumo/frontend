import React, { useState } from "react";
import "./test.css";
import character1 from "../../assets/backgrounds/character1.png";

export default function TestLayout() {
  const [startTest, setStartTest] = useState(false);

  return (
    <div className="test-layout">
      <img src={character1} className="character-image" />
      <div className="test-content">
        <div className="test-title">투자 성향 테스트</div>
        <hr className="test-line" />
        <div className="test-intro">
          {!startTest && (
            <div className="intro-text">
              본인의 투자 성향을 알아볼 수 있는 간단한 테스트입니다.
              <br />
              문항은 총 7문항, 예상 소요시간은 3~5분입니다.
            </div>
          )}
          {!startTest && (
            <button
              className="start-test-button"
              onClick={() => setStartTest(true)}
            >
              테스트 하러 가기
            </button>
          )}
        </div>
        {startTest && (
          <div className="test-questions">
            여기에 오지선다 문항이 나타납니다.
          </div>
        )}
      </div>
    </div>
  );
}
