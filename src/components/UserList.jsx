import React from 'react'



const UserList = ({ users, userId, choiceUser, selectName }) => {

    return (
        <>
            <label htmlFor={selectName}></label>
            <select value={userId ? userId : ""} name={selectName} id={selectName} onChange={choiceUser} >
                <option value="">--Select user--</option>
                {users && users.map(el => < option key={el.id} value={el.id} > {el.login}</option>)}
            </select>
        </>
    )
}

export default UserList