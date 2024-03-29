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
      const liveSise = await getLiveSise();
      const issueData = await getMarketIssue();
      setIssue(issueData.data);
      setKospiSise(liveSise.data.kospi);
      setKosdaqSise(liveSise.data.kosdaq);
    };
    setData();
  }, []);

  return (
    <div
      style={{
        // marginTop: "8px",
        // height: "66vh",
        paddingInline: "64px",
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
        )}
      </div>
      <StockPrice />
      <LiveStockRanking />
      <HotThemes />
    </div>
  );
}
