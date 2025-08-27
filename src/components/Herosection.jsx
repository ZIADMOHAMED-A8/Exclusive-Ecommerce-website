import { useEffect, useState } from "react"
import heroimage from "../assets/Frame 560.png"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "./products-slice"
import { useNavigate } from "react-router-dom"

export default function Herosection(){
    let navigate=useNavigate()
      const dispatch = useDispatch();

  const { items: data, loading, error } = useSelector((state) => state.product);


 
    const uniqueCategories = [...new Set(data.map(item => item.category))];


    return (
        <div className="hero container">
            <div className="contents">
                <ul>
                    {/* <li>Women's Fashion</li>
                    <li>Men's Fashion</li>
                    <li>Electroniecs</li>
                    <li>Home&life style</li>
                    <li>Medicine</li>
                    <li>Sports&outdoor</li>
                    <li>Baby's & toys</li>
                    <li>Pets</li>
                    <li>Healthy &beauty</li> */}
                    {uniqueCategories.map((item)=><li style={{cursor:'pointer'}} onClick={()=>{navigate(`/products/${item}`)}} key={item}>{item}</li>)}

                </ul>

            </div>
            <div className="hero-image">
                <img src={heroimage}></img>
            </div>
        </div>
    )
}