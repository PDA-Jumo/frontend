import React, { useEffect, useState } from "react";

//css
import "../../styles/globalStyle.css";
import "../../styles/stockDetails.css";

//redux
import { useSelector } from "react-redux";

//assets
import Document from "../../assets/icons/Document.png";

//library
import SliderComponent from "./SliderComponent";

//utils
import { getLiveSise, getMarketIssue } from "../../lib/apis/stock";

//modal
import MarketIssueModal from "./MarketIssueModal";

//components
import { MainChartComponent, MainChartNumberComponent } from "./ChartComponent";
import StockPrice from "./StockPrice";
import LiveStockRanking from "./LiveStockRanking";
import HotThemes from "./HotThemes";

export default function StockDetails() {
  const [kospiSise, setKospiSise] = useState({});
  const [kosdaqSise, setKosdaqSise] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [issue, setIssue] = useState([]);
  const [clickedIssue, setClickedIssue] = useState({});

  const user = useSelector((state) => state.user.user);

  //주가 그래프 관련 데이터
  useEffect(() => {
    const setData = async () => {
<<<<<<< HEAD
      // const liveSise = await getLiveSise();
      // const themeRankData = await getThemeRank();
      // const issueData = await getMarketIssue();
      // const liveRankingData = await getLiveRanking(selectedRankingTab);
      // setIssue(issueData.data);
      // setThemeRank(themeRankData.data.data);
      // setKospiSise(liveSise.data.kospi);
      // setKosdaqSise(liveSise.data.kosdaq);
      // setLiveRanking(liveRankingData.data);
    };
    setData();
  }, []);
  useEffect(() => {
    const setNewData = async () => {
      // const liveRankingData = await getLiveRanking(selectedRankingTab);
      // setLiveRanking(liveRankingData.data);
    };
    setNewData();
  }, [selectedRankingTab]);
  //오늘 주목받은 테마
  useEffect(() => {
    const nowDate = new Date();
    const hours = nowDate.getHours().toString().padStart(2, "0");
    const minutes = nowDate.getMinutes().toString().padStart(2, "0");
    setNow(`${hours}:${minutes}`);
  }, [isRefresh]);
  const handleClickLiveRankingTab = (type) => {
    setSelectedRankingTab(type);
  };
=======
      const liveSise = await getLiveSise();
      const issueData = await getMarketIssue();
      setIssue(issueData.data);
      setKospiSise(liveSise.data.kospi);
      setKosdaqSise(liveSise.data.kosdaq);
    };
    setData();
  }, []);

>>>>>>> a69af9fc04613bc811471af59cc9525601a76fba
  return (
    <div
      style={{
        // marginTop: "8px",
        // height: "66vh",
        paddingInline: "32px",
        boxSizing: "border-box",
        height: "100%",
        overflowY: isModal ? "hidden" : "scroll",
        overflowX: "hidden",
      }}
    >
      {isModal ? (
        <MarketIssueModal issue={clickedIssue} setIsModal={setIsModal} />
      ) : null}
      <MainChartComponent kospi={kospiSise} kosdaq={kosdaqSise} />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <MainChartNumberComponent sise={kospiSise} />
        <MainChartNumberComponent sise={kosdaqSise} />
      </div>
      <div
        style={{
          marginTop: "42px",
          height: "280px",
        }}
      >
        <div
          className="textShadow"
          style={{ display: "flex", alignItems: "center", fontSize: "24px" }}
        >
          <img
            src={Document}
            className="iconSmall"
            style={{ marginRight: "8px" }}
          />
          마켓 이슈
        </div>
        {user.level <= 1 ? (
          <div
            style={{
              width: "100%",
              height: "130px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "20px" }}>
              마켓 이슈는{" "}
              <span
                style={{ fontSize: "20px", borderBottom: "6px double #71A3FF" }}
              >
                Lv 2.주린이
              </span>{" "}
              부터 조회 가능해요!
            </span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <SliderComponent
              issue={issue}
              setIsModal={setIsModal}
              setClickedIssue={setClickedIssue}
            />
          </div>
<<<<<<< HEAD
          <div
            style={{
              width: "100%",
              marginLeft: "3px",
              // border: "3px solid #6082E1",
              borderRadius: "16px",
              boxShadow: "2px 0px 5px 0px rgba(0,0,0,0.2)",
              padding: "8px",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                className={
                  selectedRankingTab === "2" ? "smallTabSelected" : "smallTab"
                }
                onClick={() => handleClickLiveRankingTab("2")}
              >
                상승률
              </div>
              <div
                className={
                  selectedRankingTab === "1" ? "smallTabSelected" : "smallTab"
                }
                style={{
                  marginInline: "16px",
                }}
                onClick={() => handleClickLiveRankingTab("1")}
              >
                인기
              </div>
            </div>
            <div>
              {/* {liveRanking !== [] ? (
                liveRanking.map((item, index) => (
                  <StockList type="rank" item={item} key={item.stock_code} />
                ))
              ) : (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  실시간 종목 랭킹이 존재하지 않아요!
                </div>
              )} */}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "45%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={shinhan_singing_chatbox}
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <div
          className="textShadow"
          style={{
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={Flag}
            className="iconSmall"
            style={{ marginRight: "8px" }}
          />
          오늘 주목받은 테마
          <img
            src={refresh}
            className="iconSmall"
            style={{
              marginLeft: "16px",
              transform: isRefresh ? "rotate(360deg)" : "rotate(0deg)",
              cursor: "pointer",
              transition: "transform 0.5s ease",
            }}
            onClick={() => {
              setIsRefresh(!isRefresh);
            }}
          />
          <span
            style={{
              color: "#807F7E",
              textShadow: "none",
              fontSize: "16px",
              alignSelf: "flex-end",
              marginLeft: "8px",
            }}
          >
            {now}
            기준
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginBottom: "16px",
          }}
        >
          <div className="themeTop3" style={{ height: "80px" }}>
            <img src={gold} style={{ height: "48px", marginRight: "16px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "120px",
                }}
              >
                {themeRank && themeRank[0] && themeRank[0].theme.name}
              </span>
              <span>
                +{themeRank && themeRank[0] && themeRank[0].stats.returns}%
              </span>
            </div>
          </div>
          <div className="themeTop3" style={{ height: "70px" }}>
            <img src={silver} style={{ height: "48px", marginRight: "16px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "120px",
                }}
              >
                {themeRank && themeRank[1] && themeRank[1].theme.name}
              </span>
              <span>
                +{themeRank && themeRank[1] && themeRank[1].stats.returns}%
              </span>
            </div>
          </div>
          <div className="themeTop3" style={{ height: "60px" }}>
            <img src={bronze} style={{ height: "48px", marginRight: "16px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "120px",
                }}
              >
                {themeRank && themeRank[2] && themeRank[2].theme.name}
              </span>
              <span>
                +{themeRank && themeRank[2] && themeRank[2].stats.returns}%
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            // border: "3px solid #6082E1",
            display: "flex",
            height: "300px",
            width: "98%",
            alignSelf: "center",
            borderRadius: "16px",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
          }}
        >
          <div className="MainChartView">
            {themeRank.slice(0, 5).map((item, index) => (
              <StockList type="theme" item={item} index={index} />
            ))}
          </div>
          <div //구분선
            style={{
              width: "3px",
              height: "250px",
              backgroundColor: "#D9D9D9",
              alignSelf: "center",
            }}
          />
          <div className="MainChartView">
            {themeRank.slice(5, 11).map((item, index) => (
              <StockList type="theme" item={item} index={index + 5} />
            ))}
          </div>
        </div>
=======
        )}
>>>>>>> a69af9fc04613bc811471af59cc9525601a76fba
      </div>
      <StockPrice />
      <LiveStockRanking />
      <HotThemes />
    </div>
  );
}
