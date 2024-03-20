import React, { useState } from 'react';
import Community from '../../assets/backgrounds/Community.png';
import CommunityList from '../../components/community/CommunityList';
import HotCommunityList from '../../components/community/HotCommunityList';
import CommunityDetail from '../../components/community/CommunityDetail';

export default function CommunityLayout() {
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const backToHotCommunity = () => {
    setSelectedCommunity(null);
  };

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
          top: 30,
          left: 100,
        }}
      >
        <div style={{ display: 'flex' }}> {/* 여기에 margin 추가 */}
          <div>
            <CommunityList onSelectCommunity={setSelectedCommunity} />
          </div>
          {selectedCommunity ? (
            <div>
              <CommunityDetail community={selectedCommunity} onBack={backToHotCommunity} />
            </div>
          ) : (
            <div>
              <HotCommunityList onSelectCommunity={setSelectedCommunity} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
