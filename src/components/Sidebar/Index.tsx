import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Index() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="sidebar">
        <div className="logo"><Link to={'/'}>
          <img className='doglogo_sidebars' src="/asset/doglog.png" alt="" />
          </Link></div>
        <div className="sidebar-items">
          <ul>
            <li  style={pathname === "/" ? {background: "#8f6322", padding: '10px'} : {}}>
            <Link to={'/'}> Solana</Link></li>
           
            <li  style={pathname === "/boxer" ? {background: "#8f6322", padding: '10px'} : {}}>
              <Link to={'/boxer'}> Boxer </Link></li>
            <li style={pathname === "/docs" ? {background: "#8f6322", padding: '10px'} : {}}>
              <Link to={'/docs'}> Docs</Link></li>
           
            <li style={pathname === "/dexscr" ? {background: "#8f6322", padding: '10px'} : {}}>
               <Link to={'/dexscr'}>Dexscr</Link></li>
        
          </ul>
        </div>
        <div className="sidebar-footer">
          <div className="footerText">SOCIALS</div>
          <div className="linerst"></div>
          <div className="socialiconinline">
          <Link to={'/'}> <img src="/asset/tg.png" alt="" /></Link>
          <Link to={'/'}><img src="/asset/tw.png" alt="" /></Link>
          </div>
          
          <div className="footer-syrelink">
          <Link to={'/'}>Privacy Policy</Link>
          <Link to={'/'}>Terms & Conditions</Link>
          </div>
          </div>
      </div>
  )
}

export default Index