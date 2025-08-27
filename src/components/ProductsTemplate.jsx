


import Productcart from "./Productcart";

import SectionHeader from "./SectionHeader";
import {  useRef } from "react";
import Viewproductsbutton from "./Viewproductsbutton";
import { useSelector } from "react-redux";
export default function ProductsTemplate({data,error,loading,redtext,headertext,timerrequired,overflowExists,id}){

     let productsref=useRef()
    

    return (
        <div className="productsCont ">
        <SectionHeader productsref={productsref} overflowExists={overflowExists} redtext={redtext} headertext={headertext} timerrequired={timerrequired}></SectionHeader>
        <div ref={productsref} className="products">
            
                    {data.map((item)=>
                            item.id===id ?
                                 null:
                                  <Productcart id={item.id}  originalPrice={Math.floor(item.price+20)} DiscountedPrice={item.price} count={item.count} rating={item.rating.rate} name={item.title} image={item.image}></Productcart> 
                            
                                

                                  
        )}
        <Viewproductsbutton  classname="viewbutton" text={'View All Products'}></Viewproductsbutton>
        </div>
        </div>
    )

}
