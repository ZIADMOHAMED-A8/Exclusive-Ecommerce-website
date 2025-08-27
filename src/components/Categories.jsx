import SectionHeader from "./SectionHeader";
import electronics from "../assets/electronics.svg";
import mensClothing from "../assets/men's clothing.svg";
import womensClothing from "../assets/women's clothing.svg";
import jewelery from "../assets/jewelery.svg";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./products-slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categoryImages = {
  electronics,
  mensclothing: mensClothing,
  womensclothing: womensClothing,
  jewelery,
};

export default function Categories() {
  let navigate=useNavigate()
  const dispatch = useDispatch();
  const { items: data, error, loading } = useSelector((state) => state.product);



  const uniqueCategories = [...new Set(data.map((item) => item.category))];

  return (
    <div className="container">
      <div className="productsCont">
        <SectionHeader  redtext={"Categories"} headertext={"Browse By Category"} />
        <div className="categories">
          {data[0] &&
            uniqueCategories.map((item) => {
              const editedStr = item.replace(/[\s']/g, "").toLowerCase();
              const imageSrc = categoryImages[editedStr];

              return (
                <div className="category" onClick={()=>{navigate(`/products/${item}`)}} key={item}>
                  <img src={imageSrc} alt={item} />
                  <p>{item}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
