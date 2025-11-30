import { useNavigate } from 'react-router-dom';
import AuthButton from './AuthButton';

export default function DesktopNav() {
  const navigate = useNavigate();

  return (
    <ul>
      <li><a onClick={() => navigate('/')}>Home</a></li>
      <li onClick={() => navigate('/about')}><a>About</a></li>
      <AuthButton variant="desktop" />
    </ul>
  );
}
