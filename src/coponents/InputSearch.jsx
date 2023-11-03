import React, { useState, useEffect } from 'react'
import axios from 'axios'
import nextId from "react-id-generator";
import noteService from '../sevices/notes';

function InputSearch({ users, chats, setChats, invitations, setInvitations, userId }) {
    const [search, setSearch] = useState('')
    const [userList, setUserList] = useState([])

    const chatId = nextId()

    const inputSearch = e => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        setUserList(users.map(e => e.login).filter(e => e.toLowerCase().includes(search.toLocaleLowerCase())))
    }, [search])


    const addChat = (name) => {
        for (let chatName of chats) {
            if (chatName.title === name && chatName.userid === userId) {
                console.log("Oops!")
                setSearch('')
                return
            }
        }
        const url = noteService.chatsUrl
        const chatObject = {
            title: name,
            chatid: chatId,
            userid: userId
        }
        console.log(chatObject)
        axios.post(url, chatObject)
            .then(res => {
                console.log("Okay")
                setChats(chats.concat(res.data))
            })

        const invUrl = noteService.invitationsUrl
        const invitationObject = {
            chatid: chatId,
            userid: userId
        }
        console.log(invitationObject)
        axios.post(invUrl, invitationObject)
            .then(res => {
                console.log("Okay")
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
                {search && userList.map((name, index) => <li key={index} onClick={() => addChat(name)}  >{name}</li>)}
            </div>

        </div>

    )
}

export default InputSearch