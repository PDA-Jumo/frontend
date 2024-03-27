import React from "react";

//css
import "../../styles/globalStyle.css";
import "../../styles/stockDetails.css";

//assets
import Document from "../../assets/icons/Document.png";

const StockList = (props) => {
  return (
    <div className="stockListView">
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
          ? props.item.stbd_nm
          : null}
      </span>
      <span style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        {props && props.type === "theme"
          ? `+${props.item.stats.returns}%`
          : props.type === "rank"
          ? `${props.item.stock_code}`
          : null}
      </span>
    </div>
  );
};

export default StockList;
