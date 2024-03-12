import React from 'react';
import quiz from '../../assets/backgrounds/quiz.png'
export default function QuizLayout() {

return (
<div style={{backgroundImage: `url(${quiz})`, backgroundSize: 'contain',
  width: '100vw',
  height: '100vh',
  backgroundRepeat: 'no-repeat',
  backgroundPosition:'center'}}>
</div>

);
}
