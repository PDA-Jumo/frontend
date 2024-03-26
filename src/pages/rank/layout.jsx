import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Rank from "../../assets/backgrounds/rank.png";
import { useSelector } from "react-redux";
import rankStar from "../../assets/rank/rankStar.png";
import rankCrown from "../../assets/rank/rankCrown.png";
import rankBluedia from "../../assets/rank/rankBluedia.png";
import rankReddia from "../../assets/rank/rankReddia.png";
import rankHeart from "../../assets/rank/rankHeart.png";
import axios from "axios";
import levelData from "../home/levelData";
import "./rank.css";

export default function RankLayout() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();
  const scrollableContentRef = useRef(null);
  const currentUser = useSelector((state) => state.user.user) || {};

  useEffect(() => {
    fetchRankUsers();
    const scrollableContent = scrollableContentRef.current;
    if (scrollableContent) {
      scrollableContent.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollableContent) {
        scrollableContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const fetchRankUsers = async () => {
    setIsLoading(true);
    const now = new Date();
    const currentTimeFormatted = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    setCurrentTime(currentTimeFormatted);

    try {
      const response = await axios.get("/users/rankUsers");
      console.log(response.data);
      const topTenUsers = response.data.slice(0, 10).map((user) => ({
        nickname: user.nickname,
        level: user.level,
        user_id: user.user_id,
      }));
      setUsers(topTenUsers);
    } catch (error) {
      console.error("랭킹 정보를 불러오는 중 에러가 발생했습니다.", error);
    }
    setIsLoading(false);
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop !== clientHeight || isLoading) return;
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
          <RankingButton key={index} user={user} index={index} />
        ))}
      </>
    );
  };

  const RankingButton = ({ user, index }) => {
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
          <div className="rank-title">
            Lv.{user.level} {levelData[user.level] || "알 수 없음"}
          </div>
          <div className="nickname">{user.nickname}</div>
        </div>
        {currentUser.user_id !== user.user_id && (
          <button
            className="portfolio-button"
            onClick={() => {
              navigate(`/ranking/${user.user_id}`, {});
            }}
          >
            포트폴리오 보기
          </button>
        )}
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
        <div className="non-scrollable-header">
          <button onClick={fetchRankUsers}>업데이트</button>
          {currentTime} 기준
        </div>
        <div className="scrollable-content" ref={scrollableContentRef}>
          <RankingList users={users} />
          {isLoading && <p>로딩 중...</p>}
        </div>
      </div>
      <button className="back-button1" onClick={() => navigate("/home")}>
        홈으로
      </button>
    </div>
  );
}
