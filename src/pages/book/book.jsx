import React from 'react';
import Book from '../../assets/backgrounds/Book.png'
export default function BookLayout() {

return (
<div style={{backgroundImage: `url(${Book})`, backgroundSize: 'contain',
  width: '100vw',
  height: '100vh',
  backgroundRepeat: 'no-repeat',
  backgroundPosition:'center'}}>
</div>

);
}
