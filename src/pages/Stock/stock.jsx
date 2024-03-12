import React from 'react';
import Stock from '../../assets/backgrounds/Stock.png'
export default function StockLayout() {

return (
<div style={{backgroundImage: `url(${Stock})`, backgroundSize: 'contain',
  width: '100vw',
  height: '100vh',
  backgroundRepeat: 'no-repeat',
  backgroundPosition:'center'}}>
</div>

);
}
