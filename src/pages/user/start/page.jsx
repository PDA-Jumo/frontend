import React from "react";
import "./page.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Hat from "../../../assets/backgrounds/hat.png";
import { useState } from "react";

export default function MainPage() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img src={Hat} style={{ width: "900px" }} />
      <div
        className="startButton"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? "GO!" : "시작하기"}
      </div>
    </div>
  );
}
