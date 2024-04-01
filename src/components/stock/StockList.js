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
      style={{
        backgroundColor: props.type === "home" ? "rgba(255,255,255,0.8)" : "",
        cursor: props.type !== "theme" ? "pointer" : "",
        width: props.type === "home" ? "" : "95%",
      }}
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
              : props.type === "rank" || "home"
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

      <span
        style={{
          flex: 3,
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {props && props.item && props.type === "theme"
          ? props.item.theme.name
          : props.type === "rank" || "home"
          ? props.item.stock_name
          : null}
      </span>
      <span style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        {props && props.type === "theme"
          ? null
          : props.type === "rank" || "home"
          ? null
          : null}
      </span>
      <span
        style={{
          flex: props.type === "theme" ? "" : 2,
          display: "flex",
          justifyContent: "center",
          fontSize: "12px",
          marginRight: props.type === "theme" ? "16px" : 0,
        }}
      >
        {props && props.type === "theme"
          ? `+${props.item.stats.returns}%`
          : props.type === "rank" || "home"
          ? `${props.item.current_price}`
          : null}
      </span>
    </div>
  );
};

export default StockList;
