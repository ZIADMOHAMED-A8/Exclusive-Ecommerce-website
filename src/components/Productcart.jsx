import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from './products-slice';
import { addItem } from './cart-slice'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCheckLoggedInQuery } from '../../auth/authApiSlice';



export function Stars(count) {

  const stars = [];

  for (let i = 0; i < count; i++) {
    stars.push(<span key={i}><FontAwesomeIcon style={{ color: '#FFAD33' }} icon={faStar} /></span>);
  }
  for (let i = count; i < 5; i++) {
    stars.push(<span key={i}><FontAwesomeIcon icon={faStar} /></span>);

  }

  return <>{stars}</>;
}
export default function Productcart({ widthNotNedded, originalPrice, DiscountedPrice, rating, name, image, id }) {
    let token=useSelector((state)=>state.auth.loogedin);


  let navigate = useNavigate()
  let cart = useSelector((state) => state.cart.items)
  let dispatch = useDispatch()
  const { items: data, loading, error } = useSelector((state) => state.product);


  return (

    <div style={widthNotNedded ? {} : { width: '500px' }} className='product-cart'>

      <div className='product-image-container'>
        {data.length > 0 && (
          <img onClick={() => { navigate(`/${id}`) }} src={image} alt="product" />
        )}
        <div className='Add-to-cart' onClick={token ?
          () => {
            const index = data.findIndex((item) => item.id === id);
            dispatch(addItem(data[index]))
            toast("Added to cart", {
              position: "bottom-right",
              autoClose: 3000,
              className: "toast-success"
            });
          }
          : () => {
            navigate('/auth/?mode=login')
            console.log(token)
          }

        }>Add to Cart</div>

      </div>
      <h4>{name}</h4>
      <div className='product-prices'>
        {DiscountedPrice && <span style={{ color: '#DB4444' }}>${DiscountedPrice}</span>}
        {DiscountedPrice && <span style={{ color: 'gray', textDecorationLine: 'line-through' }}>${originalPrice}</span>}
        {!DiscountedPrice && <span style={{ color: 'gray' }}>${originalPrice}</span>}

      </div>
      {data.length > 0 && <div>{Stars(Math.floor(rating))}</div>}



    </div>
  )
}