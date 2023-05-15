import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RegisteredEvents from '../components/RegisteredEvents';
import ProfileEdit from '../components/ProfileEdit';
import ViewCreatedEvents from '../components/ViewCreatedEvents';
import '../style/Profile.css';
import { toast } from 'react-toastify';


function Profile() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState([]);
  const [isEditable, setIseditable] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);

  useEffect(() => {
    if (userdata.role === "placement-incharge" || userdata.role === "club-head" || userdata.role === "alumni") {
      setIsCoordinator(true);
    } else if (userdata.role === "student") {
      setIsCoordinator(false);
    }
    if (localStorage.getItem('userToken') !== null) {
      setUserdata(JSON.parse(window.localStorage.getItem('userToken')));
    } else {
      navigate('/');
    }
  }, [setUserdata, setIsCoordinator, userdata,navigate]);

  const handleTitleClick = () => {
    navigate('/home', { state: { userdata } });
  }

  const handleLogout = () => {
    window.localStorage.clear();
    toast.info("Signing Out...");
    setTimeout(()=>{
      navigate('/login');
    },2000);
  }

  const handleEditableFunction = () => {
    setIseditable(!isEditable);
  }

  return (
    <div className='profile-cont'>
      <div className='navbar'>
        <div className='navbar-title' onClick={handleTitleClick}>CampusHive</div>
        <div className='left-menu'>
          <button className='logout-btn' onClick={handleLogout}><img alt='Logout' src={require('../images/log-icon.png')} className='icon' /></button>
        </div>
      </div>
      <div className='user-profile-details-cont'>
        <div className='user-profile-details'>
          <h2>{userdata.fname}</h2>
          <div>{userdata.userid}</div>
          <hr></hr>
          <div className='user-prof-text'>
            <div>Department : {userdata.dept}</div>
            <div>Year Of Graduation : {userdata.batch}</div>
            <div>Email ID : {userdata.email}</div>
            <div>Your Role :  {userdata.role}</div>
          </div>
        </div>
      </div>
      <div className='profile-data'>
        <div className='reg-create-divs'>
          <div className='coming-events'>
            <h2>Your registered events</h2>
            <div><RegisteredEvents userid={userdata.userid} /></div>
          </div>
          {
            isCoordinator ?
              <div className='coming-events'>
                <h2>View created events</h2>
                <ViewCreatedEvents userid={userdata.userid} />
              </div>
              : null
          }
        </div>
        <div className='edit-cont'>
          <button className='loginbtn prof-btn' onClick={handleEditableFunction}>Edit Profile</button>
          <div>
            {
              isEditable ? <ProfileEdit userdata={userdata} /> : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile