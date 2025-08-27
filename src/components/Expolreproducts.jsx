import { useDispatch, useSelector } from "react-redux";
import ProductsTemplate from "./ProductsTemplate";
import { fetchProducts } from "./products-slice";
import { useEffect } from "react";
  
export default function Expolreproducts(){
    let dispatch=useDispatch()
    let {items:data,error,loading}=useSelector((state)=>state.product)

    return (
       <div className="container">
            <ProductsTemplate redtext={'Our Products'} headertext={'Explore Our Products'}  data={data.slice(8,16)} error={error} loading={loading}></ProductsTemplate>
       </div>
    )
}