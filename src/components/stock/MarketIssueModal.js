import React from "react";

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
        <span style={{ fontSize: "28px" }}>
          {props.issue.content.split("『")[1].split("』")[0]}
        </span>
        <div
          style={{
            height: "100%",
            width: "90%",
            paddingBlock: "16px",
            boxSizing: "border-box",
            overflowY: "scroll",
            display: "flex",
            alignItems: "start",
          }}
        >
          <span style={{ whiteSpace: "pre-line" }}>
            {props.issue.content
              .substring(props.issue.content.indexOf("』") + 1)
              .replace("&nbsp;", "")}
          </span>
        </div>
      </div>
    </div>
  );
}
