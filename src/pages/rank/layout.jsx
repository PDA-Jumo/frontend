import React, { useState, useEffect } from "react";
import Rank from "../../assets/backgrounds/rank.png";
import rankStar from "../../assets/rankStar.png";
import rankCrown from "../../assets/rankCrown.png";
import rankBluedia from "../../assets/rankBluedia.png";
import rankReddia from "../../assets/rankReddia.png";
import rankHeart from "../../assets/rankHeart.png";
import "./rank.css";

export default function RankLayout() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    )
      return;
    loadMoreUsers();
  };

  useEffect(() => {
    loadMoreUsers();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMoreUsers = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newUsers = Array.from(
        { length: 20 },
        (_, index) => `사용자 ${index + users.length + 1}`
      );
      setUsers((prev) => [...prev, ...newUsers]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="background-style">
      <img src={Rank} className="background-image" alt="Rank Background" />
      <div className="ranking-header-container">
        <RankingHeader />
      </div>
      <div className="content-position">
        <RankingList users={users} />
        <MyRankingButton /> {/* 이 자리에 무조건 내 랭킹이 들어가는거임 ㅇㅇ */}
      </div>
      <button className="back-button" onClick={() => window.history.back()}>
        뒤로 가기
      </button>
      {isLoading && <p>로딩 중...</p>}
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

function RankingList({ users }) {
  return (
    <>
      {users.map((user, index) => (
        <RankingButton key={index} rank={user} index={index} />
      ))}
    </>
  );
}

function RankingButton({ rank, index }) {
  const getRankImage = (index) => {
    switch (index) {
      case 0:
        return rankCrown;
      case 1:
        return rankBluedia;
      case 2:
        return rankReddia;
      default:
        return rankHeart;
    }
  };

  const rankImage = getRankImage(index);

  return (
    <div className="ranking-button">
      <div className="ranking-icon-container">
        <img src={rankImage} alt="Rank Icon" className="ranking-icon" />
        {rank}
      </div>
      <button className="portfolio-button">포트폴리오 보기</button>
    </div>
  );
}

function MyRankingButton() {
  return <button className="ranking-button my-ranking">나의 랭킹</button>;
}
