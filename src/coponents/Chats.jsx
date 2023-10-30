import React, { useEffect } from 'react'
import { FaHandPointDown } from "react-icons/fa6";
import noteService from '../sevices/notes';

function Chats({ chats, setChats, setChatId }) {

  useEffect(() => {
    noteService
      .getChats()
      .then(user => setChats(user))

  }, [])
 
  const choiceChat = (id) => {
    setChatId(id)
  }
  return (
    <>
      <div className='chat-list'>
        <h3 style={{ textAlign: 'center' }}>Select chat: </h3>
        <p  style={{ textAlign: 'center' }}><FaHandPointDown style={{ color: '#00bfff' }} /></p>
        {chats.map(el => <p className='link' key={el.id} onClick={() => choiceChat(el.chatid)}>{el.title} </p>)}
        <button className='chat-list-button' onClick={() => setChatId('')}>All</button>
      </div >
    </>
  )
}
export default Chats