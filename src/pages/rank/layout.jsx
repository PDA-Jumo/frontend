//TODO 페이지 넘어올때 API를 연동해서 랭킹값을 받아오도록 해야함

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Rank from "../../assets/backgrounds/rank.png";
import { useSelector, useDispatch } from "react-redux";
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
  const scrollableContentRef = useRef(null);
  const user = useSelector((state) => state.user.user) || {};
  console.log(user);
  useEffect(() => {
    loadMoreUsers();
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

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop !== clientHeight || isLoading) return;
    loadMoreUsers();
  };

  // TODO 여기가 사용자 정보 받아오는 API가 들어갈 예정 (아마 Axios를 활용하게 되지 않을까?)
  const loadMoreUsers = () => {
    // 현재 유저 수가 20명 이상일 경우 더 이상 유저를 로드하지 않음
    if (users.length >= 20) {
      setIsLoading(false); // 로딩 상태 해제
      return; // 함수 종료
    }

    setIsLoading(true);
    // 여기부터 API call을 넣으면 됨
    setTimeout(() => {
      const newUsers = Array.from(
        { length: 20 },
        (_, index) => `사용자 ${index + users.length + 1}`
      );
      // 유저 총수가 20명을 넘지 않도록 조절
      setUsers((prev) => [...prev, ...newUsers].slice(0, 20));
      // 여기까지가 API call이 되어야 함 (const newUsers = 방식, 혹은 아예 다른 방식으로 받을수도 있을지도?)
      setIsLoading(false);
    }, 100);
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

    //TODO: User의 정보를 각각 띄워줄수 있도록 구현해야 할 듯?
    return (
      <div className="ranking-button">
        <div className="ranking-icon-container">
          <img src={rankImage} alt="Rank Icon" className="ranking-icon" />
          <div className="rank-title">주대주주</div>
          {/* rank: 사용자의 이름... */} {rank}
        </div>
        <button
          className="portfolio-button"
          onClick={() => navigate("/ranking/portfolio")} //TODO /ranking/:userId. 라우터도 나중에 수정해주기
        >
          포트폴리오 보기
        </button>
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
        <div className="non-scrollable-header">17:00 기준</div>
        <div className="scrollable-content" ref={scrollableContentRef}>
          {/* TODO 유저의 랭킹을 어떤식으로, 어떤 간격으로 DB단에서 update 해줄 것인가? */}
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
