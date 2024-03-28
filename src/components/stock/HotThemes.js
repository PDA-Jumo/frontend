import React, { useEffect, useState } from "react";

//css
import "../../styles/globalStyle.css";
import "../../styles/stockDetails.css";

//assets
import Flag from "../../assets/icons/flag.png";
import refresh from "../../assets/icons/refresh.png";
import gold from "../../assets/stock/medal_gold.png";
import silver from "../../assets/stock/medal_silver.png";
import bronze from "../../assets/stock/medal_bronze.png";

//redux
import { useSelector } from "react-redux";

//components
import StockList from "./StockList";

//apis
import { getThemeRank } from "../../lib/apis/stock";

export default function HotThemes() {
  const [themeRank, setThemeRank] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [now, setNow] = useState("");
  const user = useSelector((state) => state.user.user);

  //오늘 주목받은 테마
  useEffect(() => {
    const nowDate = new Date();
    const hours = nowDate.getHours().toString().padStart(2, "0");
    const minutes = nowDate.getMinutes().toString().padStart(2, "0");
    setNow(`${hours}:${minutes}`);
  }, [isRefresh]);

  useEffect(() => {
    const setData = async () => {
      const themeRankData = await getThemeRank();
      setThemeRank(themeRankData.data.data);
    };
    setData();
  }, []);
  return (
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
        <img src={Flag} className="iconSmall" style={{ marginRight: "8px" }} />
        오늘 주목받은 테마
        {user.level <= 1 ? null : (
          <>
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
          </>
        )}
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
            오늘 주목받은 테마는{" "}
            <span
              style={{ fontSize: "20px", borderBottom: "6px double #71A3FF" }}
            >
              Lv 2.주린이
            </span>{" "}
            부터 조회 가능해요!
          </span>
        </div>
      ) : (
        <>
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
              <img
                src={silver}
                style={{ height: "48px", marginRight: "16px" }}
              />
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
              <img
                src={bronze}
                style={{ height: "48px", marginRight: "16px" }}
              />
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
        </>
      )}
    </div>
  );
}
