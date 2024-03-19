import React from "react";
import "./community.css";

export default function CommunityDetail({ community }) {
  return (
    <>
      <div className="communityBox">
        <div>CommunityDetail</div>
        <div>{community.name}</div>;
      </div>
    </>
  );
}
