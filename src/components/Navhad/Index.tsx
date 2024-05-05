import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { IoMenuOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';


interface ChildComponentProps {
  onClick: () => void; // Function that takes no arguments and returns void
}

function Index({ onClick }: ChildComponentProps) {
  const { publicKey } = useWallet();
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="navigation">
    <div className='hadertbrtyu'>
      <img src={pathname === "/"?"/asset/solbg.png":"/asset/boxer_head.png"} alt="" />
      </div>
    
    <div className="hadratuloginandmenu">
    <WalletMultiButton>{!publicKey&&"CONNECT"}</WalletMultiButton>
    <IoMenuOutline onClick={onClick}/>
    </div>
  </div>
  )
}

export default Index