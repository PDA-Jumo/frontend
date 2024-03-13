import React from "react";
import startPage from "../../assets/backgrounds/startPage.png";
import hat from "../../assets/backgrounds/hat.png";

export default function MainLayout() {
  // 버튼 클릭 시 리다이렉트를 처리하는 함수
  const redirectToQuiz = () => {
    window.location.href = "http://localhost:3000/quiz";
  };

  return (
    <div className="background-style">
      <img
        src={startPage}
        alt="시작 페이지 배경"
        style={{ width: "100%", height: "100%" }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img src={hat} alt="모자 이미지" style={{ width: "900px" }} />
      </div>
      {/* 아직 main페이지 안나와서 테스트용으로 만들어뒀어요 충돌나면 허상진 불러주세요 */}
      <button
        onClick={redirectToQuiz}
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        퀴즈 시작하기
      </button>
    </div>
  );
}
