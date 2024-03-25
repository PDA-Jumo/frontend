import React, { useState } from "react";
import rankingIcon from "../../assets/main/star.png";
import tradeIcon from "../../assets/main/cash.png";
import quizIcon from "../../assets/main/pen.png";
import messageIcon from "../../assets/main/mail.png";
import encyclopediaIcon from "../../assets/main/zoom.png";
import dollarIcon from "../../assets/main/dollar.png";
import stockIcon from "../../assets/main/stock.png";
import clickmeIcon from "../../assets/main/clickme.png";
import tipsIcon from "../../assets/main/tips.png";
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

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tips, setTips] = useState(["dfsdsf", "sdfsdfss", "32r3r2"]);
  const [isLevelUp, setIsLevelUp] = useState(false);

  const user = useSelector((state) => state.user.user) || {};
  console.log(user);

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                width: "400px",
                height: "130px",
                borderRadius: "16px",
                boxSizing: "border-box",
                padding: "16px",
                color: "white",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "24px" }}>Tips</span>
                <img
                  src={speaker}
                  style={{ width: "24px", marginInline: "4px" }}
                />
              </div>
              <Swiper
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                direction={"vertical"}
                modules={[Autoplay]}
                style={{
                  fontSize: "16px",
                  marginTop: "4px",
                  width: "100%",
                  height: "60%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {tips.map((item, index) => (
                  <SwiperSlide>{item}</SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="basic-info white-rounded-box">
              <div className="profile-and-info">
                <img
                  src={user?.profile_img}
                  alt="프로필 이미지"
                  className="profile-img"
                />
                <div className="info-text">
                  <div className="user-info">
                    <div className="level-type">
                      <span> Lv.{user?.level}</span>
                      <span> {user?.type}</span>
                    </div>
                    <div className="nickname">{user?.nickname}님</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="white-rounded-box-row">
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
            onClick={() => navigateTo("/community")}
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
            alt="메시지"
            onClick={() => navigateTo("/messages")}
          />
          <span style={{ fontSize: "14px" }}>메시지</span>
        </div>
        <div className="columnCenter">
          <img
            src={encyclopediaIcon}
            style={{ cursor: "pointer" }}
            alt="주식도감"
            onClick={() => navigateTo("/encyclopedia")}
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
    </div>
  );
}

export default HomePage;
