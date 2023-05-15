import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const navigate = useNavigate();
    const [userid, setUserid] = useState("");
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [dept, setDept] = useState("");
    const [batch, setBatch] = useState("");
    const [role, setRole] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const handleSignupBtn = () => {
        if (userid !== "" && fname !== "" && email !== "" && dept !== "" && batch !== "" && role !== "" && pass !== "" && cpass !== "") {
            if (pass === cpass) {
                Axios.post('https://campushivebackend.onrender.com/createUser', {
                    userid: userid,
                    fname: fname,
                    email: email,
                    dept: dept,
                    batch: batch,
                    role: role,
                    pass: pass
                }).then((res) => {
                    if (res.data === "Success") {
                        toast.success("User created...");
                        setTimeout(()=>{
                            navigate('/');
                        },2000);
                    } else if (res.data === "Error") {
                        toast.warn("User not created...");
                    }
                })
            } else {
                toast.warn("Password does not match...");
            }
        } else {
            toast.warn("Enter all details...");
        }
    }
    const idErrorCheck = () => {
        const idPat = /^[a-zA-Z0-9]+$/;
        if (userid.length === 0){
            return {
                __html:""
            }
        }
        if (!userid.match(idPat)){
            return {
                __html:"*Should not contain special characters!"
            }
        }
        
    }
    const nameErrorCheck = () => {
        const namePat = /^[a-zA-Z ]*$/;
        if (fname.length === 0){
            return {
                __html:""
            }
        }
        if (!fname.match(namePat)){
            return {
                __html:"*Should not contain numbers and special characters!"
            }
        }
        
    }
    const emailErrorCheck = () => {
        const emailPat = /^[a-zA-Z0-9]+@college.in$/;
        if (email.length === 0){
            return {
                __html:""
            }
        }
        if (!email.match(emailPat)){
            return {
                __html:"*Invalid Email Format!"
            }
        }
        
    }
    const passErrorCheck = () => {
        if (pass.length === 0){
            return {
                __html:""
            }
        }
        if (pass.length <= 8){
            return {
                __html:"*Minimum password length is 8"
            }
        }
        if (pass.search(/[A-Z]/) === -1){
            return {
                __html:"*Should contain Capital letters!"
            }
        }
        if (pass.search(/[a-z]/) === -1){
            return {
                __html:"*Should contain Small letters!"
            }
        }
        if (pass.search(/[0-9]/) === -1){
            return {
                __html:"*Should contain Numbers!"
            }
        }
        if (pass.search(/[@#$%&*]/) === -1){
            return {
                __html:"*Should contain Special characters!"
            }
        }
    }
    const handleAlreadyAccount = () => {
        navigate('/')
    }
    return (
        <div className='signup-cont'>
            <div className='signup-form'>
                <h1 className='title'>CampusHive</h1>
                <input
                    required
                    placeholder='Enter User ID'
                    type='text'
                    name='userid'
                    onChange={(e) => {
                        setUserid(e.target.value);
                    }}
                />
                <div className='error-text' dangerouslySetInnerHTML={idErrorCheck()}></div>
                <input
                    placeholder='Enter Full name'
                    type='text'
                    name='fname'
                    onChange={(e) => {
                        setFname(e.target.value);
                    }}
                />
                <div className='error-text' dangerouslySetInnerHTML={nameErrorCheck()}></div>
                <input
                    placeholder='Enter College Email ID'
                    type='text'
                    name='email'
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <div className='error-text' dangerouslySetInnerHTML={emailErrorCheck()}></div>
                <select className='drop-down-list' value={dept} onChange={(e)=>{setDept(e.target.value)}}>
                    <option>Select Department</option>
                    <option>CSE</option>
                    <option>IT</option>
                    <option>EEE</option>
                    <option>ECE</option>
                    <option>MECH</option>
                    <option>CHEM</option>
                    <option>BME</option>
                    <option>CIVIL</option>
                    <option>English</option>
                    <option>Math</option>
                </select>
                <div></div>
                <select className='drop-down-list' value={batch} onChange={(e)=>{setBatch(e.target.value)}}>
                    <option>Select Graduation Year</option>
                    <option>2027</option>
                    <option>2026</option>
                    <option>2025</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <div></div>
                <select className='drop-down-list' value={role} onChange={(e)=>{setRole(e.target.value)}}>
                    <option>Select Role</option>
                    <option>student</option>
                    <option>placement-incharge</option>
                    <option>club-head</option>
                    <option>alumni</option>
                </select>
                <div></div>
                <input
                    placeholder='Enter Password'
                    type='password'
                    name='pass'
                    onChange={(e) => {
                        setPass(e.target.value);
                    }}
                />
                <div className='error-text' dangerouslySetInnerHTML={passErrorCheck()}></div>
                <input
                    placeholder='Confirm Password'
                    type='password'
                    name='cpass'
                    onChange={(e) => {
                        setCpass(e.target.value);
                    }}
                />
                <div></div>
                <button className='loginbtn' onClick={handleSignupBtn}>Sign-up</button>
                <button className='signupbtn' onClick={handleAlreadyAccount}>Already have an Account? Login</button>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Signup