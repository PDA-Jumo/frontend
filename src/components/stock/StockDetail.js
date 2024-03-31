import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//css
import "../../styles/stockDetails.css";

//assets
import character from "../../assets/character/shinhan_computer.png";
import TradeModal from "./TradeModal";
import Heart from "../../assets/icons/Heart.png";
import EHeart from "../../assets/icons/emptyHeart.png";

import {
  getStockDetail,
  getStockNews,
  getStockGraph,
} from "../../lib/apis/stock";
import {
  checkLikeStock,
  postLikeStock,
  deleteLikeStock,
} from "../../lib/apis/portfolio";
import { createCommunity, checkCommunity } from "../../lib/apis/community";

import socketEvent from "../../lib/socket/StockSocketEvents";
import { setHours } from "date-fns";

export default function StockDetail() {
  const [isTrade, setIsTrade] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [stockd, setStockD] = useState([]);
  const [stocknews, setStockNews] = useState([{}]);
  const [isLike, setIsLike] = useState("empty");
  const [graph, setGraph] = useState([]);
  const [prices, setPrices] = useState([]);
  const location = useLocation();
  const user = useSelector((state) => state.user.user) || {};
  const [day, setDay] = useState("month");

  const navigate = useNavigate();

  // // 버튼 클릭 이벤트 핸들러
  const handleRequestData = () => {
    // 서버에 "requestData" 메시지를 보내 데이터 요청
    // stockSocket.emit("requestData", "005930");
    //stockSocket.emit("requestPrice", "199800");
  };

  useEffect(() => {
    const setData = async () => {
      const resp = await getStockDetail(location.state.stock_code); //종목 정보 (시가총액, per ...)
      const res = await getStockNews(location.state.stock_code); // 종목 뉴스
      const re = await getStockGraph(location.state.stock_code); // 종목 그래프(3개월)
      const response = await checkLikeStock(
        user.user_id,
        location.state.stock_code
      ); // 관심종목 확인
      setStockD(resp);
      setStockNews(res);
      setIsLike(response);
      setGraph(re);
    };
    setData();
  }, [isLike, location.state.stock_code]);

  console.log(isLike);
  console.log(graph);
  const maxYValue = Math.max(...graph.map((item) => item.close));
  const minYValue = Math.min(...graph.map((item) => item.close));

  useEffect(() => {
    // 종목 상세 페이지 입장
    socketEvent.joinRoom(location.state.stock_code, user.user_id);

    // 현재가 데이터 로드
    socketEvent.getStockdata((currentprice) => {
      const stock_prpr = currentprice.output2.stck_prpr;
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const newDataPoint = {
        time: String(hours + ":" + minutes + ":" + seconds),
        stock: parseInt(stock_prpr),
      };
      setPrices((prevPrices) => [...prevPrices, newDataPoint]);
    });

    return () => {
      socketEvent.leaveRoom(location.state.stock_code, user.user_id);
    };
  }, [location.state.stock_code, user.user_id]);

  const handleCommunityClick = async () => {
    try {
      const data = await checkCommunity(location.state.stock_code);
      if (data.length === 0) {
        await createCommunity(
          location.state.stock_code,
          location.state.stock_name
        );
      }
      navigate(`/community/`);
    } catch (error) {
      console.error("커뮤니티 생성 중 오류 발생", error);
    }
  };

  console.log(stockd);

  console.log(stocknews);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        overflowX: "hidden",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          // backgroundColor: "#FFDE6B",
          height: "70px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginLeft: "16px",
            borderBottom: "5px solid #FFDE6B",
            boxSizing: "border-box",
            paddingInline: "8px",
          }}
        >
          {isLike === "in" ? (
            <img
              style={{ width: "60px" }}
              src={Heart}
              onClick={() => {
                deleteLikeStock(user.user_id, location.state.stock_code);
                setIsLike("empty");
              }}
            />
          ) : (
            <img
              style={{ width: "60px" }}
              src={EHeart}
              onClick={() => {
                postLikeStock(
                  user.user_id,
                  location.state.stock_code,
                  location.state.stock_name
                );
                setIsLike("in");
              }}
            />
          )}
          <span className="largeText">
            {location.state.stock_name || location.state.stbd_nm}
          </span>
          <span
            style={{ marginBottom: "5px", color: "#B9B9B9", marginLeft: "8px" }}
          >
            {location.state.stock_code}
          </span>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex" }}>
        <div
          style={{
            flexDirection: "column",
            width: "50%",
            height: "100%",
            display: "flex",
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          {/* 종목 차트 */}
          <div>
            <div style={{ display: "flex", gap: "20px", marginLeft: "8px" }}>
              <div onClick={() => setDay("month")}>3개월</div>
              <div onClick={() => setDay("day")}>1일</div>
            </div>

            {day === "month" ? (
              <LineChart
                width={680}
                height={250}
                data={graph}
                margin={{
                  top: 30,
                  right: 0,
                  left: 10,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[minYValue, maxYValue + 10000]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="close"
                  stroke="#8884d8"
                  dot={{ r: 1 }}
                />
              </LineChart>
            ) : (
              <LineChart
                width={750}
                height={250}
                data={prices}
                margin={{
                  top: 30,
                  right: 0,
                  left: 10,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="stock"
                  stroke="#8884d8"
                  dot={{ r: 1 }}
                />
              </LineChart>
            )}
          </div>
          <div style={{ display: "flex", marginLeft: "20px" }}>
            <div
              className={
                "stockDetailTab" + (activeTab === "info" ? " active" : "")
              }
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={() => setActiveTab("info")}
            >
              종목 정보
            </div>
            <div
              className={
                "stockDetailTab" + (activeTab === "news" ? " active" : "")
              }
              style={{ cursor: "pointer" }}
              onClick={() => setActiveTab("news")}
            >
              뉴스
            </div>
          </div>
          <div
            style={{
              border: "3px solid #ffde6b",
              height: "200px",
              borderRadius: "16px",
              marginInline: "16px",
              marginBottom: "16px",
            }}
          >
            {activeTab === "info" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "30vh",
                  gap: "5%",
                }}
              >
                <div>
                  <div class="info">
                    시가 총액<div>{stockd.hts_avls}</div>
                  </div>
                  <hr />
                  <div class="info">
                    pbr <div>{stockd.pbr}</div>
                  </div>
                  <hr />
                </div>

                <div>
                  <div class="info">
                    per<div>{stockd.per}</div>
                  </div>
                  <hr />
                  <div class="info">
                    외국인 소진율<div>{stockd.hts_frgn_ehrt}</div>
                  </div>
                  <hr />
                </div>
              </div>
            )}
            {activeTab === "news" && (
              <div style={{ height: "200px", overflowY: "scroll" }}>
                <div style={{ margin: "2% 2%" }}>
                  {stocknews.map((item, id) => (
                    <div
                      key={id}
                      onClick={() => {
                        window.location.href = item.url;
                      }}
                      style={{ cursor: "pointer", marginTop: "1%" }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ width: "50%", height: "100%" }}>
          <TradeModal item={location.state} />
        </div>
      </div>
    </div>
  );
}
