import React, { useState } from 'react'
import axios from 'axios'
import nextId from "react-id-generator";
import noteService from '../sevices/notes';



function AddMessage({ notes, setNotes, userId, chatId }) {
    const [newMessage, setNewMessage] = useState('')
    const elId = nextId()
    const onchange = (e) => {
        setNewMessage(e.target.value)
    }
    const addMessage = () => {
        const url = noteService.baseUrl
        const time = new Date()
        const messageObject = {
            content: newMessage,
            date: time,
            author: userId,
            chatid: chatId
        }
        console.log(messageObject)
        axios.post(url, messageObject)
            .then(res => {
                console.log("Okay")
                setNewMessage(notes.concat(res))
                setNewMessage('')
            })
        setNotes(notes.concat({
            author: userId,
            content: newMessage,
            id: elId,
            chatid: chatId
        }))
        setNewMessage('')
    }

    return (
        <div className='add-message'>
            <textarea
                className='add-message-textarea'
                placeholder='Type your message here...'
                value={newMessage}
                onChange={onchange}
            />
            <button onClick={addMessage}>send</button>
        </div>
    )
}

export default AddMessage