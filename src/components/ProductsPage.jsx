import Productcart from "./Productcart";
import { fetchProducts } from "../components/products-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function ProductsPage({category}){
        let dispatch=useDispatch()
    let {items:data,error,loading}=useSelector((state)=>state.product)
  useEffect(() => {
         
        if(data.length===0){
        dispatch(fetchProducts());
          }
        
    }, []);
    let categoryData=[]
    if(category){
    categoryData=data.filter((item)=>item.category===category)
    }
    return (
        <div className="container prodcuts-container ">
            
            {categoryData.length!==0 && categoryData.map((item)=>
            <Productcart originalPrice={item.price} widthNotNedded  rating={item.rating.rate} name={item.title} image={item.image} id={item.id}></Productcart>
            )}
            {
            (!category && data.length!==0 )&& data.map((item)=>
            <Productcart originalPrice={item.price} widthNotNedded  rating={item.rating.rate} name={item.title} image={item.image} id={item.id}></Productcart>
            )}
        </div>
    )
}