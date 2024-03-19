import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import home1 from "../../assets/backgrounds/home1.png";
import home2 from "../../assets/backgrounds/home2.jpg";
import home3 from "../../assets/backgrounds/home3.jpg";
import home4 from "../../assets/backgrounds/home4.jpg";
import home5 from "../../assets/backgrounds/home5.jpg";
import "./layout.css";
import store from "../../store";

export default function HomeLayout() {
  const userLevel = useSelector((state) => state.user.user.level) || 0;
  const [backgroundImage, setBackgroundImage] = useState(home1); // 초기 배경 이미지 설정

  // store.subscribe(() => {
  //   if (store.getState().action.indexOf("messanger") !== -1) {
  //     console.log("subscribed for counter actions", store.getState());
  //   }
  // });

  useEffect(() => {
    setBackgroundImage(selectBackgroundImage(userLevel)); // 사용자 레벨에 따른 배경 이미지 업데이트
  }, [userLevel]); // userLevel이 변경될 때마다 useEffect 내의 코드 실행

  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Outlet />
    </div>
  );
}

// 선택된 이미지를 반환하는 함수
const selectBackgroundImage = (level) => {
  if (level >= 0 && level <= 3) return home1;
  else if (level >= 4 && level <= 5) return home2;
  else if (level === 6) return home3;
  else if (level === 7) return home4;
  else return home5; // level이 8 이상인 경우를 처리
};
