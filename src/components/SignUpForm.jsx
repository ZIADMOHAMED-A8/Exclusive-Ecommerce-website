import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../auth/authApiSlice';
import { setLoggedin } from '../../auth/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from 'react-hook-form';

export default function SignUpForm() {
  const [type, setType] = useState('password');
  const nameref = useRef();
  const userref = useRef();
  const passrref = useRef();
  const [signup, { error: signuperror, isLoading: signuploading }] = useSignupMutation();
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();
  const nav = useNavigate();
  const dispatch = useDispatch();

  function toggleHide() {
    setType((type) => type === 'password' ? 'text' : 'password');
  }

  async function onsubmit(data) {

    let res = await signup({
      username: data.user_name,
      email: data.email,
      password: data.password
    });

    if (res?.data?.message === 'Signup successful') {
      toast('Signed Up successfully', {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
      setTimeout(() => {
        nav('/');
        dispatch(setLoggedin(true));
      }, 500);
    } else if (signuperror?.data?.message === 'Check your credintials') {
      toast(signuperror.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
      setTimeout(() => {
        nav('/auth/?mode=login');
      }, 500);
    } else {
      toast(signuperror?.data?.message, {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)} className='auth-form'>
      <div className="form-text">
        <h1 className="text-4xl font-bold">Create an account</h1>
        <p>Enter your details below</p>
      </div>
      <input
       {...register("user_name",{required:'Username is required'})}
        type="text"
        placeholder='Name'
      />
      {errors.user_name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.user_name.message}</span>}

      <input
        {...register("email",{required:'email is required',pattern:{
          value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message:'email is invalid'
        }})}
        type="text"
        placeholder='Email or phone number'
      />
      {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}
      <div className='password-input-wrapper'>
        <input
          {...register("password",{required:'password is required',minLength:{
            value:6,
            message:'password should be at least 6 characters'
          }})}
          type={type}
          placeholder='Password'
          
        />
        <span onClick={toggleHide} className="password-toggle-icon">
          {type === 'password' ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
      </div>
      {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</span>}

      <div className="buttons">
        <button
          type='submit'
          className='formalbutton'
          style={signuploading ? { backgroundColor: 'gray', width: '100%', transition: '0.3s' } : { width: '100%', transition: '0.3s' }}
          disabled={signuploading}
        >
          Sign Up
        </button>
        <button
          style={{ width: '100%', backgroundColor: 'white', border: '1px solid black', color: 'black' }}
          className='formalbutton'
          type="button"
        >
          <i className="fab fa-google"></i> Sign Up With google
        </button>
        <span style={{ margin: 'auto' }}>
          Already have an account? <Link to="/auth/?mode=login" style={{ textDecoration: 'underline', cursor: 'pointer' }}>Log in</Link>
        </span>
      </div>
    </form>
  );
}
