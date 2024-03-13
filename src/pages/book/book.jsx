import React from "react";
import Book from "../../assets/backgrounds/Book.png";
export default function BookLayout() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img src={Book} style={{ width: "100%", height: "100%" }} />
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
