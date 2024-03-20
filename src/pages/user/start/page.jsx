import React from "react";
import "./page.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MainPage() {
  const navigate = useNavigate();
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
    <button className="start-button" onClick={handleClick}>
      시작하기
    </button>
  );
}
