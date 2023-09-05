import React from 'react'
import IntroImg from '../../../img/intro-img.webp'
import { Link, useNavigate } from 'react-router-dom';
import './Intro.css'

const Intro = () => {

  const navigate = useNavigate()
  const navigateToAnotherComponent = () => {
    window.location.href = '/BookJoin';
     window.location.reload();
  };
  return (
    <div className='intro-container' id='intro'>
      <div className='intro-container-left'>

      <img src={IntroImg}  alt='intro'/>
      </div>

        <div className='intro-container-right'>
          <h1>Building community through books <br/>
          <span>Track your books, Receive recommendations, and browse books club</span></h1>
         
          <button className='join'> <a href='/BookJoin' onClick={navigateToAnotherComponent}>JOIN OUR BOOK CLUB</a></button>

        
      </div>
      
      
    </div>
  )
}

export default Intro
