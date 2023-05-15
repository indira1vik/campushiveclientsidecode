import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Schedule from '../components/Schedule';
import UpcomingEvents from '../components/UpcomingEvents';
import '../style/Home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

    const navigate = useNavigate();
    const [userdata, setUserdata] = useState([]);
    const [toDisplayschedule, setTodisplayscheule] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            setUserdata(JSON.parse(localStorage.getItem('userToken')));
        } else {
            navigate('/');
        }

    }, [setUserdata,navigate]);

    useEffect(() => {
        if (userdata.role === "placement-incharge" || userdata.role === "club-head" || userdata.role === "alumni") {
            setTodisplayscheule(true);
        } else if (userdata.role === "student") {
            setTodisplayscheule(false);
        }
    }, [userdata, setTodisplayscheule]);

    const handleTitleClick = () => {
        navigate('/home', { state: { userdata } });
    }

    const handleProfileClick = () => {
        navigate('/profile', { state: { userdata } });
    }

    const handleLogout = () => {
        window.localStorage.clear();
        toast.info("Signing Out...");
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }

    return (
        <div className='home-cont'>
            <div className='navbar'>
                <div className='navbar-title' onClick={handleTitleClick}>CampusHive</div>
                <div className='left-menu'>
                    <button className='profilebtn' onClick={handleProfileClick}><img alt='Profile' src={require('../images/prof-icon.png')} className='icon' /></button>
                    <button className='logoutbtn' onClick={handleLogout}><img alt='Logout' src={require('../images/log-icon.png')} className='icon' /></button>
                </div>
            </div>
            <div className='home-data'>
                <h1 className='user-intro'>Welcome back, {userdata.fname}</h1>
                <div className='two-cont'>
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
                        <div>{<UpcomingEvents search={search} user={userdata} />}</div>
                    </div>
                    <div>{toDisplayschedule ? <Schedule userid={userdata.userid} /> : null}</div>
                </div>

            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Home