import React from 'react'


function Chats({ chats, members, setChatId, userId }) {
  const choiceChat = (id) => {
    setChatId(id)
  }
  const findUserChats = (cht, mem) => {
    const result = []
    for (let i = 0; i < cht.length; i++) {
      let chatUser = cht[i]
      for (let j = 0; j < mem.length; j++) {
        let member = mem[i][j]
        if (userId === member) {
          result.push(chatUser)
        }
      }
    }
    return result
  }
  const chatUser = chats.map(el => el)
  const invChat = findUserChats(chatUser, members)


  return (
    <>
      <div className='chat-list'>
        {userId && invChat.map((el) =>
          <p className='link' key={el.id} onClick={() => choiceChat(el.chatid)}>
            Chat: {el.title}
          </p>)}
      </div >
    </>
  )
}
export default Chats