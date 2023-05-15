import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Schedule({ userid }) {
    const [eventid, setEventid] = useState("");
    const [ename, setEname] = useState("");
    const [desc, setDesc] = useState("");
    const [edate, setEdate] = useState("");
    const [venue, setVenue] = useState("");
    const [reglink, setReglink] = useState("");
    const [verified, setVerified] = useState(false);
    useEffect(() => {
        setVerified(false);
    }, [setVerified]);
    const handleCreateEventBtn = () => {
        if (eventid !== "" && ename !== "" && desc !== "" && edate !== "" && venue !== "" && reglink !== "") {
            Axios.post('https://campushivebackend.onrender.com/createEvent', {
                eventid: eventid,
                ename: ename,
                creatorid: userid,
                desc: desc,
                edate: edate,
                venue: venue,
                reglink: reglink,
                verified: verified
            }).then((res) => {
                if (res.data === "Success") {
                    toast.success("Event scheduled... Should be verified by Admin...");
                } else if (res.data === "Error") {
                    toast.warn("Cannot Add Event...");
                }
            })
        } else {
            toast.warn("Enter all details...");
        }
    }
    return (
        <div className='coming-events'>
            <h2>Schedule Events</h2>
            <input
                required
                placeholder='Enter Event ID'
                type='text'
                name='eventid'
                onChange={(e) => {
                    setEventid(e.target.value);
                }}
            />
            <input
                placeholder='Enter Event Name'
                type='text'
                name='ename'
                onChange={(e) => {
                    setEname(e.target.value);
                }}
            />
            <textarea
                rows={5}
                placeholder='Enter Event Description'
                type='text'
                name='desc'
                onChange={(e) => {
                    setDesc(e.target.value);
                }}
            />
            <input
                placeholder='Enter Event Date (dd-mm-yyyy)'
                type='text'
                name='edate'
                onChange={(e) => {
                    setEdate(e.target.value);
                }}
            />
            <input
                placeholder='Enter Registeration Link'
                type='text'
                name='reglink'
                onChange={(e) => {
                    setReglink(e.target.value);
                }}
            />
            <input
                placeholder='Enter Venue'
                type='text'
                name='venue'
                onChange={(e) => {
                    setVenue(e.target.value);
                }}
            />
            <button className='loginbtn' onClick={handleCreateEventBtn}>Create Event</button>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Schedule