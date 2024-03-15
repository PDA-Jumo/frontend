import React from "react";

export default function HotCommunityList({ onSelectCommunity }) {
  const hotCommunities = [
    { id: 1, name: "Hot Community 1" },
    { id: 2, name: "Hot Community 2" },
  ]; // 예시 데이터

  return (
    <>
      <div style={{ backgroundColor: "gray" }}>
        <div>HotCommunityList</div>'
        {hotCommunities.map((community) => (
          <div key={community.id} onClick={() => onSelectCommunity(community)}>
            {community.name}
          </div>
        ))}
      </div>
    </>
  );
}
