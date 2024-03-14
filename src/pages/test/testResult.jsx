import React, { useState } from "react";
import "./test.css";
import character1 from "../../assets/backgrounds/character1.png";

export default function TestResultLayout() {
  return (
    <div className="test-layout">
      <img src={character1} className="character-image" alt="Character" />
      <div className="test-content">
        <div className="test-title">투자 성향 테스트</div>
        <hr className="test-line" />

        <div className="test-intro">
          <div className="intro-text">테스트 종료</div>
        </div>
      </div>
    </div>
  );
}
