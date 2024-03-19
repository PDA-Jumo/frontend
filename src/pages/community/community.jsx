import React, { useState } from 'react';
import Community from '../../assets/backgrounds/Community.png'
import Chat from '../../components/community/Chat';
import CommunityList from '../../components/community/CommunityList';
import HotCommunityList from '../../components/community/HotCommunityList';
import CommunityDetail from '../../components/community/CommunityDetail';

import './community.css';
export default function CommunityLayout() {
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img src={Community} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 100,
        }}
      >
        <div style={{ display: 'flex' }}>
          <CommunityList onSelectCommunity={setSelectedCommunity} />
          {selectedCommunity ? (
            <CommunityDetail community={selectedCommunity} />
          ) : (
            <HotCommunityList onSelectCommunity={setSelectedCommunity} />
          )}
        </div>
      </div>
    </div>
  );
}
