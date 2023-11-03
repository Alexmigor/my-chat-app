import React, { useEffect, useState } from 'react'
import noteService from '../sevices/notes';

function Chats({ chats, setChats, setChatId, userId, invitations, setInvitations  }) {
 

  useEffect(() => {
    noteService
    .getChats()
    .then(user => setChats(user))
  }, [setChats])
  
  const choiceChat = (id) => {
    userId
    setChatId(id)
  }
  useEffect(() => {
    noteService
      .getInvitations()
      .then(invitation => setInvitations(invitation))

  }, [])

  // Создал 2 массива для сравнения наличия приглашений в чат
  const inv = invitations.filter(e => e.userid === userId).map(e => e)
  const cht = chats.map(e => e)

  // Решение на встроенном цикле
  const findInvitations = (inv, cht) => {
    const result = []
    for (let i = 0; i < inv.length; i++) {
      let invid = inv[i].chatid
      for (let j = 0; j < cht.length; j++) {
        let chatid = cht[j].chatid
        if (invid === chatid) {
          result.push(cht[j])
        }
      }
    }
    return result
  }
  const invChat = findInvitations(inv, cht).map(e => e)

  // Решение по последним рекомендациям для JS разработчиков
  const invChat2 = cht.filter(item2 => {
    return inv.some(item1 => item1.chatid === item2.chatid)
  })
  
  return (
    <>
      <div className='chat-list'>
        {invChat2.map(el => <p className='link' key={el.id} onClick={() => choiceChat(el.chatid)}>{el.title} </p>)}
      </div >
    </>
  )
}
export default Chats