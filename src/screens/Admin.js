import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Schedule from '../components/Schedule';
import VerifyEvents from '../components/VerifyEvents';
import UpcomingEvents from '../components/UpcomingEvents';
import ViewCreatedEvents from '../components/ViewCreatedEvents';
import UpdateUser from '../components/UpdateUser';
import '../style/Admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [adminData, setAdmindata] = useState([]);
  const handleTitleClick = () => {
    navigate('/admin');
  }
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setAdmindata(JSON.parse(localStorage.getItem('userToken')));
    } else {
      navigate('/');
    }

  }, [setAdmindata, navigate]);
  const handleLogout = () => {
    window.localStorage.clear();
    toast.info("Signing Out...");
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }
  return (
    <div className='admin-cont'>
      <div className='navbar'>
        <div className='navbar-title' onClick={handleTitleClick}>CampusHive</div>
        <div className='left-menu'>
          <button className='logout-btn' onClick={handleLogout}><img alt='Logout' src={require('../images/log-icon.png')} className='icon' /></button>
        </div>
      </div>
      <div className='admin-data'>
        <div className='div-admin-one'>
          <div>{<Schedule userid={'admin'} />}</div>
          <div>{<UpdateUser />}</div>
        </div>
        <div className='div-admin-one'>
          <h1>Welcome, {adminData.fname}</h1>
          <div className='coming-events'><h2>Verify Events</h2>{<VerifyEvents />}</div>
          <div className='coming-events'>
            <h2>Upcoming Events</h2>
            <input
              placeholder='Search Events & Workshops...'
              type='text'
              name='search'
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <div>{<UpcomingEvents search={search} userid={'admin'} />}</div>
          </div>
          <div className='coming-events'>
            <h2>View created events</h2>
            <div>{<ViewCreatedEvents userid={'admin'} />}</div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Admin