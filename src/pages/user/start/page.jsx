import React from "react";
import "./page.css";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <button className="start-button" onClick={handleClick}>
      시작하기
    </button>
  );
}
