import React, { useState } from 'react'
import axios from 'axios'
import nextId from "react-id-generator";

const url = `/api/notes/`
// const url = 'http://localhost:3000/api/notes'

function AddMessage({ notes, setNotes, userId }) {
    const [newMessage, setNewMessage] = useState('')
    const elId = nextId()
    const onchange = (e) => {
        setNewMessage(e.target.value)
    }
    const addMessage = () => {
        const time = new Date()
        const messageObject = {
            content: newMessage,
            date: time,
            author: userId
        }
        axios.post(url, messageObject)
            .then(res => {
                console.log("Okay")
                setNewMessage(notes.concat(res))
                setNewMessage('')
            })
        setNotes(notes.concat({
            author: userId,
            content: newMessage, 
            id: elId 
        }))
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