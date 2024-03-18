import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

  const RankingHeader = () => {
    return (
      <div className="ranking-header">
        <img src={rankStar} alt="Rank Star" className="ranking-star-img" />
        랭킹
      </div>
    );
  };

  const RankingList = ({ users }) => {
    return (
      <>
        {users.map((user, index) => (
          <RankingButton key={index} rank={user} index={index} />
        ))}
      </>
    );
  };

  const RankingButton = ({ rank, index }) => {
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
          <div className="rank-title">주대주주</div>
          {rank}
        </div>
        <button
          className="portfolio-button"
          onClick={() => navigate("/rank/portfolio")}
        >
          포트폴리오 보기
        </button>
      </div>
    );
  };

  const MyRankingButton = () => {
    return (
      <div className="ranking-button my-ranking">
        <div className="ranking-icon-container">
          <img src={rankHeart} alt="Rank Icon" className="ranking-icon" />
          <div className="rank-title">주대주주</div>
          나의 랭킹
        </div>
      </div>
    );
  };

  return (
    <div className="background-style">
      <img src={Rank} className="background-image" alt="Rank Background" />
      <div className="ranking-header-container">
        <RankingHeader />
      </div>
      <div className="content-position">
        <RankingList users={users} />
        <MyRankingButton />
      </div>
      <button className="back-button" onClick={() => navigate("/")}>
        홈으로
      </button>
      {isLoading && <p>로딩 중...</p>}
    </div>
  );
}
