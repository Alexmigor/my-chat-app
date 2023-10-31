import React, { useEffect, useState } from 'react'
import { FaHandPointDown } from "react-icons/fa6";
import noteService from '../sevices/notes';

function Chats({ chats, setChats, setChatId, userId }) {
  const [invitations, setInvitations] = useState([])

  useEffect(() => {
    noteService
      .getInvitations()
      .then(invitation => setInvitations(invitation))

  }, [])

  useEffect(() => {
    noteService
      .getChats()
      .then(user => setChats(user))
  }, [])
 
  const choiceChat = (id) => {
    setChatId(id)
  }

  const findInvitations = () => {
    const inv = invitations.filter(e => e.userid === userId).map(e => e)
    const cht = chats.map(e => e)
    const result = []

    for (let i = 0; i < inv.length; i++) {
      let invid = inv[i].chatid
      for (let j = 0; j < cht.length; j++) {
        let chatid = cht[j].id
        if (invid === chatid) {
          result.push(cht[j])
        }
      }
    }
    return result
  }
  const invChat = findInvitations().map(e => e)
  return (
    <>
      <div className='chat-list'>
        {invChat.map(el => <h4 className='link' key={el.id} onClick={() => choiceChat(el.chatid)}>{el.title} </h4>)}
        {/* <button className='chat-list-button' onClick={() => setChatId('')}>All</button> */}
      </div >
    </>
  )
}
export default Chats