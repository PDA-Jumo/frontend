import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import home1 from "../../assets/backgrounds/home1.png";
import home2 from "../../assets/backgrounds/home2.jpg";
import home3 from "../../assets/backgrounds/home3.jpg";
import home4 from "../../assets/backgrounds/home4.jpg";
import home5 from "../../assets/backgrounds/home5.jpg";
import "./layout.css";
import store from "../../store";
import LevelComponent from "../../components/redux/LevelComponent";

export default function HomeLayout() {
  const userLevel = useSelector((state) => state.user.user.level) || 0;
  const [backgroundImage, setBackgroundImage] = useState(home1);
  const dispatch = useDispatch();

  useEffect(() => {
    setBackgroundImage(selectBackgroundImage(userLevel));
  }, [userLevel]);

  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <LevelComponent />
      <Outlet />
    </div>
  );
}

const selectBackgroundImage = (level) => {
  if (level >= 0 && level <= 3) return home1;
  else if (level >= 4 && level <= 5) return home2;
  else if (level === 6) return home3;
  else if (level === 7) return home4;
  else return home5;
};
