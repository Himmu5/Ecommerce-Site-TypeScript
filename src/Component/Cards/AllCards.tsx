import React from "react";
import { memo ,FC} from "react";
import ContantCard from "./ContantCard";
import {Product} from '../CommenType/Types'

type AllCardstype={
  data?:Product[]
}

 const AllCards:FC<AllCardstype>=({data})=> {
 
  
  return (
    <>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
     
      {
      data?.map(function(item){
        return <ContantCard key={item.id} data={item}/>
      })
      }
    </div>
    </>
  );
}

export default memo(AllCards);