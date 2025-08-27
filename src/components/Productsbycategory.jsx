import Productpage from "./Productpage";
import { useParams } from "react-router-dom";
import ProductsPage from "./ProductsPage";
export default function ProductsByCategory(){
    let para=useParams()
    return (
        <ProductsPage category={para.productsCategory}></ProductsPage>
    )
}