import React from "react";
import Rank from "../../assets/backgrounds/rank.png";
import character1 from "../../assets/backgrounds/startPage.png";
import rankStar from "../../assets/rankStar.png"; // 이미지 import 확인
import "./rank.css";

export default function RankLayout() {
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
  return (
    <div className="ranking-header">
      <img src={rankStar} alt="Rank Star" className="ranking-star-img" />
      랭킹
    </div>
  );
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

function RankingButton({ rank }) {
  return (
    <button className="ranking-button" onClick={() => {}}>
      <div className="ranking-icon-container">
        <img src={character1} alt="Rank Icon" className="ranking-icon" />
        {rank}
      </div>
    </button>
  );
}
