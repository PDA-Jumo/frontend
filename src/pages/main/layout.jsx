import React from "react";
import startPage from "../../assets/backgrounds/startPage.png";
import hat from "../../assets/backgrounds/hat.png";

export default function MainLayout() {
  // 버튼 클릭 시 리다이렉트를 처리하는 함수
  const redirectToQuiz = () => {
    window.location.href = "http://localhost:3000/quiz";
  };
  const redirectToTest = () => {
    window.location.href = "http://localhost:3000/test";
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

      <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <button
          onClick={redirectToQuiz}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          퀴즈 시작하기
        </button>

        <button
          onClick={redirectToTest}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          테스트 시작하기
        </button>
      </div>
    </div>
  );
}
