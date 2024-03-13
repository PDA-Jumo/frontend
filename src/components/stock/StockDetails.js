import React from "react";

//css
import "../../styles/globalStyle.css";
import "../../styles/stockDetails.css";

//assets
import Flag from "../../assets/icons/flag.png";
import Document from "../../assets/icons/Document.png";

//library
import Slider from "react-slick";
import styled from "styled-components";
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

      <div style={{ marginTop: "42px" }}>
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
    </div>
  );
}

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
