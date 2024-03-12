import React from 'react';
import startPage from '../../assets/backgrounds/startPage.png'
export default function MainLayout() {

return (
<div style={{backgroundImage: `url(${startPage})`,backgroundSize: 'contain',
  width: '100vw',
  height: '100vh',
  overflow:"hidden",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  backgroundRepeat: 'no-repeat',
  backgroundPosition:'center'}}>
</div>


);
}
