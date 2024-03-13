import React from "react";
import Community from "../../assets/backgrounds/Community.png";
export default function CommunityLayout() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img src={Community} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 100,
        }}
      >
        여기 작성
      </div>
    </div>
  );
}
