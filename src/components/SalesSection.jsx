import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./products-slice";

import { useEffect } from "react";
import ProductsTemplate from "./ProductsTemplate";
import Viewproductsbutton from "./Viewproductsbutton";
export default function SalesSection() {
    let dispatch = useDispatch()
    let { items: data, error, loading } = useSelector((state) => state.product)

    let useddata = data.slice(0, 7)
    return (        
        <div  className="container">
            
            <ProductsTemplate overflowExists={true} redtext={`Today's`} headertext={'Flash sales'} timerrequired={true} data={useddata} error={error} loading={loading}></ProductsTemplate>
            
        </div>
    )

}
