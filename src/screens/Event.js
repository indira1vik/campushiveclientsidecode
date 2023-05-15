import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/Event.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Event() {
  const location = useLocation();
  const navigate = useNavigate();
  const [eventData, setEventdata] = useState([]);
  const [userdata, setUser] = useState([]);
  const [isAdmin, setIsadmin] = useState(false);
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [isDisabled, setIsdisabled] = useState(true);
  useEffect(() => {
    setEventdata(location.state.event);
    setUser(location.state.user);
    if (userdata.userid === "admin") {
      setIsadmin(true);
    }
    if (fname.length > 0 && email.length > 0) {
      setIsdisabled(false);
    } else {
      setIsdisabled(true);
    }
  }, [setEventdata, setUser, location, setIsadmin, userdata, fname, email, setIsdisabled]);
  const handleRegistered = () => {
    if (email !== "" && fname !== "") {
      setIsdisabled(false);
      Axios.post('https://campushivebackend.onrender.com/addRegister', {
        event: eventData,
        userid: userdata.userid
      })
        .then((res) => {
          if (res.data === "Success") {
            toast.success("Redirecting to Orignal website...");
          } else if (res.data === "Error") {
            toast.warn("Already Registered...");
          } else {
            toast.warn("Cannot register...");
          }
        })
    } else {
      toast.warn("Enter all Details!");
    }
  }
  const handleBackHome = () => {
    navigate('/home',{state:{userdata}});
  }
  return (
    <div className='event-cont'>
      <div className='event-data'>
        <button className='loginbtn' onClick={handleBackHome}>◀ Back to home</button>
        <div className='event-details'>
          <div>
            <h1>{eventData.ename}</h1>
            <h4> • {eventData.eventid}</h4>
          </div>
          <div>
            <h4>Description</h4>
            <div>{eventData.desc}</div>
          </div>
          <div>
            <h4>Date Of Event</h4>
            <div>{eventData.edate}</div>
          </div>
          <div>
            <h4>Venue</h4>
            <div>{eventData.venue}</div>
          </div>
          {
            isAdmin ? null :
              <div className='one-event profile-event-card form-fill'>
                <h4>Form</h4>
                <input placeholder='Enter Full Name' onChange={(e) => { setFname(e.target.value) }} />
                <input placeholder='Enter Email ID' onChange={(e) => { setEmail(e.target.value) }} />
                {
                  isDisabled ?
                    <button className='reglink-btn' onClick={handleRegistered}>
                      <img alt='Redirect Logo' className='redirect-logo' src={require('../images/redirect.png')} />
                      <div>Register</div>
                    </button>
                    :
                    <a className='reglink-btn' rel='noreferrer' target='_blank' href={`${eventData.reglink}`} onClick={handleRegistered}>
                      <img alt='Redirect Logo' className='redirect-logo' src={require('../images/redirect.png')} />
                      <div>Register</div>
                    </a>
                }

              </div>
          }
        </div>

      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Event