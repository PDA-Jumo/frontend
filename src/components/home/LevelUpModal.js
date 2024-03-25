import React from "react";
import styled, { keyframes } from "styled-components";

// icons
import up from "../../assets/main/up.png";

export default function LevelUpModal(props) {
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        width: window.innerWidth,
        height: window.innerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: "#FFDE6B",
          width: "80%",
          height: "80%",
          borderRadius: "100px",
          boxSizing: "border-box",
          padding: "64px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "30%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            fontSize: "56px",
            textShadow: "-6px 0 white, 0 6px white, 6px 0 white, 0 -6px white",
          }}
        >
          <FloatingIcon>
            <img src={up} style={{ marginRight: "24px", width: "150px" }} />
          </FloatingIcon>
          <h1>
            Level <span style={{ color: "red" }}>UP</span>
          </h1>
          <FloatingIcon>
            <img src={up} style={{ marginLeft: "24px", width: "150px" }} />
          </FloatingIcon>
        </div>
        <div style={{ width: "100%", fontSize: "32px" }}>
          <p>
            <span style={{ color: "#F3322C" }}>[ 주얼딩 ]</span>으로 레벨업
            하셨습니다!
          </p>
          <p>
            보상으로{" "}
            <span style={{ color: " #FF5656" }}>[ 투자 지원금 100,000원 ]</span>
            을 드립니다.
          </p>
          <p>
            이번 레벨부터는{" "}
            <span style={{ color: " #FF5656" }}>[ 주식 1종목 거래 ]</span>가
            가능합니다.
          </p>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "80px",
              paddingInline: "32px",
              borderRadius: "24px",
              paddingBlock: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "0 4px 10px 0 rgba(0,0,0,0.3)",
              cursor: "pointer",
            }}
            onClick={() => props.setIsLevelUp(false)}
          >
            확인
          </div>
        </div>
      </div>
    </div>
  );
}

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const FloatingIcon = styled.div`
  animation: ${floatAnimation} 2s ease-in-out infinite; /* 애니메이션 적용 */
`;
