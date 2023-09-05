import React from 'react';
import  './Description.css';
import { Link, useNavigate } from 'react-router-dom';
import Box from './Box'
import desc1 from '../../../img/desc-1.webp'
import desc2 from '../../../img/desc-2.webp'
import desc3 from '../../../img/desc-3.webp'
import desc4 from '../../../img/desc-4.webp'
import desc5 from '../../../img/desc-5.webp'
import desc6 from '../../../img/desc-6.webp'
import desc7 from '../../../img/desc-7.webp'
import desc8 from '../../../img/desc-8.webp'
import desc9 from '../../../img/desc-9.webp'


const Description = () => {

  const navigate = useNavigate()
   const navigateToAnotherComponent = () => {
    window.location.href = '/BookJoin';
     window.location.reload();
  };

  return (
    <div className='desc-container' id='desc'>
      <div className='desc-container-header'>
        <p>Organize your book club...and your bookshelves. All for free.</p>
      </div>

      <div className='desc-container-box-Container'>
            <Box  text='View all  your  '   text2='club members books posts' img={desc1}/>
           <Box  text='recommend your club members by'   text2=' creating your own books posts'  img={desc7}/>
            <Box  text='Rate each book you browse  it'  text2='and save ratings' img={desc5}/>
          </div>
      
<div className='desc-container-box-Container'>
     <Box  text='Select your reading status on'   text2='a specific book'  img={desc4}/>
      <Box  text='View your reading status '  text2='assigned to each book' img={desc2}/>
      <Box  text='Make review '  text2='on any post book' img={desc3}/>
      </div>

    <div className='desc-container-box-Container'>
      <Box  text='View books posts '  text2='related to a specific author' img={desc8}/>
     <Box  text=' Connect with others in the Booksclub '  text2='community through the club messages ' img={desc6}/>
      <Box  text='Create a meeting to send'  text2='invites and collect RSVPs' img={desc9}/>
      </div>

  <div> <a href='/BookJoin' onClick={navigateToAnotherComponent}><button>JOIN OUR BOOK CLUB</button></a></div>
    </div>
  )
}

export default Description
