import React, { useEffect, useState } from "react";

//css
import "../../styles/globalStyle.css";
import "../../styles/stockDetails.css";

//assets
import Flag from "../../assets/icons/flag.png";
import Document from "../../assets/icons/Document.png";
import shinhan_heart_chatbox from "../../assets/stock/shinhan_heart_chatbox.png";
import shinhan_singing_chatbox from "../../assets/stock/shinhan_singing_chatbox.png";
import refresh from "../../assets/icons/refresh.png";
import gold from "../../assets/stock/medal_gold.png";
import silver from "../../assets/stock/medal_silver.png";
import bronze from "../../assets/stock/medal_bronze.png";
import Folder from "../../assets/stock/folder.png";
import Trash from "../../assets/icons/Trash.png";

//library
import SliderComponent from "./SliderComponent";

//utils
import {
  getLiveSise,
  getMarketIssue,
  getThemeRank,
} from "../../lib/apis/stock";
import MarketIssueModal from "./MarketIssueModal";

export default function StockDetails() {
  const [kospiSise, setKospiSise] = useState({});
  const [kosdaqSise, setKosdaqSise] = useState({});
  const [themeRank, setThemeRank] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [now, setNow] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [issue, setIssue] = useState([]);
  const [clickedIssue, setClickedIssue] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  useEffect(() => {
    const setData = async () => {
      const liveSise = await getLiveSise();
      const themeRankData = await getThemeRank();
      const issueData = await getMarketIssue();
      setIssue(issueData.data);
      setThemeRank(themeRankData.data);
      setKospiSise(liveSise.data.kospi);
      setKosdaqSise(liveSise.data.kosdaq);
    };
    setData();
  }, []);
  useEffect(() => {
    const nowDate = new Date();
    const hours = nowDate.getHours().toString().padStart(2, "0");
    const minutes = nowDate.getMinutes().toString().padStart(2, "0");
    setNow(`${hours}:${minutes}`);
  }, [isRefresh]);
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
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "45%" }}>
          <div style={{ display: "flex" }}>
            <img
              src={Flag}
              className="iconSmall"
              style={{ marginRight: "8px" }}
            />
            <div
              className="myStockTab"
              style={{
                backgroundColor: selectedTab === 0 ? "lightgray" : "white",
              }}
              onClick={() => setSelectedTab(0)}
            >
              나의 종목 시세
            </div>
            <div
              className="myStockTab"
              style={{
                backgroundColor: selectedTab === 1 ? "lightgray" : "white",
              }}
              onClick={() => setSelectedTab(1)}
            >
              추천 종목
            </div>
          </div>
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
                style={{
                  // border: "2px solid #6082E1",
                  border: "2px solid black",
                  borderRadius: "16px",
                  padding: "4px 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                최근종목
              </div>
              <div
                style={{
                  // border: "2px solid #6082E1",
                  border: "2px solid black",
                  borderRadius: "16px",
                  padding: "4px 8px",
                  marginInline: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                보유종목
              </div>
              <div
                style={{
                  // border: "2px solid #6082E1",
                  border: "2px solid black",
                  borderRadius: "16px",
                  padding: "4px 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                관심종목
              </div>
            </div>
            <div>
              <StockList />
              <StockList />
              <StockList />
              <StockList />
              <StockList />
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
            src={shinhan_heart_chatbox}
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBlock: "32px",
        }}
      >
        <div style={{ width: "45%" }}>
          <div
            className="textShadow"
            style={{
              display: "flex",
              fontSize: "24px",
              marginRight: "8px",
              marginBottom: "8px",
            }}
          >
            <img
              src={Flag}
              className="iconSmall"
              style={{ marginRight: "8px" }}
            />
            실시간 종목 순위
          </div>
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
                style={{
                  // border: "2px solid #6082E1",
                  border: "2px solid black",
                  borderRadius: "16px",
                  padding: "4px 8px",
                  width: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                상승률
              </div>
              <div
                style={{
                  // border: "2px solid #6082E1",
                  border: "2px solid black",
                  borderRadius: "16px",
                  padding: "4px 8px",
                  marginInline: "16px",
                  width: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                인기
              </div>
            </div>
            <div>
              <StockList />
              <StockList />
              <StockList />
              <StockList />
              <StockList />
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
                {themeRank && themeRank[0] && themeRank[0].name}
              </span>
              <span>
                {themeRank && themeRank[0] && themeRank[0].volatility}%
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
                {themeRank && themeRank[1] && themeRank[1].name}
              </span>
              <span>
                {themeRank && themeRank[1] && themeRank[1].volatility}%
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
                {themeRank && themeRank[2] && themeRank[2].name}
              </span>
              <span>
                {themeRank && themeRank[2] && themeRank[2].volatility}%
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
              <StockList item={item} index={index} />
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
              <StockList item={item} index={index + 5} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const StockList = (props) => {
  return (
    <div className="stockListView">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 5,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <span>{props.index + 1}</span>
          <img src={Document} className="iconSmall" />
        </div>

        <span style={{ flex: 3 }}>
          {props && props.item && props.item.name}
        </span>
        <span style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          {props && props.item && props.item.volatility}%
        </span>
      </div>
    </div>
  );
};

const MainChartNumberComponent = (props) => {
  return (
    <div className="MainChartNumberView">
      <div className="MainChartNumber">
        <span>개인</span>
        <span
          style={{
            color:
              props.sise && props.sise.person && props.sise.person[0] === "0"
                ? "black"
                : props.sise &&
                  props.sise.person &&
                  props.sise.person[0] === "+"
                ? "#F3322C"
                : "#2B83F6",
          }}
        >
          {props.sise.person}
        </span>
      </div>
      <div
        className="MainChartNumber"
        style={{
          // borderRight: "2px solid #6082E1",
          // borderLeft: "2px solid #6082E1",
          borderRight: "2px solid lightgray",
          borderLeft: "2px solid lightgray",
        }}
      >
        <span>외국인</span>
        <span
          style={{
            color:
              props.sise &&
              props.sise.foreigner &&
              props.sise.foreigner[0] === "0"
                ? "black"
                : props.sise &&
                  props.sise.foreigner &&
                  props.sise.foreigner[0] === "+"
                ? "#F3322C"
                : "#2B83F6",
          }}
        >
          {props.sise.foreigner}
        </span>
      </div>
      <div className="MainChartNumber">
        <span>기관</span>
        <span
          style={{
            color:
              props.sise && props.sise.company && props.sise.company[0] === "0"
                ? "black"
                : props.sise &&
                  props.sise.company &&
                  props.sise.company[0] === "+"
                ? "#F3322C"
                : "#2B83F6",
          }}
        >
          {props.sise.company}
        </span>
      </div>
    </div>
  );
};

const MainChartComponent = (props) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div
        className="textShadow"
        style={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "start",
          fontSize: "24px",
          marginBottom: "8px",
          marginTop: "8px",
        }}
      >
        <img src={Flag} className="iconSmall" style={{ marginRight: "8px" }} />
        주요 지수
      </div>
      <div
        style={{
          borderRadius: "16px",
          display: "flex",
          // border: "3px solid #6082E1",
          width: "98%",
          // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        }}
      >
        <MainChart
          category={"코스피"}
          src={
            "https://ssl.pstatic.net/imgfinance/chart/main/KOSPI.png?sidcode=1710227822049"
          }
          sise={props.kospi}
        />
        <div //구분선
          style={{
            width: "3px",
            height: "250px",
            backgroundColor: "#D9D9D9",
            alignSelf: "center",
          }}
        />
        <MainChart
          category={"코스닥"}
          src={
            "https://ssl.pstatic.net/imgfinance/chart/main/KOSDAQ.png?sidcode=1710227822051"
          }
          sise={props.kosdaq}
        />
      </div>
    </div>
  );
};

const MainChart = (props) => {
  return (
    <div className="MainChartView">
      <p>{props.category}</p>
      <div className="MainChartDiv">
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "2%",
            left: "3%",
          }}
        >
          <span style={{ fontSize: "24px" }}>{props.sise.num1}</span>
          <div>
            <span
              style={{ fontSize: "12px", marginRight: "4px", color: "#8B95A1" }}
            >
              어제보다
            </span>
            <span
              style={{
                fontSize: "12px",
                color:
                  props.sise && props.sise.num3 && props.sise.num3[0] === "0"
                    ? "black"
                    : props.sise &&
                      props.sise.num3 &&
                      props.sise.num3[0] === "+"
                    ? "#F3322C"
                    : "#2B83F6",
              }}
            >
              {props.sise.num3 && props.sise.num3[0]}
              {props.sise.num2}({props.sise.num3})
            </span>
          </div>
        </div>
        <img src={props.src} className="MainChart" />
      </div>
    </div>
  );
};
