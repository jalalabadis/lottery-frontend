import Sidebar from "../../components/Sidebar/Index";
import Sidebarmobile from "../../components/Sidebar/Indexmobile";
import Navhad from "../../components/Navhad/Index";
import { claim, playSolsGame, playTokenGame } from "../../program/game-func"
import { useAnchorWallet } from "@solana/wallet-adapter-react"
import { connection } from "../../program/environment";
import { sendAndConfirmRawTransaction } from "@solana/web3.js";
import { toast } from "react-toastify";
import itemData from "../../Database/item.json";
import { useState } from "react";
import { GoChevronLeft } from "react-icons/go"; 
import Discount from "../../components/other/Discount";


const Index = () => {
  const [clitItem, setClimItem]=useState<{ id: string; img: string; name: string; color: string; coin: string; amount: string; } | null>(null);
  const [sidebarshow, setSidebarshow] = useState<Boolean>(false);
  const wallet = useAnchorWallet();

  const playgamesol = async (gameType: string) => {
    try {
      if (wallet) {

        const tx = await playSolsGame(wallet, gameType);
        if (!tx) {
          return
        }
        tx.feePayer = wallet.publicKey
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        console.log(tx)
        const signedTx = await wallet.signTransaction(tx)

        const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize(), {
          skipPreflight: true
        })

        console.log('signature', txId)
        toast.success("Sols Game Played")
      }
    } catch (e: any) {
      // const error = getErrorMessageFromFormattedString(e.message)
      console.log(e)
      toast.error(e.message)
    }
  }

  const playgametoken = async (gameType: string) => {
    try {
      if (wallet) {

        const tx = await playTokenGame(wallet, gameType);
        if (!tx) {
          return
        }
        tx.feePayer = wallet.publicKey
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

        console.log(tx)
        const signedTx = await wallet.signTransaction(tx)

        const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize(), {
          skipPreflight: true
        })

        console.log('signature', txId)
        toast.success("Tokens Game Played")
      }
    } catch (e: any) {
      // const error = getErrorMessageFromFormattedString(e.message)
      console.log(e)
      toast.error(e.message)
    }
  }


  const claimReward = async () => {
    try {
      if (wallet) {

        const tx = await claim(wallet);
        if (!tx) {
          return
        }
        tx.feePayer = wallet.publicKey
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

        console.log(tx)
        const signedTx = await wallet.signTransaction(tx)

        const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize(), {
          skipPreflight: true
        })

        console.log('signature', txId)
        toast.success("Reward Claimed")
      }
    } catch (e: any) {
      // const error = getErrorMessageFromFormattedString(e.message)
      console.log(e)
      toast.error(e.message)
    }
  }

 
  return (

    <div className="containers">
       <Sidebar />
       <Sidebarmobile status={sidebarshow}/>
      <div className="contentitexc">
      <Navhad onClick={()=>setSidebarshow(!sidebarshow)}/>
      
        {
  clitItem&& <GoChevronLeft 
  onClick={e=> setClimItem(null)}
  style={{position: 'absolute', color: 'white', fontSize: "40px", margin: '0px 25px 0px 25px '}} />
        }
        <div className="container-itestr">
        

      {
  !clitItem&& <img className="sub_titler_image" src="/asset/solbg.png" alt="" />}
      <div className="allitenmsdop_container">
      <div className="row">

{!clitItem && itemData.gamesol.map((item, index)=>{
  return(
        <div className="col" key={index}>
<div className="itemscards">
<div className="contentsites">
  <img src={item.img} alt="" />
  </div>
  <div className="contentactionsrty">
    <div className="imgtonunamunts">
     <button className="imgtonunamuntsbutton">{item.amount} <br /> SOL</button>
    </div>
    <button className="contentactionsrtybutton" onClick={e=> setClimItem(item)}></button>
  </div>
</div>
        </div> 
       )})
       
       }

      </div>


{/* Clim Item */}
{
  clitItem&&
  <Discount clitItem={clitItem} playgamesol={playgamesol} playgametoken={playgametoken} claimReward={claimReward} />
}
</div>
    </div>

      </div>
    </div>
  )
}

export default Index