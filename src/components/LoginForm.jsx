import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../auth/authApiSlice';
import { setLoggedin } from '../../auth/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const [type, setType] = useState('password');
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  function toggleHide() {
    setType((type) => type === 'password' ? 'text' : 'password');
  }

  async function onsubmit(data) {
    let res = await login({ username: data.email, password: data.password });

    if (res.data?.message === 'Login successful') {
      toast("Logged in successfully", {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
      dispatch(setLoggedin(true));
      nav('/');
    } else if (res.error?.status === 401) {
      toast("Check your credentials", {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
    } else {
      toast("Couldn't log in, please try later", {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)} className='auth-form'>
      <div className="form-text">
        <h1 className="text-4xl font-bold">Log in to Execlusive</h1>
        <p>Enter your details below</p>
      </div>
      <input
        {...register("email", { required: "Email is required" })}
        type="text"
        placeholder='User Name'
      />
      {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}
      <div className='password-input-wrapper'>
        <input
          type={type}
          {...register("password", { required: "Password is required" })}
          placeholder='Password'
        />
        <span onClick={toggleHide} className="password-toggle-icon">
          {type === 'password' ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
      </div>
      {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</span>}
      <div style={{ flexDirection: 'row' }} className="buttons">
        <button
          className='formalbutton'
          disabled={isSubmitting}
          style={isLoading ? { backgroundColor: 'gray', width: '100%', transition: '0.3s' } : { transition: '0.3s', width: '100%' }}
          type="submit"
        >
          Log in
        </button>
      </div>
    </form>
  );
}
