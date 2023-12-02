import React, { useEffect } from 'react'
import { FaUserLarge } from "react-icons/fa6";
import UserList from './UserList';


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
            <FaUserLarge style={{ marginRight: '0.5rem' }} />
            <UserList selectName={"users"} choiceUser={choiceUser} users={users} userId={userId} />
        </div >
    )
}
export default Users