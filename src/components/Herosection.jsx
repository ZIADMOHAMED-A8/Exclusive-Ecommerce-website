import { useEffect, useState } from "react"
import heroimage from "../assets/Frame 560.png"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "./products-slice"
import { Link, useNavigate } from "react-router-dom"
import { DiApple } from "react-icons/di";

export default function Herosection(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: data, loading, error } = useSelector((state) => state.product);
    const uniqueCategories = [...new Set(data.map(item => item.category))];

    return (
        <div className="hero container">
            <div className="contents">
                <ul>
                    {uniqueCategories.map((item) => (
                        <li 
                            key={item}
                            onClick={() => navigate(`/products/${item}`)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="w-full" >
                <div className="hero-banner">
                    <div className="hero-content">
                        <div className="hero-brand">
                            <DiApple color="white" size={52} />
                            <h2>Iphone 17 series</h2>
                        </div>
                        <div className="hero-offer">
                            <h1 className="hero-offer-bold">Up to 10%</h1>
                            <h1 className="hero-offer-bold">off voucher</h1>
                            <p  className="text-white pt-16    " > <Link className="text-white pb-16 " to='/products'>Shop Now</Link></p>
                        </div>
                    </div>
                    <img src={heroimage} alt="iPhone 17 Series" />
                </div>
            </div>
        </div>
    )
}