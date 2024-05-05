import React, { useState } from 'react';
import Sidebarmobile from "../../components/Sidebar/Indexmobile";
import Sidebar from "../../components/Sidebar/Index";
import Navhad from "../../components/Navhad/Index";

function Instruction() {
  const [sidebarshow, setSidebarshow] = useState<Boolean>(false);

  return (
    <div className="containers">
       <Sidebar/>
       <Sidebarmobile status={sidebarshow}/>
      <div className="contentitexc">
       <Navhad onClick={()=>setSidebarshow(!sidebarshow)}/>
    <div style={{display:"flex", justifyContent: "center", alignItems: "center", height: "30vh", fontSize: "24px"}}>
 <p style={{color: "white"}}>How To play......</p>
 </div>
    </div></div>
  )
}

export default Instruction