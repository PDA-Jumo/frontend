//TODO 페이지 넘어올때 API를 연동해서 랭킹값을 받아오도록 해야함

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Rank from "../../assets/backgrounds/rank.png";

import rankStar from "../../assets/rank/rankStar.png";
import rankCrown from "../../assets/rank/rankCrown.png";
import rankBluedia from "../../assets/rank/rankBluedia.png";
import rankReddia from "../../assets/rank/rankReddia.png";
import rankHeart from "../../assets/rank/rankHeart.png";

import "./rank.css";

export default function RankLayout() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadMoreUsers();
    const scrollableContent = document.querySelector(".scrollable-content");
    if (scrollableContent) {
      scrollableContent.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollableContent) {
        scrollableContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop !== clientHeight || isLoading) return;
    loadMoreUsers();
  };

  // TODO 여기가 사용자 정보 받아오는 API가 들어갈 예정 (아마 Axios를 활용하게 되지 않을까?)
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
    const rankImages = {
      0: rankCrown,
      1: rankBluedia,
      2: rankReddia,
    };

    const getRankImage = (index) => rankImages[index] || rankHeart;

    const rankImage = getRankImage(index);

    return (
      <div className="ranking-button">
        <div className="ranking-icon-container">
          <img src={rankImage} alt="Rank Icon" className="ranking-icon" />
          <div className="rank-title">주대주주</div>{" "}
          {/* TODO 유저 티어도 동적으로 받아오기 */}
          {rank}
        </div>
        <button
          className="portfolio-button"
          onClick={() => navigate("/ranking/portfolio")}
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
          나의 랭킹 {/* TODO 내 정보도 전부 동적으로 받아오기 */}
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
        <div className="non-scrollable-header">17:00 기준</div>{" "}
        {/* TODO 근데 실시간으로 받아줄거면 ㅇㅇ시 기준이 필요없지 않나? 회의필요 */}
        <div className="scrollable-content">
          <RankingList users={users} />
          <MyRankingButton />
          {isLoading && <p>로딩 중...</p>}
        </div>
      </div>

      <button className="back-button1" onClick={() => navigate("/home")}>
        홈으로
      </button>
    </div>
  );
}
