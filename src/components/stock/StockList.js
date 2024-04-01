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
        {props && props.type === "theme" ? (
          `+${props.item.stats.returns}%`
        ) : props.type === "rank" ? (
          `${props.item.current_price}`
        ) : props.type === "home" ? (
          <span
            style={{
              color:
                props.item.current_price.antc_cntg_vrss_sign === "1" ||
                props.item.current_price.antc_cntg_vrss_sign === "2"
                  ? "red"
                  : props.item.current_price.antc_cntg_vrss_sign === "3"
                  ? "black"
                  : props.item.current_price.antc_cntg_vrss_sign === "4" ||
                    props.item.current_price.antc_cntg_vrss_sign === "5"
                  ? "blue"
                  : "inherit", // 기본값, antc_cntg_vrss_sign 값이 주어진 조건 외의 경우에는 상속받은 색상을 사용
              textShadow:
                "0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white", // 글자 테두리 하얀색 설정
            }}
          >
            {props.item.current_price.antc_cntg_vrss_sign === "1" ||
            props.item.current_price.antc_cntg_vrss_sign === "2"
              ? "▲ "
              : props.item.current_price.antc_cntg_vrss_sign === "3"
              ? "- "
              : props.item.current_price.antc_cntg_vrss_sign === "4" ||
                props.item.current_price.antc_cntg_vrss_sign === "5"
              ? "▼ "
              : ""}
            {props.item.current_price.stck_prpr
              ? props.item.current_price.stck_prpr
              : props.item.current_price}
          </span>
        ) : null}
      </span>
    </div>
  );
};

export default StockList;
