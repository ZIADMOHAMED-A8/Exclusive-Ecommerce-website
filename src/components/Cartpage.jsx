import { useDispatch, useSelector } from "react-redux";
import {  updateQuantity } from "./cart-slice";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function Cartpage(){

    let dispatch=useDispatch()
    let  data = useSelector((state) => state.cart)
    let Navigate=useNavigate()



    return (
      
         <div className="container">
            <div className="cartbreakdown">
              {data.items[0] ? <><ul className="cart-indentifiers">  
  <li  style={{width: '60px'}}></li> 
  <li>Product</li>
  <li>Price</li>
  <li>Quantity</li>
  <li>Subtotal</li>
</ul>


{ data.items.map((item) => {

  return (
  <ul key={item.item.id}>
    <li>
      <img style={{width:'50px'}} src={item.item.image} />
    </li>
    <li id="name-cell"><div>Name</div> <p>{item.item.title}</p> </li>
    <li id="price-cell"><div>Price</div> <p>${item.item.price}</p></li>
    <li id="quantity-cell">
      <div>Quantity</div>
        <input type="number"  min={0}   onChange={(e)=>{dispatch(updateQuantity({ quantity: parseInt(e.target.value), id: item.id }))}}   defaultValue={item.quantity} style={{width:'100px',backgroundColor:'white',border:'1px solid #000000'}}></input>
    
    </li>
    <li id="subtotal-cell"><div>Subtotal </div><p>${!item.quantity ? ' 0' : ` ${(item.item.price * item.quantity).toFixed(2)}`}</p></li>
  </ul>
  );
})}</> : <h2 style={{textAlign:"center"}}>Cart is Empty</h2>}

                                               
            
            </div>
        { data.items[0] &&<ul className="total-price">
          <h2>Cart Total</h2>
            <li><p>SubTotal:</p> <p>${(data.totalPrice).toFixed(2)}</p></li>
            <li><p>Shiping:</p> <p>${((data.totalPrice)*0.12).toFixed(2)}</p></li>
            <li><p>Total:</p><p>${(data.totalPrice+(data.totalPrice)*0.12).toFixed(2)}</p></li>
           < button className="formalbutton" onClick={()=>{Navigate('checkout')}}>Procees to checkout</button>


        </ul>
     }   </div>
    )
}

