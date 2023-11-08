import React from 'react'
import { FaUserLarge } from "react-icons/fa6";
// import noteService from '../sevices/notes';


function Users({ users, choiceUserId, userId }) {

    return (
        <div className='users-list'>
            <FaUserLarge />
            <label htmlFor="users"> </label>
            <select value={userId ? userId : ""} name="users" id="users" onChange={choiceUserId} >
                <option value="">--Select user--</option>
                {users.map(el => < option key={el.id} value={el.id} > {el.login}</option>)}
            </select>
        </div >
    )
}
export default Users