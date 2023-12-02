import React from 'react'
import UserList from './UserList'

const AddUser = ({ users, choiceUser, addUser }) => <UserList
    selectName={"addUser"}
    choiceUser={choiceUser}
    users={users}
    userId={addUser}
/>


export default AddUser