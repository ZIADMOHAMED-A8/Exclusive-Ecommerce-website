import { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useRef } from 'react';
import cartImage from '../assets/dl.beatsnoop 1.png'
import { useLoginMutation, useSignupMutation } from '../../auth/authApiSlice';
import { selectCurrentToken, setLoggedin } from '../../auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export default function AuthenticationPage() {

  let [searchParams] = useSearchParams()
  const [login, { isLoading }] = useLoginMutation()
  let [type, setType] = useState('password')

  let userref = useRef()
  let passrref = useRef();
  let nameref = useRef()
  let token = selectCurrentToken
  let nav = useNavigate()
  let dispatch=useDispatch()
  useEffect(() => {

  }, [token])
  const [signup, { data: signupdata, error: signuperror, isLoading: signuploading, isSuccess: signupsuccess }] = useSignupMutation();




  let mode = searchParams.get('mode')
  let isLoggingIn = (mode === 'login') ? true : (mode === 'register') ? false : null
  console.log(mode)
  console.log(isLoggingIn)
  async function handlelogin(e) {
    e.preventDefault()
    let res = await login({ username: userref.current.value, password: passrref.current.value })

    if (res.data?.message === 'Login successful') {
      toast("Looged in succesfully", {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
      nav('/')
    }
    else if (res.error.status===401) {
      toast("Check your credintials", {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
      
    }
    else{
            toast("Couldnt log in,please try later", {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
    }

  }
  function toogleHide() {
    setType((type) => type === 'password' ? 'text' : 'password')
  }


  async function handleSignup(e) {
    e.preventDefault();

    let res= await signup({
      username: nameref.current.value,
      email: userref.current.value,
      password: passrref.current.value
    })
    console.log(res)
  if (res?.data?.message==='Signup successful'){
                toast('Signed Up succesfully', {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
      setTimeout(() => {
        nav('/')
      dispatch(setLoggedin(true))

      }, 500);
    }
    else if (signuperror?.data?.message==='Check your credintials') {
console.log('dsadashjdhj231')
      

      toast(signuperror.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
      setTimeout(() => {
        nav('/auth/?mode=login')
      }, 500);
    }

   
        else {
      console.log('dsadashjdhj')
       toast('Couldnt sign up,please try later', {
        position: "bottom-right",
        autoClose: 3000,
        className: "toast-success"
      });
    }




  }


  if (isLoggingIn !== null) {
    return (


      <>
        <div className="auth-container">
          <img src={cartImage} alt="" />
          <div className="container">
            <form className='auth-form'>
              <div className="form-text">
                <h1 className="text-4xl font-bold">{isLoggingIn ? 'Log in to Execlusive' : 'Create an account'}</h1>
                <p>Enter your details below</p>
              </div>
              {!isLoggingIn && <input required name='Name' ref={nameref} type="text" placeholder='Name' />}
              <input required name='emailorphonenum' ref={userref} type="text" placeholder='Email or phone number' />
              <div className=' w-full relative'>
              <input required type={type} name='Password' ref={passrref} placeholder='Password' />
              <span onClick={toogleHide} className="absolute top-1/2 -translate-y-1/2 cursor-pointer left-1/2.1" > {type === 'password' ? <AiOutlineEye></AiOutlineEye> : <AiOutlineEyeInvisible></AiOutlineEyeInvisible>}</span>

              </div>
              {!isLoggingIn &&
                <div className="buttons">
                  <button  type='button' className='formalbutton' style={signuploading ? {backgroundColor:'gray',width: '100%',transition:'0.3s'} : {width: '100%',transition:'0.3s'}} disabled={signuploading} onClick={handleSignup}>Sign Up</button>
                  <button style={{ width: '100%', backgroundColor: 'white', border: '1px solid black', color: 'black' }} className='formalbutton'><i className="fab fa-google"></i> Sign Up With google</button>
                  <span style={{ margin: 'auto' }}>Already have an account?  <Link to="/auth/?mode=login" style={{ textDecoration: 'underline', cursor: 'pointer' }}>Log in</Link></span>

                </div>}
              {isLoggingIn &&
                <div style={{ flexDirection: 'row' }} className="buttons">
                  <button className='formalbutton' disabled={isLoading} style={isLoading ? {backgroundColor:'gray',width: '100%',transition:'0.3s'} : {transition:'0.3s',width: '100%'}} onClick={handlelogin}>Log in</button>
                </div>
              }

            </form>

          </div>

        </div>

      </>
    )

  }
  else {
    return (
      <h1 style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>Please check url</h1>
    )
  }

}
