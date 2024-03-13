import React from "react";
import quiz from "../../assets/backgrounds/quiz.png";
export default function QuizLayout() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img src={quiz} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 100,
        }}
      >
        여기 작성
      </div>
    </div>
  );
}
