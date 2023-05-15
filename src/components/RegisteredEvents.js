import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function RegisteredEvents({userid}) {
    const [registeredList, setRegisteredlist] = useState([]);
    useEffect(()=>{
        Axios.post('https://campushivebackend.onrender.com/getRegisteredList',{
            userid:userid
        })
        .then((res)=>{
            if (res.data){
                setRegisteredlist(res.data);
            }
        })
    },[userid,setRegisteredlist]);
  return (
    <div>
        {
            registeredList.map((ele)=>{
                return (
                    <div key={ele.event.eventid} className='one-event profile-event-card'>
                        <h4>{ele.event.ename}</h4>
                        <div>{ele.event.edate}</div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default RegisteredEvents