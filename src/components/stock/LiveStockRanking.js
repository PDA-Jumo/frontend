import React, { useEffect, useState } from "react";

//css
import "../../styles/globalStyle.css";
import "../../styles/stockDetails.css";

//assets
import Flag from "../../assets/icons/flag.png";
import shinhan_singing_chatbox from "../../assets/stock/shinhan_singing_chatbox.png";

//apis
import { getLiveRanking } from "../../lib/apis/stock";

//components
import StockList from "./StockList";

export default function LiveStockRanking() {
  const [liveRanking, setLiveRanking] = useState([]);
  const [selectedRankingTab, setSelectedRankingTab] = useState("2");
  const handleClickLiveRankingTab = (type) => {
    setSelectedRankingTab(type);
  };
  useEffect(() => {
    const setData = async () => {
      const liveRankingData = await getLiveRanking(selectedRankingTab);
      setLiveRanking(liveRankingData.data);
    };
    setData();
  }, []);

  useEffect(() => {
    const setNewData = async () => {
      const liveRankingData = await getLiveRanking(selectedRankingTab);
      setLiveRanking(liveRankingData.data);
    };
    setNewData();
  }, [selectedRankingTab]);
  return (
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
            {liveRanking !== [] ? (
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
            )}
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
  );
}
