import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [userid, setUserid] = useState("");
  const [pass, setPass] = useState("");
  const handleLoginBtn = () => {
    if (userid !== "" && pass !== "") {
      Axios.post('https://campushivebackend.onrender.com/checkLogin', {
        userid: userid,
        pass: pass
      }).then((res) => {
        if (res.data === "Error") {
          toast.warn("Invalid Credentials..");
        } else if (res.data) {
          window.localStorage.setItem('userToken', JSON.stringify(res.data));
          window.localStorage.setItem('isLogged',true);
          toast.success("Login Successful...");
          if (res.data.role === 'admin') {
            setTimeout(() => {
              navigate('/admin');
            }, 2000);
          } else {
            setTimeout(() => {
              navigate('/home');
            }, 2000);
          }
        }
      })
    } else {
      toast.warn("Enter password and user-id...");
    }
  }
  const handleNewAccountBtn = () => {
    navigate('/signup');
  }
  return (
    <div className='login-cont'>
      <div className='login-form'>
        <h1 className='title'>CampusHive</h1>
        <input
          placeholder='Enter User ID'
          type='text'
          name='userid'
          onChange={(e) => {
            setUserid(e.target.value);
          }}
          autoComplete='off'
        />
        <input
          placeholder='Enter Password'
          type='password'
          name='pass'
          onChange={(e) => {
            setPass(e.target.value);
          }}
          autoComplete='off'
        />
        <button className='loginbtn' onClick={handleLoginBtn}>Login</button>
        <button className='signupbtn' onClick={handleNewAccountBtn}>New User? Click here</button>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Login