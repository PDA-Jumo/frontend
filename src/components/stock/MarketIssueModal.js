import React from "react";

//assets
import cheese from "../../assets/icons/cheese.png";

export default function MarketIssueModal(props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 3,
      }}
      onClick={() => props.setIsModal(false)}
    >
      <div
        style={{
          width: "50%",
          height: "60%",
          borderRadius: "16px",
          backgroundColor: "white",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          style={{ alignSelf: "flex-end", fontSize: "24px", cursor: "pointer" }}
          onClick={() => props.setIsModal(false)}
        >
          X
        </span>
        <div
          style={{
            fontSize: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
        >
          <img src={cheese} style={{ width: "32px", marginRight: "8px" }} />
          <span
            style={{
              borderBottom: "8px double #ffe27a",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {props.issue.content.split("『")[1].split("』")[0]}
          </span>
        </div>

        <div
          style={{
            height: "100%",
            width: "90%",
            marginBlock: "16px",
            boxSizing: "border-box",
            overflowY: "scroll",
            display: "flex",
            alignItems: "start",
          }}
        >
          <span
            style={{
              whiteSpace: "pre-line",
              color: "#62616D",
              lineHeight: "2",
            }}
          >
            {props.issue.content
              .substring(props.issue.content.indexOf("』") + 1)
              .replace("&nbsp;", "")
              .trim()}
          </span>
        </div>
      </div>
    </div>
  );
}
