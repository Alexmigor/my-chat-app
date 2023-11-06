import React, { useEffect } from 'react'
import noteService from '../sevices/notes';

function Chats({ chats, setChats, setChatId, userId }) {

  useEffect(() => {
    noteService
      .getChats()
      .then(user => setChats(user))
  }, [])

  const choiceChat = (id) => {
    userId
    setChatId(id)
  }

  const chatUser = chats.map(el => el)
  const member = chats.map(el => el.members)

  const findInvitations = (cht, mem) => {
    const result = []
    for (let i = 0; i < cht.length; i++) {
      let chatUser = cht[i]
      for (let j = 0; j < mem.length; j++) {
        let memUser = mem[i][j]
        if (userId === memUser) {

          result.push(chatUser)
        }
      }
    }

    return result
  }
  const invChat = findInvitations(chatUser, member)


  return (
    <>
      <div className='chat-list'>
        {invChat.map(el =>
          <p className='link' key={el.id} onClick={() => choiceChat(el.chatid)}>
            Chat: {el.title}
          </p>)}
      </div >
    </>
  )
}
export default Chats