import React from "react";

// css
import "../../styles/globalStyle.css";
import "../../styles/stockDetails.css";

// assets
import Document from "../../assets/icons/Document.png";

// navigation
import { useNavigate } from "react-router-dom";

const StockList = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="stockListView"
      style={{ cursor: props.type !== "theme" ? "pointer" : "" }}
      onClick={() =>
        props.type !== "theme"
          ? navigate(`/stock/detail/${props.item.stock_code}`, {
              state: props.item,
            })
          : null
      }
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <span>
          {props.type === "theme"
            ? props.item.stats.rank
            : props.type === "rank"
            ? props.item.rank
            : null}
        </span>
        <img
          src={
            props.type === "theme"
              ? props.item.theme.image
              : props.type === "rank"
              ? `https://file.alphasquare.co.kr/media/images/stock_logo/kr/${props.item.stock_code}.png`
              : Document
          }
          onError={(e) => {
            e.target.src =
              "https://file.alphasquare.co.kr/media/images/stock_logo/ETF_230706.png";
          }}
          style={{ borderRadius: "16px", objectFit: "cover" }}
          className="iconSmall"
        />
      </div>

      <span style={{ flex: 3 }}>
        {props && props.item && props.type === "theme"
          ? props.item.theme.name
          : props.type === "rank"
          ? props.item.stock_name
          : null}
      </span>
      <span style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        {props && props.type === "theme"
          ? `+${props.item.stats.returns}%`
          : props.type === "rank"
          ? `${props.item.stock_code}`
          : null}
      </span>
      <span style={{ flex: 2, display: "flex", justifyContent: "center" }}>
        {props && props.type === "theme"
          ? `+${props.item.stats.returns}%`
          : props.type === "rank"
          ? `${props.item.current_price}`
          : null}
      </span>
    </div>
  );
};

export default StockList;
