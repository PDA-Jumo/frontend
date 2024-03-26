import React from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

// icons
import up from "../../assets/main/up.png";

export default function LevelUpModal(props) {
  const level = useSelector((state) => state.user.user.level);
  const contents = [
    {
      levelName: "주얼딩",
      reward: (
        <>
          보상으로{" "}
          <span style={{ color: " #FF5656" }}>[ 투자 지원금 100,000원 ]</span>을
          드립니다.
        </>
      ),
      available: (
        <>
          이번 레벨부터는{" "}
          <span style={{ color: " #FF5656" }}>[ 한 종목 주식 거래 ]</span>가
          가능합니다.
        </>
      ),
    },
    {
      levelName: "주린이",
      reward: (
        <>
          보상으로{" "}
          <span style={{ color: " #FF5656" }}>[ 코스피 200 중 한 종목 ]</span>을
          드립니다.
        </>
      ),
      available: (
        <>
          이번 레벨부터는{" "}
          <span style={{ color: " #FF5656" }}>
            [ 실시간 인기테마, 뉴스 조회 ]
          </span>
          가 가능합니다.
        </>
      ),
    },
    {
      levelName: "주초딩",
      reward: (
        <>
          보상으로{" "}
          <span style={{ color: " #FF5656" }}>[ 투자지원금 10만원 ]</span>을
          드립니다.
        </>
      ),
      available: (
        <>
          <span style={{ color: " #FF5656" }}>국내 주식 거래 가능</span>{" "}
          레벨까지 한 레벨 남았습니다!
        </>
      ),
    },
    {
      levelName: "주중딩",
      reward: (
        <>
          <span style={{ color: " #FF5656" }}>
            [ 퀴즈 보상 5000원 업그레이드, UI 강화 ]
          </span>
          보상을 드립니다.
        </>
      ),
      available: (
        <>
          이번 레벨부터는{" "}
          <span style={{ color: " #FF5656" }}>
            [ 국내 주식 / ETF 거래와 랭킹 조회 ]
          </span>
          가 가능합니다.
        </>
      ),
    },
    {
      levelName: "주고딩",
      reward: (
        <>
          <span style={{ color: " #FF5656" }}>
            [ 투자 성향 진단 기회와 퀴즈 보상 10000원 업그레이드 ]
          </span>
          보상을 드립니다.
        </>
      ),

      available: (
        <>
          이번 레벨부터는{" "}
          <span style={{ color: " #FF5656" }}>
            [ 매도매수 탭 주식 추천 조회 ]
          </span>
          가가능합니다.
        </>
      ),
    },
    {
      levelName: "주대딩",
      reward: (
        <>
          <span style={{ color: " #FF5656" }}>
            [ 퀴즈 보상 50,000원 업그레이드, UI 강화, 해외 주식 랜덤 1주 ]
          </span>{" "}
          보상을 드립니다.
        </>
      ),
      available: (
        <>
          이번 레벨부터는{" "}
          <span style={{ color: " #FF5656" }}>[ 해외 주식 거래 ]</span>
          가가능합니다.
        </>
      ),
    },
    {
      levelName: "주졸부",
      reward: (
        <>
          보상으로{" "}
          <span style={{ color: " #FF5656" }}>
            [ UI 강화, 커뮤니티 입장권 ]
          </span>
          을 드립니다. `
        </>
      ),
      available: (
        <>
          <span style={{ color: " #FF5656" }}>마지막 레벨</span>까지 한 단계
          남았습니다!
        </>
      ),
    },
    {
      levelName: "주대주주",
      reward: (
        <>
          보상으로 <span style={{ color: " #FF5656" }}>[ UI 강화 ]</span>를
          드립니다.
        </>
      ),
      available: (
        <>
          <span style={{ color: " #FF5656" }}>마지막 레벨</span>에 도달했습니다.
          축하드립니다!
        </>
      ),
    },
  ];
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
            <span style={{ color: "#F3322C" }}>
              {contents[level].levelName}
            </span>
            으로 레벨업 하셨습니다!
          </p>
          <p>{contents[level].reward}</p>
          <p>{contents[level].available}</p>
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
