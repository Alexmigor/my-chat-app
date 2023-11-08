import React, { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from '../sevices/notes'

function InputSearch({ users, chats, setChats, members, userList, setUserList, userId }) {
    const [search, setSearch] = useState('')
    const [userName, setUserName] = useState('')

    const inputSearch = e => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        users.map(el => el.id === userId && setUserName(el.login))
        setUserList(users.map(e => [e.login, e.id]))
    }, [search, userId, users])

    const addChat = (user) => {

        const chatId = chats.map(e => e.chatid)

        for (let i = 0; i < chatId.length; i++) {
            let chatid = chatId[i]
            if (chatid === ([userName, user[0]].sort().join(''))) {
                alert("Oops! Such a chat already exists...")
                setSearch('')
                return
            }
        }

        const url = noteService.chatsUrl
        const chatObject = {
            members: [userId, user[1]].sort(),
            title: userName + "/" + user[0],
            chatid: [userName, user[0]].sort().join(''),
            userid: userId,
        }

        axios.post(url, chatObject)
            .then(res => {
                console.log("Set chat")
                setChats(chats.concat(res.data))
                setSearch('')
            })
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
                {search && userList.filter(e => e[0].toLowerCase().includes(search.toLocaleLowerCase())).map((user, index) => <li key={index} onClick={() => addChat(user)}  >{user[0]}</li>)}
            </div>

        </div>

    )
}

export default InputSearch