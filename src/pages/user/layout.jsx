import React from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="background-image">
      <Outlet />
    </div>
  );
}
