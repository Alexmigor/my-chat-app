import React, { useState } from 'react'
import axios from 'axios'
import noteService from '../sevices/notes'

function Message({ id, content, authorId, deleteMessage, name, userId}) {

    const [message, setMessage] = useState(content)
    const [editMessage, setEditMessage] = useState(message || '')
    const [isButton, setIsButon] = useState(true)
    const url = `${noteService.baseUrl}/${id}`


    const getOne = async () => {
        const res = await axios.put(url, {
            content: editMessage
        })
    }
    const edit = () => {
        setIsButon(!isButton)
        setMessage(editMessage)
        if (editMessage !== message) {
            getOne()
        }
    }
    const onchange = (e) => {
        setEditMessage(e.target.value)

    }
    const handleKeypress = e => {
        if (e.keyCode === 13 && message !== '') {
            edit()
        }
    }

    return (
        <div className="messages">
        {isButton && (<>
            <span style={{ color: 'gray' }}>{name}: </span><span className='messages-text' >{message}</span>
        </>
        )}
        {!isButton && <textarea
            className='input-text'
            value={editMessage}
            placeholder={message}
            onChange={onchange}
            onKeyDownCapture={handleKeypress}
            autoFocus
        />}
        {userId == authorId ? <div className='button-box'>
            <button onClick={edit}>{isButton ? 'edit' : 'save'}</button>
            <button onClick={deleteMessage} className='x-button'>X</button>
        </div> : <div className='button-zero'></div> }
    </div>
    )
}

export default Message