import React, { useState, useEffect } from "react";
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
import levelData from "./levelData";
import { getKoreaPortfolio } from "../../lib/apis/portfolio";
import { kospiTop5, kosdaqTop5 } from "../../lib/apis/stock";

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
  const [showItems, setShowItems] = useState(false);
  const [activeTab, setActiveTab] = useState("보유종목");
  const [myStock, setMyStock] = useState([]);
  const [tabsData, setTabsData] = useState({
    보유종목: [],
    코스피200: [],
    코스닥: [],
  });
  const user = useSelector((state) => state.user.user) || {};

  useEffect(() => {
    const setData = async () => {
      const resp = await getKoreaPortfolio(user.user_id);
      const resp1 = await kospiTop5();
      const resp2 = await kosdaqTop5();

      // 코스피 상위 5종목 코드 및 이미지 매핑
      const kospiTop5WithCodeAndImage = resp1.map((item) => ({
        name: item.stock_name,
        code: item.stock_code,
        imageUrl: `https://file.alphasquare.co.kr/media/images/stock_logo/kr/${item.stock_code}.png`,
      }));

      // 코스닥 상위 5종목 코드 및 이미지 매핑
      const kosdaqTop5WithCodeAndImage = resp2.map((item) => ({
        name: item.stock_name,
        code: item.stock_code,
        imageUrl: `https://file.alphasquare.co.kr/media/images/stock_logo/kr/${item.stock_code}.png`,
      }));

      // 보유종목 이미지 매핑
      const mystockimg = resp.myStock.slice(0, 5).map((stock, index) => ({
        name: stock,
        code: resp.myStockCode[index],
        imageUrl: `https://file.alphasquare.co.kr/media/images/stock_logo/kr/${resp.myStockCode[index]}.png`,
      }));

      setTabsData((prevTabsData) => ({
        ...prevTabsData,
        보유종목: mystockimg,
        코스피200: kospiTop5WithCodeAndImage,
        코스닥: kosdaqTop5WithCodeAndImage,
      }));
    };
    setData();
  }, []);

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
                        Lv.{user?.level} {levelData[user?.level]}
                      </span>
                      <span> {user?.type}</span>
                    </div>
                    <div className="nickname">{user?.nickname}님</div>
                    <div style={{ marginTop: "6px" }}>
                      <img
                        src={dollarIcon}
                        alt="달러 아이콘"
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "10px",
                          marginTop: "6px",
                          verticalAlign: "top",
                        }}
                      />
                      {user?.cash?.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="navigation-container">
        <div className="new-area">
          <div className="tabs">
            {Object.keys(tabsData).map((tabName) => (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={activeTab === tabName ? "active" : ""}
              >
                {tabName}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {tabsData[activeTab] &&
              tabsData[activeTab].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={`${item.name} logo`}
                    style={{
                      width: "36px",
                      height: "36px",
                    }}
                  />
                  <div>{item.name} </div>
                </div>
              ))}
          </div>
        </div>
        <div
          className={`navigation-buttons vertical ${showItems ? "show" : ""}`}
        >
          <div className={`columnCenter items ${showItems ? "show" : ""}`}>
            <img
              src={rankingIcon}
              style={{ height: "50px", cursor: "pointer" }}
              alt="랭킹"
              onClick={() => navigateTo("/ranking")}
            />
            <span style={{ fontSize: "14px" }}>랭킹</span>
          </div>
          <div className={`columnCenter items ${showItems ? "show" : ""}`}>
            <img
              src={tradeIcon}
              style={{ cursor: "pointer", marginTop: "-6px" }}
              alt="매수매도"
              onClick={() => navigateTo("/stock")}
            />
            <span style={{ fontSize: "14px", marginTop: "-6px" }}>
              매수매도
            </span>
          </div>
          <div className={`columnCenter items ${showItems ? "show" : ""}`}>
            <img
              src={quizIcon}
              alt="퀴즈"
              style={{ height: "50px", cursor: "pointer" }}
              onClick={() => navigateTo("/quiz")}
            />
            <span style={{ fontSize: "14px" }}>퀴즈</span>
          </div>
          <div className={`columnCenter items ${showItems ? "show" : ""}`}>
            <img
              src={messageIcon}
              style={{ height: "50px", cursor: "pointer" }}
              alt="커뮤니티"
              onClick={() => navigateTo("/community")}
            />
            <span style={{ fontSize: "14px" }}>커뮤니티</span>
          </div>
        </div>
        <button
          className="show-buttons"
          onClick={() => setShowItems(!showItems)}
        >
          메뉴
        </button>
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
