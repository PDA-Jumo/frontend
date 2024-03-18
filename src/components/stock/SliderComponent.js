import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";

// assets
import magnify from "../../assets/icons/magnify.png";

// apis
import { getMarketIssue } from "../../lib/apis/stock";

export default function SliderComponent() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  const [issue, setIssue] = useState([]);
  useEffect(() => {
    const setData = async () => {
      const issueData = await getMarketIssue();
      setIssue(issueData.data);
      console.log(issueData.data);
    };

    setData();
  }, []);
  return (
    <StyledSlide {...settings}>
      {issue.map((item) => (
        <MarketIssue item={item} />
      ))}
    </StyledSlide>
  );
}

// 이전 버튼 컴포넌트
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-prev"
      onClick={onClick}
      style={{
        backgroundColor: "lightgray",
        width: "32px",
        height: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "32px",
      }}
    >
      &lt;
    </div>
  );
};

const MarketIssue = (props) => {
  return (
    <div
      style={{
        width: "500px",
        height: "150px",
        border: "2px solid black",
        borderRadius: "16px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={magnify} className="iconSmall" />
        <span>{props.item.content.split("『")[1].split("』")[0]}</span>
      </div>
      <span className="newsText" style={{ display: "block" }}>
        {props.item.content.substring(props.item.content.indexOf("』") + 1)}
      </span>
    </div>
  );
};

// 다음 버튼 컴포넌트
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-next"
      onClick={onClick}
      style={{
        backgroundColor: "lightgray",
        width: "32px",
        height: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "32px",
      }}
    >
      &gt;
    </div>
  );
};

const StyledSlide = styled(Slider)`
  position: relative;
  margin-top: 16px;
  width: 100%;

  .slick-list {
    position: absolute;
    width: 100%;
    height: 200px;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .slick-slider {
    display: flex;
  }

  .slick-track {
    display: flex;
    height: 100%;
  }

  .slick-dots {
    display: none !important;
  }

  .slick-arrow {
    padding: 4px 6px;
    transform: translate(30px, 150px);
    background-color: transparent;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }

  .slick-prev {
    position: absolute;
    left: 0;
    top: 60px;
    cursor: pointer;
    z-index: 100;
  }

  .slick-next {
    position: absolute;
    right: 0;
    top: 60px;
    cursor: pointer;
  }
`;
