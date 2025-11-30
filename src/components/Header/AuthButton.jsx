import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import { logOut } from '../../../auth/authSlice';
import { useLogoutMutation } from '../../../auth/authApiSlice';
import { toast } from 'react-toastify';

export default function AuthButton({ variant = 'desktop', onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localtoken = useSelector((state) => state.auth.loogedin);
  const [logout, { isSuccess }] = useLogoutMutation();

  const handleSignUp = () => {
    navigate('/auth/?mode=register');
    if (onClose) onClose();
  };

  const handleLogout = async () => {
    let res = await logout();
    if (isSuccess || res?.ok) {
      toast("You are Logged out", {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
    } else {
      toast("Something wrong happened", {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
    }
    dispatch(logOut());
    if (onClose) onClose();
  };

  const animationProps = variant === 'desktop' 
    ? {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 }
      }
    : {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 }
      };

  return (
    <AnimatePresence mode="wait">
      {!localtoken ? (
        <motion.li
          key={variant === 'desktop' ? "signup" : "signup-sidebar"}
          {...animationProps}
          transition={{ duration: 0.3 }}
          onClick={handleSignUp}
        >
          <a>Sign Up</a>
        </motion.li>
      ) : (
        <motion.li
          key={variant === 'desktop' ? "logout" : "logout-sidebar"}
          {...animationProps}
          transition={{ duration: 0.3 }}
          onClick={handleLogout}
        >
          <a>Log out</a>
        </motion.li>
      )}
    </AnimatePresence>
  );
}
