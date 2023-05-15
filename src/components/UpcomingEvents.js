import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpcomingEvents({search, user}) {
    const [verifiedList, setVerifiedList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        Axios.get('https://campushivebackend.onrender.com/getVerifiedEvents')
            .then((res) => {
                setVerifiedList(res.data);
            })
            .catch((err) => {
                toast.warn(err);
            })
    }, [setVerifiedList]);
    const handleEventClick = (event) => {
        navigate('/event',{state:{user,event}});
    }
    return (
        <div>
            <div>
                {
                    verifiedList.filter((item)=>{
                        return search.toLowerCase() === '' ? item : item.ename.toLowerCase().includes(search);
                    })
                    .map((ele) => {
                        return (
                            <div key={ele.eventid} onClick={() => handleEventClick(ele)} className='one-event'>
                                <h3>{ele.ename}</h3>
                                <div>{ele.edate}</div>
                            </div>
                        )
                    })
                }
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default UpcomingEvents