import React, { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from '../services/notes'

function InputSearch({ users, chats, setChats, userList, setUserList, userId }) {
    const [search, setSearch] = useState('')
    const [userName, setUserName] = useState('')

    const inputSearch = e => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        let userlist = []
        users.map(el => {
            userlist = [...userlist, [el.login, el.id]]
            if (el.id === userId) setUserName(el.login)
        })
        setUserList(userlist.filter(user => user[1] !== userId))

    }, [search, userId])

    const addChat = (user) => {

        for (let i = 0; i < chats.length; i++) {
            const chatid = chats[i].chatid
            if (chatid === ([userId, user[1]].sort().join(''))) {
                alert("Oops! Such a chat already exists...")
                setSearch('')
                return
            }
        }

        const url = noteService.chatsUrl
        const chatObject = {
            members: [userId, user[1]].sort(),
            title: userName + "/" + user[0],
            chatid: [userId, user[1]].sort().join(''),
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
                {search &&
                    userList.filter(e => e[0].toLowerCase().includes(search.toLowerCase()))
                        .map((user, index) =>
                            <li className='chatList'  key={index} onClick={() => addChat(user)}>{user[0]}</li>
                        )}
            </div>

        </div>

    )
}

export default InputSearch