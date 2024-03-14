import React from "react";

//css
import "../../styles/globalStyle.css";
import "../../styles/stockDetails.css";

//assets
import Flag from "../../assets/icons/flag.png";
import Document from "../../assets/icons/Document.png";
import shinhan_heart_chatbox from "../../assets/stock/shinhan_heart_chatbox.png";
import shinhan_singing_chatbox from "../../assets/stock/shinhan_singing_chatbox.png";

//library
import SliderComponent from "./SliderComponent";

export default function StockDetails() {
  return (
    <div
      style={{
        marginTop: "8px",
        height: "66vh",
        overflow: "scroll",
      }}
    >
      <MainChartComponent />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <MainChartNumberComponent />
        <MainChartNumberComponent />
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
          <img src={Document} className="iconSmall" style={{ margin: "8px" }} />
          마켓 이슈
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <SliderComponent />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "45%" }}>
          <div style={{ display: "flex" }}>
            <img
              src={Flag}
              className="iconSmall"
              style={{ marginRight: "8px" }}
            />
            <div
              style={{
                padding: "8px",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              나의 종목 시세
            </div>
            <div
              style={{
                padding: "8px",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              추천 종목
            </div>
          </div>
          <div
            style={{
              width: "100%",
              border: "3px solid #FBD115",
              borderRadius: "16px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
              padding: "8px",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  border: "2px solid #FBD115",
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
                  border: "2px solid #FBD115",
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
                  border: "2px solid #FBD115",
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
              <div className="stockListView">
                <StockList />
              </div>
              <div className="stockListView">
                <StockList />
              </div>
              <div className="stockListView">
                <StockList />
              </div>
              <div className="stockListView">
                <StockList />
              </div>
              <div className="stockListView">
                <StockList />
              </div>
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
          justifyContent: "space-around",
          marginBlock: "32px",
        }}
      >
        <div style={{ width: "45%" }}>
          <div
            className="textShadow"
            style={{ display: "flex", fontSize: "24px", margin: "8px" }}
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
              border: "3px solid #FBD115",
              borderRadius: "16px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
              padding: "8px",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  border: "2px solid #FBD115",
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
                  border: "2px solid #FBD115",
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
              <div className="stockListView">
                <StockList />
              </div>
              <div className="stockListView">
                <StockList />
              </div>
              <div className="stockListView">
                <StockList />
              </div>
              <div className="stockListView">
                <StockList />
              </div>
              <div className="stockListView">
                <StockList />
              </div>
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
    </div>
  );
}

const StockList = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", flex: 6 }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <span>1</span>
        <img src={Document} className="iconSmall" />
      </div>

      <span style={{ flex: 3 }}>씨씨에스</span>
      <span style={{ flex: 1 }}>5,000원</span>
      <span style={{ flex: 1 }}>+26.7%</span>
    </div>
  );
};

const MainChartNumberComponent = () => {
  return (
    <div className="MainChartNumberView">
      <div className="MainChartNumber">
        <span>개인</span>
        <span>-9,065</span>
      </div>
      <div
        className="MainChartNumber"
        style={{
          borderRight: "2px solid #FBD115",
          borderLeft: "2px solid #FBD115",
        }}
      >
        <span>개인</span>
        <span>-9,065</span>
      </div>
      <div className="MainChartNumber">
        <span>개인</span>
        <span>-9,065</span>
      </div>
    </div>
  );
};

const MainChartComponent = () => {
  return (
    <>
      <div
        className="textShadow"
        style={{ display: "flex", alignItems: "center", fontSize: "24px" }}
      >
        <img src={Flag} className="iconSmall" style={{ margin: "8px" }} />
        주요 지수
      </div>
      <div
        style={{
          borderRadius: "16px",
          display: "flex",
          border: "3px solid #FBD115",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
        }}
      >
        <MainChart category={"코스피"} />
        <div //구분선
          style={{
            width: "3px",
            height: "250px",
            backgroundColor: "#FBD115",
            alignSelf: "center",
          }}
        />
        <MainChart category={"코스닥"} />
      </div>
    </>
  );
};

const MainChart = (props) => {
  return (
    <div className="MainChartView">
      <p>{props.category}</p>
      <div
        style={{
          width: "100%",
          height: "250px",
          borderRadius: "16px",
        }}
      >
        <div className="MainChart" />
      </div>
    </div>
  );
};
