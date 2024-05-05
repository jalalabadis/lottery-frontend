import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface IndexMobileProps {
  status: Boolean;
}
function Indexmobile({status}:IndexMobileProps) {
  const location = useLocation();
  const { pathname } = location;
  const { publicKey } = useWallet();
  return (
    <>{status&&
    <div className="sidebar-mobile">

       
        <div className="sidebar-items" style={{top: "0"}}>
        <WalletMultiButton>{!publicKey&&"Connect"}</WalletMultiButton>
          <ul>

            <li  style={pathname === "/" ? {background: "rgb(52, 57, 75)"} : {}}>
              <img src="/asset/box1.png" alt="" />
            <Link to={'/'}> Chests</Link></li>
            <div className="linerst"></div>
            <li  style={pathname === "/docs" ? {background: "rgb(52, 57, 75)"} : {}}>
              <img src="/asset/box1.png" alt="" /><Link to={'/docs'}> Docs </Link></li>
            <li style={pathname === "/instruction" ? {background: "rgb(52, 57, 75)"} : {}}>
              <img src="/asset/box1.png" alt="" /><Link to={'/instruction'}> How to play</Link></li>
            <div className="linerst"></div>
            <li style={pathname === "/dexscreener" ? {background: "rgb(52, 57, 75)"} : {}}>
              <img src="/asset/box1.png" alt="" /> <Link to={'/dexscreener'}>Dexscreener</Link></li>
            <li style={pathname === "/staking" ? {background: "rgb(52, 57, 75)"} : {}}>
              <img src="/asset/box1.png" alt="" /><Link to={'/staking'}> Staking</Link></li>
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
      </div>}
      </>
  )
}

export default Indexmobile