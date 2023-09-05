import React from 'react'
import './About.css'
import LeftNavbar from './LeftNavbar'
import sharingImg from '../../../img/magic-book.webp'

const About = () => {
  return (
    <div className='main-about-conatner'>
      <div className='nav-about'>
          <LeftNavbar/>
      </div>
  
   {/* ////////////////////////////////////////////////////////////////////////////// */}     


    <div className='about-content'>
      <div className='about-content-title'>
        <p>About The Magic Book Club</p>
      </div>

  <div className='about-content-img'>
    <img src={sharingImg} alt='sharing'/>
  </div>

  <div className='about-content-club-name'>
    <p>Club Name:The Magic Book Club</p>
    <div className='about-content-club-desc'>
       <h5>Short Description</h5>
       <div className='about-content-club-text'>
         <p>The Magic Book Club allow those people that love reading Books
            to see books posts by other people. The user  can rate,make a review,select 
           a reading status on a specific book ,also he can post a book ,
            check his  status  reading on a specific  book , post messages 
            and he can post a meeting on a specific book.
         </p>
       </div>
    </div>
   
  </div>
       
      </div>
      
    </div>
  )
}

export default About