import React from "react";

export default function CommunityDetail({ community }) {
  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <div>CommunityDetail</div>
        <div>{community.name}</div>;
      </div>
    </>
  );
}
