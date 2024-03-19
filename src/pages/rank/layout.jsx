import React from "react";
import Rank from "../../assets/backgrounds/rank.png";
import character1 from "../../assets/backgrounds/character1.png";
import "./rank.css";
import { useEffect } from "react";

export default function RankLayout() {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="background-style">
      <img src={Rank} className="background-image" alt="Rank Background" />
      <div className="ranking-header-container">
        <RankingHeader />
      </div>
      <div className="content-position">
        <RankingList />
      </div>
    </div>
  );
}
function RankingHeader() {
  return <div className="ranking-header">랭킹</div>;
}

function RankingList() {
  return (
    <>
      <RankingButton rank="사용자 A" />
      <RankingButton rank="사용자 B" />
      <RankingButton rank="사용자 C" />
      <RankingButton rank="사용자 D" />
    </>
  );
}

// 랭킹 버튼 컴포넌트
function RankingButton({ rank }) {
  return (
    <button className="ranking-button" onClick={() => {}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <img
          src={character1}
          alt="Rank Icon"
          style={{
            paddingLeft: "36px",
            width: "48px",
            height: "48px",
            marginRight: "36px",
          }}
        />
        {rank}
      </div>
    </button>
  );
}
