import React from 'react'
import './Box.css'

const Box = ({image,text1,text2}) => {
  return (
    <div className='box'>
        
    <h5>{text1}</h5>
    
    <div className='box-paragraph'>
    <p>"{text2}"</p>
    </div>
    <img src={image}  alt='img'/>
      
    </div>
  )
}

export default Box
