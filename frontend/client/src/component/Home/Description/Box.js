import React from 'react'
import './Box.css'

const Box = ({img,text,text2}) => {
  return (
    <div className='box-container'>
        <img src={img} alt='img'/>
        <p>
          {text}
           <br/>
           {text2}
        </p>
      
    </div>
  )
}

export default Box
