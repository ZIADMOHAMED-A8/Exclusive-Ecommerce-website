import { useDispatch, useSelector } from "react-redux"
import Bestsellingproducts from "./Bestselling"
import BigsizeImage from "./BigsizeImage"
import Categories from "./Categories"
import Expolreproducts from "./Expolreproducts"
import Herosection from "./Herosection"
import Newarrival from "./NewArrival"
import SalesSection from "./Salessection"
import Services from "./Services"
import LoadingSpinner from "./LoadingSpinner"
import { useEffect } from "react"
import { fetchProducts } from "./products-slice"

export default function Homepage(){
    let dispatch=useDispatch()  
    let {items:data,error,loading}=useSelector((state)=>state.product)
    useEffect(() => {
    
      
      dispatch(fetchProducts());
    }
  , [dispatch]);


return (
    <>
        {loading ? <LoadingSpinner></LoadingSpinner> : 
        
        <>
      <Herosection></Herosection>
      <SalesSection></SalesSection>
      <Categories></Categories>
      <Bestsellingproducts></Bestsellingproducts>
      <BigsizeImage></BigsizeImage>
      <Expolreproducts></Expolreproducts>
      <Newarrival></Newarrival>
      <Services></Services>
      </>
}
    </>

    )
    
}