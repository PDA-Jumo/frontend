import React from 'react';
import Rank from '../../assets/backgrounds/rank.png'
export default function RankLayout() {

return (
<div style={{backgroundImage: `url(${Rank})`, backgroundSize: 'contain',
  width: '100vw',
  height: '100vh',
  backgroundRepeat: 'no-repeat',
  backgroundPosition:'center'}}>
</div>

);
}
