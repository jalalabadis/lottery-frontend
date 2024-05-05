import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar/Index";
import Sidebarmobile from "../../components/Sidebar/Indexmobile";
import Navhad from "../../components/Navhad/Index";


function Docs() {
  const [sidebarshow, setSidebarshow] = useState<Boolean>(false);

  return (
    <div className="containers">
       <Sidebar/>
       <Sidebarmobile status={sidebarshow}/>
      <div className="contentitexc">
       <Navhad onClick={()=>setSidebarshow(!sidebarshow)}/>
    <div style={{display:"flex", justifyContent: "center", alignItems: "center", height: "30vh", fontSize: "24px"}}>
 <p style={{color: "white"}}>Document......</p>
 </div>
    </div></div>
  )
}

export default Docs