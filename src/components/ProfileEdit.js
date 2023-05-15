import Axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileEdit({ userdata }) {
    const [editEmail, setEditemail] = useState("");
    const [editFname, setEditfname] = useState("");
    const [editPass, setEditpass] = useState("");
    const handleUpdateProfile = () => {
        if (editEmail !== "" && editFname !== "" && editPass !== "") {
            Axios.post('https://campushivebackend.onrender.com/updateProfile', {
                userid:userdata.userid,
                editEmail: editEmail,
                editFname: editFname,
                editPass: editPass,
            })
                .then((res) => {
                    if (res.data === "Success") {
                        toast.success("Updated...");
                    } else if (res.data === "Error") {
                        toast.warn("Cannot update...")
                    }
                })
        } else {
            toast.warn("Fill to update...");
        }
    }
    return (
        <div className='coming-events'>
            <h3>Your Profile</h3>
            <input
                placeholder={userdata.fname}
                type='text'
                name='editname'
                onChange={(e) => {
                    setEditfname(e.target.value);
                }}
            />
            <input
                placeholder={userdata.email}
                type='text'
                name='editemail'
                onChange={(e) => {
                    setEditemail(e.target.value);
                }}
            />
            <input
                placeholder='Change Password'
                type='password'
                name='editpass'
                onChange={(e) => {
                    setEditpass(e.target.value);
                }}
            />
            <button className='loginbtn' onClick={handleUpdateProfile}>Save</button>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default ProfileEdit