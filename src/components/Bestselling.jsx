import { useDispatch, useSelector } from "react-redux";
import SectionHeader from "./SectionHeader";
import Styledlabel from "./Styledlabel";
import { fetchProducts } from "./products-slice";
import { useEffect } from "react";
import ProductsTemplate from "./ProductsTemplate";
useSelector,useDispatch,fetchProducts


export default function Bestsellingproducts(){
    let dispatch=useDispatch()
    let {items:data,error,loading}=useSelector((state)=>state.product)
 
    return (
        <div style={{marginTop:'100px'}} className="container">
       
        <ProductsTemplate redtext={'This month'} headertext={'Best selling products'} overflowExists data={data.slice(8,16)} error={error} loading={loading}></ProductsTemplate>
                    
        
        </div>
    )
}