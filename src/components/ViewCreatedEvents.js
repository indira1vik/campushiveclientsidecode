import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewCreatedEvents({ userid }) {
    const [createdList, setCreatedList] = useState([]);
    const [editEvent, setEditevent] = useState(false);
    const [editableEvent, setEditableevent] = useState([]);
    const [changeVenue, setChangeVenue] = useState("");
    const [changeDate, setChangeDate] = useState("");
    const [changeName, setChangeName] = useState("");
    const [changeDesc, setChangeDesc] = useState("");
    const [changeLink, setChangeLink] = useState("");


    useEffect(() => {
        Axios.post('https://campushivebackend.onrender.com/getCreatedEvents', {
            userid: userid
        })
            .then((res) => {
                if (res.data) {
                    setCreatedList(res.data);
                }
            })
    }, [userid, setCreatedList]);
    const handleEventDeleteBtn = (eventid) => {
        Axios.post('https://campushivebackend.onrender.com/deleteEvent', {
            eventid: eventid
        })
            .then((res) => {
                if (res.data === "Success") {
                    toast.success("Deleted Event...");
                }
            })
    }
    const handleEditEvent = (eventid) => {
        Axios.post('https://campushivebackend.onrender.com/getEventToEdit', {
            eventid: eventid
        })
            .then((res) => {
                if (res.data) {
                    setEditableevent(res.data);
                } else {
                    toast.warn("Cannot Edit...");
                }
            })
        setEditevent(!editEvent);
    }
    const handleSaveEvent = () => {
        if (changeDate !== "" && changeDesc !== "" && changeLink !== "" && changeName !== "" && changeVenue !== "") {
            Axios.post('https://campushivebackend.onrender.com/editEventDetails', {
                eventid: editableEvent.eventid,
                ename: changeName,
                desc: changeDesc,
                edate: changeDate,
                venue: changeVenue,
                reglink: changeLink,
                verified: false
            })
                .then((res) => {
                    if (res.data === "Success") {
                        toast.success("Edited Event...");
                    } else {
                        toast.warn("Cannot Edit...");
                    }
                })
        } else {
            toast.warn("Fill Edit Form...");
        }

    }
    return (
        <div>
            <div>
                {
                    createdList.map((ele) => {
                        return (
                            <div key={ele.eventid} className='one-event profile-event-card'>
                                <h3>{ele.ename}</h3>
                                <span>{ele.edate}</span>
                                <div className='two-btn'>
                                    <button className='editbtn' onClick={() => handleEditEvent(ele.eventid)}>Edit</button>
                                    <button className='deletebtn' onClick={() => handleEventDeleteBtn(ele.eventid)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                editEvent ?
                    <div className='edit-event'>
                        <h3>Edit details - {editableEvent.eventid}</h3>
                        <input
                            placeholder={editableEvent.ename}
                            onChange={(e) => {
                                setChangeName(e.target.value);
                            }}
                        />
                        <textarea
                            rows={5}
                            placeholder={editableEvent.desc}
                            onChange={(e) => {
                                setChangeDesc(e.target.value);
                            }}
                        />
                        <input
                            placeholder={editableEvent.edate}
                            onChange={(e) => {
                                setChangeDate(e.target.value);
                            }}
                        />
                        <input
                            placeholder={editableEvent.venue}
                            onChange={(e) => {
                                setChangeVenue(e.target.value);
                            }}
                        />
                        <input
                            placeholder={editableEvent.reglink}
                            onChange={(e) => {
                                setChangeLink(e.target.value);
                            }}
                        />
                        <button className='loginbtn' onClick={handleSaveEvent}>Save</button>

                    </div>

                    : null
            }
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default ViewCreatedEvents