import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateUser() {
    const [toUpdate, setToupdate] = useState(false);
    const [toSearchUser, setTosearchuser] = useState("");
    const [clicktoInput, setClicktoinput] = useState(false);
    const [role, setRole] = useState("");
    const handleToUpdateCheck = () => {
        setToupdate(!toUpdate);
    }
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        Axios.get('https://campushivebackend.onrender.com/getUsersList')
            .then((res) => {
                setUserList(res.data);
            })
            .catch((err) => {
                toast.warn(err);
            })

    }, [setUserList]);
    const handleOpenInput = () => {
        setClicktoinput(!clicktoInput);
    }
    const handleSaveRole = (userid) => {
        Axios.post('https://campushivebackend.onrender.com/updateUserRole', {
            userid: userid,
            role: role
        })
            .then((res) => {
                if (res.data === "Success") {
                    toast.success("Updated user role...");
                } else {
                    toast.warn("Cannot update user role...");
                }
            })
    }
    return (
        <div>
            <button className='loginbtn prof-btn below-gap' onClick={handleToUpdateCheck}>Update User</button>
            {
                toUpdate ?
                    <div className='coming-events'>
                        <input
                            placeholder='Search user...'
                            type='text'
                            onChange={(e) => {
                                setTosearchuser(e.target.value);
                            }}
                        />
                        <div>
                            {
                                userList.filter((item) => {
                                    return toSearchUser === '' ? null : item.userid.startsWith(toSearchUser);
                                })
                                    .map((ele) => {
                                        return (
                                            <div key={ele._id} className='one-event profile-event-card'>
                                                <h4 className='edit-title-user' onClick={handleOpenInput}>User ID : {ele.userid} & Name : {ele.fname}</h4>
                                                {
                                                    clicktoInput ?
                                                        <div className='reg-create-divs'>
                                                            <select className='drop-down-list' value={role} onChange={(e) => { setRole(e.target.value) }}>
                                                                <option>Select Role</option>
                                                                <option>student</option>
                                                                <option>placement-incharge</option>
                                                                <option>club-head</option>
                                                                <option>alumni</option>
                                                            </select>
                                                            <button className='loginbtn' onClick={() => handleSaveRole(ele.userid)}>Save</button>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                    :
                    null
            }
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default UpdateUser