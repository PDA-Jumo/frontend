import React from 'react';
import startPage from '../../assets/backgrounds/startPage.png'
import hat from '../../assets/backgrounds/hat.png'
export default function MainLayout() {

return (
  <div class ='background-style'>
  <img src={startPage} style={{ width: "100%", height: "100%" }} />
  <div
    style={{
      position: "absolute",
      top: "50%",
      left:"50%",
      transform: "translate(-50%,-50%)"
    }}
  >
    <img src={hat} style={{width:"900px"}}></img>
  </div>
</div>


);
}

{/* <div style={{backgroundImage: `url(${startPage})`,backgroundSize: 'contain',
  width: '100vw',
  height: '100vh',
  overflow:"hidden",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  backgroundRepeat: 'no-repeat',
  backgroundPosition:'center'}}>
</div> */}
