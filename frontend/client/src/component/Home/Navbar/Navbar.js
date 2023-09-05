import React, {useState} from 'react'
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import {RiMenu3Line,RiCloseLine,RiArrowDropDownLine} from 'react-icons/ri'
import {TbMessageCircle2Filled} from 'react-icons/tb'
import {MdNotifications} from 'react-icons/md'

import booklogo from '../../../img/booklogo.svg'
import {useContext} from 'react'
import { AuthContext } from "../../../context/authContext";

const Navbar = () => {
  const [toggleMenu, setToggleMenu]=useState(false);
  const { currentUser,logout } = useContext(AuthContext);
   const [settings, setSettings]=useState(false);
    const [homelist, setHomelist]=useState(false);
  const navigate = useNavigate()
  
  const navigateToAnotherComponent = () => {
    window.location.href = '/BookJoin';
     window.location.reload();
  };

  
  const navigateToAnotherComponent2 = () => {
    window.location.href = '/BookShelf';
  };


  const directHome=()=>{
    logout();
   navigate('/');
  }

const handleDropdownLeave=(()=>{
  setSettings(false);
  setHomelist(false);
})

  return(
    <div className='nav-component'  onMouseLeave={handleDropdownLeave} >
      <div className='nav-component-links'>
        <div className='nav-component-links-logoText'>
         <img  src={booklogo} alt='logo'/>
        </div>
        <div className='nav-component-links-items'>
         <ul>
        <div className='home-drop-list'>
          <div> <li>
          <Link to='/'>BOOK CLUB</Link> 
        </li>
        </div>
      <div onClick={()=>setHomelist(!homelist)}><RiArrowDropDownLine  size={27} color='#e4301c'  cursor='pointer' /></div>
        </div>
         <li>
        <a href='/BookJoin' onClick={navigateToAnotherComponent}>JOIN OUR CLUB</a>
        </li>
        <li>
          <a href='/BookShelf' onClick={navigateToAnotherComponent2}>OUR BOOKSHELF</a>
        </li>
        <li>
          <Link to='/Appchat'>OUR CHAT APP</Link>
  </li>
         </ul>
</div>
{ homelist &&<div className='home-list-one'>
           <p><a href='#intro'onClick={()=>setToggleMenu(false)}>HOME</a></p>
           <p><a href='#desc' onClick={()=>setToggleMenu(false)}>FEATURES</a></p>
            <p><a href='#testimonials' onClick={()=>setToggleMenu(false)}>TESTIMONIALS</a></p>
            <p><a href='#footer' onClick={()=>setToggleMenu(false)}>MORE</a></p>
            
              
</div>
}
</div>

 {currentUser?<div className='acount  hide'>
  <div className='acount-content'>
  <div className='account-content-usernme-text'><span>{currentUser?.name}</span> <p><RiArrowDropDownLine  size={40} color='#e4301c' onClick={()=>setSettings(!settings)} cursor='pointer'/></p></div>
  <div className='acount-content-icon'><TbMessageCircle2Filled size={35} cursor='pointer'/></div>
   <div className='acount-content-icon'><MdNotifications size={35} cursor='pointer'/></div>
   </div>
   
   
{settings &&<div className='acount-list'>
  
  {/*<p> <Link>MY  PROFILE</Link></p>*/}
  <p><Link to='/EditProfile'>SETTINGS</Link></p>
    <p onClick={directHome}><Link >SIGN OUT</Link></p>
</div>
}
   
  </div>:<div className='nav-component-signIn'>
 <h4> <Link to='/login'>SIGN IN</Link></h4>
 <button type='button'> <Link to='/register'>SIGN UP</Link></button>
</div> }

 <div className='open-btn'><RiMenu3Line size={27}  onClick={()=>setToggleMenu(true)}/></div>

{toggleMenu && <div className='menu-container  scale-up-center'>
<div className='inner-container'>

<div className='menu-container-top'>
    <div className='menu-container-logo'><Link  to='/' onClick={()=>(setToggleMenu(false))}><img  src={booklogo} alt='logo'/></Link> </div>
  <div className='close-btn'><RiCloseLine size={40}  color='#5b5e5f' onClick={()=>setToggleMenu(false)}/></div>
</div>

<div className='menu-containerbottom'>

  <ul>
        <div className='home-drop-list'>
          <div> <li>
          <Link to='/' onClick={()=>setToggleMenu(false)}>BOOK CLUB </Link> 
        </li>
        {homelist && <div className='home-list-two'>
           <p><a href='#intro'onClick={()=>setToggleMenu(false)}>HOME</a></p>
           <p><a href='#desc' onClick={()=>setToggleMenu(false)}>FEATURES</a></p>
            <p><a href='#testimonials' onClick={()=>setToggleMenu(false)}>TESTIMONIALS</a></p>
            <p><a href='#footer' onClick={()=>setToggleMenu(false)}>MORE</a></p>
          </div>}
        </div>
      <div><RiArrowDropDownLine  size={27} color='#e4301c'  cursor='pointer' onClick={()=>setHomelist(!homelist)}/></div>
        </div>
         <li>
          <Link to="/BookJoin" onClick={()=>setToggleMenu(false)}>JOIN OUR CLUB</Link>
        </li>
        <li>
          <Link to='/BookShelf'onClick={()=>setToggleMenu(false)}>OUR BOOKSHELF</Link>
        </li>
        <li>
          <Link to='/books' onClick={()=>setToggleMenu(false)}>OUR CHAT APP</Link>
        </li>
         </ul>
{currentUser?<div className='acount'>
  <div className='acount-content'>
  <div className='account-content-usernme-text'><span>{currentUser?.name}</span> <p><RiArrowDropDownLine  size={40} color='#e4301c' onClick={()=>setSettings(!settings)} cursor='pointer'/></p></div>
  {settings &&<div className='acount-list-change'>
  
 {/*<p> <Link>MY  PROFILE</Link></p>*/}
  <p><Link to='/EditProfile'>SETTINGS</Link></p>
  <p><Link onClick={directHome}>SIGN OUT</Link></p>
</div>
}

<div className='acount-content-icon'><TbMessageCircle2Filled size={35} cursor='pointer' color='#3b3b3b'/><p>DIRECT MESSAGES</p></div>
   <div className='acount-content-icon space'><MdNotifications size={35} cursor='pointer' color='#3b3b3b'/><p>NOTIFICATIONS</p> </div> 
   
   </div>
   

  </div>
:<div className='toggle-button'><h4> <Link to='/login' onClick={()=>setToggleMenu(false)}>SIGN IN</Link></h4>
 <button type='button' onClick={()=>setToggleMenu(false)}> <Link to='/register'>SIGN UP</Link></button></div>}


</div>
</div>
  </div>}




    </div>
  )
}

export default Navbar
