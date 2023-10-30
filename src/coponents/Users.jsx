import React from 'react'
import { FaUserLarge } from "react-icons/fa6";

function Users({ users, choiceUserId, userId }) {

    return (
        <div className='users-list'>
            <FaUserLarge />
            <label htmlFor="users"> </label>
            <select value={userId} name="users" id="users" onChange={choiceUserId} >
                {users.map(el => {
                    if (userId === el.id) {
                        return < option key={el.id} value={el.id} > {el.login}</option>
                    }
                    return < option key={el.id} value={el.id} > {el.login}</option>
                }
                )}
            </select>
        </div >
    )
}
export default Users