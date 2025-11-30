import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cartIcon from '../../assets/cart-shopping-fast-svgrepo-com.svg';

export default function CartIcon() {
  const navigate = useNavigate();
  const localtoken = useSelector((state) => state.auth.loogedin);
  const totalQuantity = useSelector((state) => state.cart);

  if (!localtoken) return null;

  return (
    <>
      <img
        style={{ transition: '0.3s' }}
        onClick={() => navigate('/cart')}
        src={cartIcon}
        alt="cart"
      />
      <p className='totalCartQuantity'>{totalQuantity.totalQuantity}</p>
    </>
  );
}
