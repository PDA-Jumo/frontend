import React from "react";
import "./main.css";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="background-image">
      <Outlet />
    </div>
  );
}
