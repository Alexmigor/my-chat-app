import React, { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from '../sevices/notes';
import nextId from "react-id-generator";

function InputSearch({ users, chats, setChats, invitations, setInvitations, userId }) {
    const [search, setSearch] = useState('')
    const [userList, setUserList] = useState([])
    const [userName, setUserName] = useState('')

    const chatId = nextId()

    const inputSearch = e => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        users.map(el => el.id === userId && setUserName(el.login))
        setUserList(users.map(e => [e.login, e.id]))
    }, [search, userId, users])
    const chatTitle = chats.map(e => e.title)

    const addChat = (user) => {

        for (let i = 0; i < chatTitle.length; i++) {
            let title = chatTitle[i]
            if (title === userName + "/" + user[0]) {
                alert("Oops! Such a chat already exists...")
                setSearch('')
                return
            }
        }

        const url = noteService.chatsUrl
        const chatObject = {
            members: [userId, user[1]],
            title: userName + "/" + user[0],
            chatid: chatId,
            userid: userId,
        }

        axios.post(url, chatObject)
            .then(res => {
                console.log("Set chat")
                setChats(chats.concat(res.data))
                setSearch('')
            })

        const invUrl = noteService.invitationsUrl
        const invitationObject = {

            invited: [userId, user[1]]
        }
   
        axios.post(invUrl, invitationObject)
            .then(res => {
                console.log("Set invitation")
                setInvitations(invitations.concat(res.data))
            })
        setInvitations(invitations.concat(invitationObject))
        setSearch('')
    }


    return (
        <div className='search'>
            <input
                className='search-input'
                placeholder='Search'
                value={search}
                onChange={inputSearch}
            />
            <div className='search-userslist'>
                {search && userList.filter(e => e[0].toLowerCase().includes(search.toLocaleLowerCase()))
                .map((user, index) => 
                <li key={index} onClick={() => addChat(user)}  >{user[0]}
                </li>
                )
                }
            </div>

        </div>

    )
}

export default InputSearch