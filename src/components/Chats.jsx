import React, { useEffect, useState } from 'react'
import axios from 'axios'
import noteService from '../services/notes'
import Modal from './Modal'
import AddUser from './AddUser'


function Chats({ chats, allMembers, setChatId, userId, chatId, users }) {
  const [isOpen, setIsOpen] = useState(false)
  const [addUser, setAddUser] = useState('')
  const [url, setUrl] = useState('')
  const [chatMembers, setChatMebers] = useState([])


  const choiceChat = (id) => {
    setChatId(id)
  }

  const choiceUser = () => {
    const userid = document.getElementById("addUser").value;
    setAddUser(userid)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const handleClose = (e) => {
    if (e.target.className === 'modal open') {
      onClose();
    }
  }

  const findUserChats = (cht, mem) => {
    const result = []
    for (let i = 0; i < cht.length; i++) {
      const chatUser = cht[i]
      const chatMembers = mem[i]
      if (chatMembers && chatMembers.includes(userId)) {
        result.push(chatUser)
      }
    }
    return result
  }
  const [invChat, setInvChat] = useState()

  const clickRight = (e, id) => {
    setChatId(id)
    e.preventDefault()
    setUrl(`${noteService.chatsUrl}/${id}`)
    setIsOpen(true)
    noteService
      .getOneChat(id)
      .then(initialChat => {
        setChatMebers(initialChat.members)
      })
  }

  const addMember = async (selectedMember) => {
    const chatMember = chatMembers && chatMembers.some(el => el.includes(selectedMember))
    !chatMember ? await axios.put(url, {
      members: [...chatMembers, selectedMember]

    }).then(() => {
      alert('User added to chat')
      setIsOpen(false)
    }) : alert('This user alredy exist')
  }

  useEffect(() => {
    setInvChat(findUserChats(chats, allMembers))
  }, [userId, allMembers, chatId])

useEffect(()=>{},[chatMembers, setChatMebers])
  return (
    <>
      <div className='chat-list'>
        <Modal isOpen={isOpen} onClose={onClose} handleClose={handleClose} >
          <AddUser users={users} setAddUser={setAddUser} addUser={addUser} choiceUser={choiceUser} />
          {/* <UserList users={users} addUser={addUser} choiceUser={choiceUser} selectName={"addUser"}/> */}
          <button onClick={() => addMember(addUser)} style={{ fontSize: '0.7rem' }}>Add</button>
        </Modal>
        {userId && invChat.map((el) =>
          <div className='link' key={el.id} onClick={() => choiceChat(el.id)}>
            <p title='Left click - to enter chat 
Right click - add user'
              onContextMenu={() => {
                clickRight(event, el.id)
              }}>{el.title}</p>
          </div>)}
      </div>
    </>
  )
}
export default Chats