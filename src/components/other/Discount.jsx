import React from 'react'

function Discount({clitItem, playgamesol, playgametoken, claimReward}) {
  return (
    <div className="singleclimers">
  <div className="itemscards" style={{display: 'flex'}}>
<div className="contentsites">
  <img src={clitItem.img} alt="" />
 
  <div className="contentactionsrty" style={{justifyContent: 'center'}}>

    <button className="contentactionsrtybutton" onClick={()=>{clitItem.name==="STARTER"?
                          playgamesol(clitItem.id):
                          playgametoken(clitItem.id)}}></button>
  </div> </div>

<div className="tutorialclimcontent">
  <button className="tutorialclimcontentbutton">{clitItem.amount} <br /> SOL</button>

  <div className="contentactionsrty" style={{justifyContent: 'center'}}>
<button className="tutorialclimcontentbuttonclose" onClick={claimReward}></button>
</div>
</div>
</div>



<div className="amountrcdtlist mt-5">
  <div className="amountrycad">
    <div className="soltyu_lkopuys">90%</div>
  </div>
  <div className="amountrycad">
  <div className="soltyu_lkopuys">6% </div>
  </div>
  <div className="amountrycad">
  <div className="soltyu_lkopuys">2% </div>
  </div>
  <div className="amountrycad">
  <div className="soltyu_lkopuys">7% </div>
  </div>
  <div className="amountrycad">
  <div className="soltyu_lkopuys">1% </div>
  </div>
</div>


<div className="amountrcdtlist">
  <div className="amountrycad">
    <div className="soltyu_lkCard">0.01 <br /> <span style={{color: '#c8adff'}}>SOL</span></div>
  </div>
  <div className="amountrycad">
  <div className="soltyu_lkCard">0.1 <br /> <span style={{color: '#c8adff'}}>SOL</span></div>
  </div>
  <div className="amountrycad">
  <div className="soltyu_lkCard">0.25 <br /> <span style={{color: '#c8adff'}}>SOL</span></div>
  </div>
  <div className="amountrycad">
  <div className="soltyu_lkCard">0.5 <br /> <span style={{color: '#c8adff'}}>SOL</span></div>
  </div>
  <div className="amountrycad">
  <div className="soltyu_lkCard">1 <br /> <span style={{color: '#c8adff'}}>SOL</span></div>
  </div>
</div>
</div>
  )
}

export default Discount