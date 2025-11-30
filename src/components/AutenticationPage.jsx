import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSearchParams } from 'react-router-dom';
import cartImage from '../assets/dl.beatsnoop 1.png';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function AuthenticationPage() {
  let [searchParams] = useSearchParams();
  let mode = searchParams.get('mode');
  let isLoggingIn = (mode === 'login') ? true : (mode === 'register') ? false : null;

  if (isLoggingIn !== null) {
    return (
      <>
        <div className="auth-container">
          <img src={cartImage} alt="" />
          <div className="container">
            {isLoggingIn ? <LoginForm /> : <SignUpForm />}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <h1 style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>Please check url</h1>
    );
  }
}
