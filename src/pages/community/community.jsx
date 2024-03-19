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
    <div style={{
      backgroundImage: `url(${Community})`,
      backgroundSize: 'contain',
      width: '100vw',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'

    }}>

      <div style={{ display: 'flex' }}>
        <CommunityList onSelectCommunity={setSelectedCommunity} />
        {selectedCommunity ? (
          <CommunityDetail community={selectedCommunity} />
        ) : (
          <HotCommunityList onSelectCommunity={setSelectedCommunity} />
        )}
      </div>

    </div>

  );
}
