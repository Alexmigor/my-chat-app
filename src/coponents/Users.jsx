import React from 'react'
import { FaUserLarge } from "react-icons/fa6";

function Users({ users, choiceUserId }) {
    return (
        <div className='users-list'>
            <FaUserLarge/>
            <label htmlFor="users"> </label>
            <select name="users" id="users" onChange={choiceUserId} >
                {users.map(el =>
                    <option key={el.id} value={el.userId} >{el.login}</option>
                )}
            </select>
        </div>
    )
}
export default Users