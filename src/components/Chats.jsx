import React, { useEffect, useState } from 'react'


function Chats({ chats, members, setChatId, userId }) {
  const choiceChat = (id) => {
    setChatId(id)
  }
  const findUserChats = (cht, mem) => {
    const result = []
    for (let i = 0; i < cht.length; i++) {
      const chatUser = cht[i]
      const chatMembers = mem[i] // get an array of members
      if (chatMembers && chatMembers.includes(userId)) {
        result.push(chatUser)
      }

    }
    return result
  }
  const [invChat, setInvChat] = useState()

  useEffect(() => {
    setInvChat(findUserChats(chats, members))
  }, [userId, members])


  return (
    <>
      <div className='chat-list'>
        {userId && invChat.map((el) =>
          <p className='link' key={el.id} onClick={() => choiceChat(el.chatid)}>
            Chat: {el.title}
          </p>)}
      </div>
    </>
  )
}
export default Chats