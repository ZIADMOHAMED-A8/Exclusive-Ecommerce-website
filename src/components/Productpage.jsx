import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchProducts } from "./products-slice"
import { Stars } from "./Productcart"
import Colorcircle from "./Colorcircle"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import ProductsTemplate from "./ProductsTemplate"
import {addItemWithQuantity} from '../components/cart-slice'
import Size from "./Size"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCheckLoggedInQuery } from "../../auth/authApiSlice"

export default function Productpage() {
    let Navigate=useNavigate()
    let dispatch = useDispatch()
    let params = useParams()
    let [quantity, setquantity] = useState(1)
    let [activeColor,setactiveColor]=useState(null)
     let [activeSize,setactiveSize]=useState(null)
      let localtoken=useSelector((state)=>state.auth.loogedin);

    console.log(activeColor)
    let { items: data, error, loading } = useSelector((state) => state.product)
    useEffect(() => {
        if (data.length === 0) {
            console.log('rt')
            dispatch(fetchProducts());
        }
    }, [dispatch]);

    let productIndex = -1
    console.log('data', data)
    console.log(params.productId)
    data.forEach((element, index) => {
        if (element.id === +(params.productId)) {
            productIndex = index
        }
    });

    console.log(data)


    return (
        <div style={{ marginTop: '100px' }} className="product-container">


            {data.length !== 0 && < div className="productoverview">
                {/* <div className="mini-images">
                    <img src={data[productIndex].image}></img>
                    <img src={data[productIndex].image}></img>
                    <img src={data[productIndex].image}></img>
                    <img src={data[productIndex].image}></img>

                </div> */}
                <div className="overview-image">
                    <img src={data[productIndex].image}></img>

                </div>
                <div className="product-details">
                    <h3 className="text-2xl font-bold">{data[productIndex].title}</h3>
                    <div className="rating-div"><p>{Stars(4)}</p>({(data[productIndex].rating.count)} Reviews)</div>
                    <p className="product-price">${data[productIndex].price}</p>
                    <div className="product-desc" >{data[productIndex].description}</div>
                    <hr />
                    <div className="colors-div"><p className="colors-text">Colors:</p><div className="colors">  {['red', 'blue', 'white'].map((color) => (
    <Colorcircle
      key={color}
      color={color}
      onClick={() => setactiveColor(color)}
      className={activeColor === color ? 'active' : ''}
    />
  ))} </div> </div>
                    {(data[productIndex].category === `men's clothing` || data[productIndex].category === `women's clothing`) &&
                        <div className="colors-div"><p className="colors-text">Size:</p><div className="colors"> {['xs','s','m','l','xl'].map((size)=><Size className={activeSize===size ? 'active' : ''} onClick={()=>setactiveSize(size)} size={size}></Size>)} </div> </div>
                    }
                    <div className="controllets-layout"> <div className="quantity-field">
                        <p className="minus-icon" onClick={() => { if (quantity > 1) { setquantity((prev) => prev - 1) } }}>-</p> 
                        <p className="quantity">{quantity}</p> 
                        <p onClick={() => { { setquantity((prev) => prev + 1) } }} className="plus-icon">+</p> </div>
                            {data.length!==0 && <button  
  className="formalbutton"  
  onClick={localtoken ? ()=>{
    dispatch(addItemWithQuantity({
      newItem: data[productIndex],
      quantity: quantity
    }));
    toast("Added to cart", {
  position: "bottom-right",
  autoClose: 3000,
      className:"toast-success"
    });
  } : ()=>{
       dispatch(addItemWithQuantity({
      newItem: data[productIndex],
      quantity: quantity
    }));
    Navigate(`/auth/?mode=login`)
    console.log(token)
                   
  }}
> Add to cart</button>}
                                <FontAwesomeIcon
                                                    icon={regularHeart}
                                    size={'2x'}           
                                    style={{border:'1px solid black',padding:'11px 10px',borderRadius:'4px',cursor:'pointer'}} // لتضيف ستايل خارجي لو عايز
                                    aria-hidden="false"
                                    role="img"
                                />
                         </div>
                         <div className="feats">
                            <div className="feat">
                                <FontAwesomeIcon icon={faTruckFast} style={{fontSize:'36px',color:'black'}} />
                                <div className="feat-text">
                                    <h3>Free Delivery</h3>
                                    <p>Enter your postal code for Delivery Availability</p>

                                </div>

                            </div>
                            <hr></hr>
                            <div className="feat">
                                <FontAwesomeIcon icon={faRotateLeft} style={{fontSize:'36px',color:'black'}} />
                                 <div className="feat-text">
                                    <h3>Return Delivery</h3>
                                    <p style={{textDecoration:'none'}}>Free 30 Days Delivery Returns. <span style={{textDecoration:'underline'}}><a src='#'>Details</a></span></p>

                                </div>
                            </div>                            
                         </div>
                </div>
            </div>}

                        {data.length !== 0 &&  <ProductsTemplate id={data[productIndex].id} overflowExists redtext={'Realted Items'} headertext={''} data={data.filter((item)=>item.category===data[productIndex].category)}></ProductsTemplate>}







        </div>
    )

}

