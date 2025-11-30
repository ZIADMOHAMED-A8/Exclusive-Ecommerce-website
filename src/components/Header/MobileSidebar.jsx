import { useNavigate } from 'react-router-dom';
import AuthButton from './AuthButton';

export default function MobileSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <li><a onClick={() => handleNavClick('/')}>Home</a></li>
        <li onClick={() => handleNavClick('/about')}><a>About</a></li>
        <AuthButton variant="sidebar" onClose={onClose} />
      </div>
      <div className="overlay" onClick={onClose}></div>
    </>
  );
}
