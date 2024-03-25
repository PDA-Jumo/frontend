import React, { useState } from "react";
import rankingIcon from "../../assets/main/star.png";
import tradeIcon from "../../assets/main/cash.png";
import quizIcon from "../../assets/main/pen.png";
import messageIcon from "../../assets/main/mail.png";
import encyclopediaIcon from "../../assets/main/zoom.png";
import dollarIcon from "../../assets/main/dollar.png";
import stockIcon from "../../assets/main/stock.png";
import clickmeIcon from "../../assets/main/clickme.png";
import tipsIcon from "../../assets/main/tips.png"; // 이거 왜있는거임 ..?
import speaker from "../../assets/icons/speaker.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateFinancialsAction } from "../../store/reducers/user";
import { upCash } from "../../lib/apis/home";
import "./page.css";

// Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Modal
import LevelUpModal from "../../components/home/LevelUpModal";

// ToolTip
import { Tooltip as ReactTooltip } from "react-tooltip";

import { tipsdata } from "./tip";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLevelUp, setIsLevelUp] = useState(false);
  const levelName = [
    "초보 탈출",
    "주얼딩",
    "주린이",
    "주초딩",
    "주중딩",
    "주고딩",
    "주대딩",
    "주졸부",
    "주대주주",
  ];

  const user = useSelector((state) => state.user.user) || {};
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  // 문제 난이도기준으로 추출 + 랜덤돌리는 함수 위아래로 구현
  const [tips, setTips] = useState(() =>
    shuffleArray(tipsdata.filter((tip) => user?.level >= tip.level)).map(
      (tip) => tip.body
    )
  );

  const navigateTo = (path) => {
    navigate(path);
  };

  const upCashByWork = async (user_id, cash) => {
    try {
      const resp = await upCash({ user_id, cash });
      const data = resp.data;

      if (data === "성공") {
        dispatch(updateFinancialsAction(cash));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="portfolio-page">
      {isLevelUp ? <LevelUpModal setIsLevelUp={setIsLevelUp} /> : null}
      <div className="user-info">
        <div className="info-overlay">
          <div className="info-container">
            <div className="tip-box">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "24px" }}>Tips</span>
                <img
                  src={speaker}
                  style={{ width: "24px", marginInline: "4px" }}
                />
              </div>
              <Swiper
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                direction={"vertical"}
                modules={[Autoplay]}
                className="swiper-container"
              >
                {tips.map((item, index) => (
                  <SwiperSlide key={index} className="Sample">
                    {item}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className="basic-info white-rounded-box"
              data-tooltip-id="my-tooltip-1"
            >
              <div className="profile-and-info">
                <img
                  src={user?.profile_img}
                  alt="프로필 이미지"
                  className="profile-img"
                />
                <div className="info-text">
                  <div className="user-info">
                    <div className="level-type">
                      <span>
                        {" "}
                        Lv.{user?.level} {levelName[user?.level]}
                      </span>
                      <span> {user?.type}</span>
                    </div>
                    <div className="nickname">{user?.nickname}님</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="white-rounded-box-row "
            style={{ marginTop: "-20px" }}
          >
            <img
              src={dollarIcon}
              alt="달러 아이콘"
              style={{
                width: "24px",
                height: "24px",
                marginRight: "10px",
                marginTop: "6px",
              }}
            />
            <div>{user?.cash?.toLocaleString()}</div>
          </div>
          <div
            className="white-rounded-box-row"
            onClick={() => navigateTo("/holdings")}
          >
            <img
              src={stockIcon}
              alt="보유 종목"
              style={{
                width: "24px",
                height: "24px",
                marginRight: "10px",
                marginTop: "6px",
              }}
            />
            <span>보유종목</span>
          </div>
        </div>
      </div>
      <div className="navigation-buttons vertical">
        <div className="columnCenter">
          <img
            src={rankingIcon}
            style={{ height: "50px", cursor: "pointer" }}
            alt="랭킹"
            onClick={() => navigateTo("/ranking")}
          />
          <span style={{ fontSize: "14px" }}>랭킹</span>
        </div>
        <div className="columnCenter">
          <img
            src={tradeIcon}
            style={{ cursor: "pointer", marginTop: "-6px" }}
            alt="매수매도"
            onClick={() => navigateTo("/stock")}
          />
          <span style={{ fontSize: "14px", marginTop: "-6px" }}>매수매도</span>
        </div>
        <div className="columnCenter">
          <img
            src={quizIcon}
            alt="퀴즈"
            style={{ height: "50px", cursor: "pointer" }}
            onClick={() => navigateTo("/quiz")}
          />
          <span style={{ fontSize: "14px" }}>퀴즈</span>
        </div>
        <div className="columnCenter">
          <img
            src={messageIcon}
            style={{ height: "50px", cursor: "pointer" }}
            alt="커뮤니티"
            onClick={() => navigateTo("/community")}
          />
          <span style={{ fontSize: "14px" }}>커뮤니티</span>
        </div>
        <div className="columnCenter">
          <img
            src={encyclopediaIcon}
            style={{ cursor: "pointer" }}
            alt="주식도감"
            onClick={() => navigateTo("/book")}
          />
          <span style={{ fontSize: "14px" }}>주식도감</span>
        </div>
      </div>
      <div className="clickme">
        <img
          src={clickmeIcon}
          alt="노가다"
          onClick={() => upCashByWork(user.user_id, 1000)}
        />
      </div>
      <ReactTooltip
        id="my-tooltip-1"
        place="left"
        content="레벨업 하기 위해서는 10,000원을 더 모아야해요!"
      />
    </div>
  );
}

export default HomePage;
