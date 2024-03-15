import React from "react";

export default function CommunityList({ onSelectCommunity }) {
  const communities = [
    { id: 1, name: "Community 1" },
    { id: 2, name: "Community 2" },
  ]; // 예시 데이터

  return (
    <div style={{ backgroundColor: "yellow" }}>
      {communities.map((community) => (
        <div key={community.id} onClick={() => onSelectCommunity(community)}>
          {community.name}
        </div>
      ))}
    </div>
  );
}
