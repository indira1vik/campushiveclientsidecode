import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VerifyEvents() {
    const [toVerifylist,setToverifylist] = useState([]);
    useEffect(() => {
        Axios.get('https://campushivebackend.onrender.com/getNoneVerifiedEvents')
        .then((res)=>{
            setToverifylist(res.data);
        })
        .catch((err)=>{
            toast.warn(err);
        })
    }, [setToverifylist]);
    const handleVerifyIt = (eventid) => {
        Axios.post('https://campushivebackend.onrender.com/verifyEvent',{
            eventid:eventid
        })
        .then((res)=>{
            if (res.data === "Success"){
                toast.success("Verified...");
            } else if (res.data === "Error"){
                toast.warn("Error in Verifying...");
            }
        })
    }
    const navigate = useNavigate();
    const userid = 'admin';
    const handleEventCheck = (event) => {
        navigate('/event',{state:{userid,event}});
    }
    return (
        <div>
            <div>
                {
                    toVerifylist.map((ele)=>{
                        return(
                            <div key={ele.eventid} className='one-event' onClick={() => handleEventCheck(ele)}>
                                <h3>{ele.ename}</h3>
                                <div>{ele.edate}</div>
                                <button className='editbtn' onClick={() => handleVerifyIt(ele.eventid)}>Verify</button>
                            </div>
                        )
                    })
                }
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default VerifyEvents