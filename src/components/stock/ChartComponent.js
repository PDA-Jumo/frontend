import React from "react";

//css
import "../../styles/globalStyle.css";
import "../../styles/stockDetails.css";

//assets
import Flag from "../../assets/icons/flag.png";

export const MainChartNumberComponent = (props) => {
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

export const MainChartComponent = (props) => {
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

export const MainChart = (props) => {
  return (
    <div className="MainChartView">
      <span style={{ marginBottom: "8px" }}>{props.category}</span>
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
          <span style={{ fontSize: "24px" }}>
            {props.sise && props.sise.num3 && props.sise.num3[0] === "0"
              ? "개장 전"
              : props.sise.num1}
          </span>
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
