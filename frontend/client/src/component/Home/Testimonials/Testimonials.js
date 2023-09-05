import React from 'react'
import './Testimonials.css'
import Box from './Box'
import tes1 from '../../../img/tes-1.webp'
import tes2 from '../../../img/tes-2.webp'
import tes3 from '../../../img/tes-3.webp'
import tes4 from '../../../img/tes-4.webp'

const Testimonials = () => {
  return (
    <div className='tes-container' id='testimonials'>
      <div className='tes-container-header'>
        <p>Testimonials</p>
        </div>

      <div className='tes-container-header-box'>
        <Box image={tes1} text1='HAPPIER MEMBERS' text2='Our club started off as an experiment for me to bring together all the incredible women in my life together under a common interest (books), but it is turned into much more than that! Now after two years, we have come together as one group of friends and confidants who support, share, and challenge each other on everything from literature to love loss to life in general' />
      <Box image={tes2} text1='SAVES TIME'  text2='What has made it easier for our book club with your platform? Almost everything. From being able to add books with a visual aspect, which has helped cut down on the number of times members can not find the right book, to being able to have members put books on shelves that they would like our group to read, to being able to have all our information in one easy resource. Thank you'/>
      </div>


      <div className='tes-container-header-box'>
        <Box image={tes3} text1='FEWER EMAILS'  text2='My first book club meeting went well and was ah-mazing. Thanks so much for following up. Bookclubs was great in facilitating the meeting set up with the reminders and the attendees loved it as much as I did. Thanks again for everything.' />
      <Box image={tes4} text1='SAVES TIME'  text2='So many emails before Bookclubs! Now I can easily manage three book clubs, not just one, and it is so fun and simple. Best service ever'/>
      </div>
     
    </div>
  )
}

export default Testimonials
