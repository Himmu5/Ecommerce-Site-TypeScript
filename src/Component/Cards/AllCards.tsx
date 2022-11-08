import React from "react";
import { memo } from "react";
import ContantCard from "./ContantCard";


 function AllCards({data}) {
 
  
  return (
    <>
    
    <div className="grid sm:grid-cols-3 gap-9  sm:p-20 sm:pt-5 sm:pb-5 mt-5 mb-5">
     
      {
      data.map(function(item){
        return <ContantCard key={item.id} data={item}/>
      })
      }
    </div>
    </>
  );
}

export default memo(AllCards);