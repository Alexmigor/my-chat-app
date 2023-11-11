import React, { useEffect } from 'react'
import { FaUserLarge } from "react-icons/fa6";
// import noteService from '../sevices/notes';


function Users({ users, userId, setUserId }) {

    const choiceUser = () => {
        const userId = document.getElementById("users").value;
        localStorage.setItem('userId', JSON.stringify(userId))
        setUserId(userId)
    }
    useEffect(() => {
        const savedUser = localStorage.getItem('userId')
        if (savedUser) {
            setUserId(JSON.parse(savedUser))
        }
    }, [userId])

    return (
        <div className='users-list'>
            <FaUserLarge />
            <label htmlFor="users"> </label>
            <select value={userId ? userId : ""} name="users" id="users" onChange={choiceUser} >
                <option value="">--Select user--</option>
                {users.map(el => < option key={el.id} value={el.id} > {el.login}</option>)}
            </select>
        </div >
    )
}
export default Users