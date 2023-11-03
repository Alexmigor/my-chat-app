import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Message from './coponents/Message'
import AddMessage from './coponents/AddMessage'
import Users from './coponents/Users'
import Chats from './coponents/Chats'
import InputSearch from './coponents/InputSearch'
import noteService from './sevices/notes'




function App() {
  const [notes, setNotes] = useState([])
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')
  const [chats, setChats] = useState([])
  const [chatId, setChatId] = useState('')
  const [invitations, setInvitations] = useState([])


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [userId, chatId])

  useEffect(() => {
    noteService
      .getAllUsers()
      .then(user => setUsers(user))
  }, [])

  const deleteMessage = (id) => {
    noteService
      .deleted(id)
      .then(setNotes(notes.filter(n => n.id !== id)))
  }
  const choiceUser = () => {
    const userId = document.getElementById("users").value;
    localStorage.setItem('userId', JSON.stringify(userId))
    setUserId(userId)

  }

  useEffect(() => {
    const savedUser = localStorage.getItem('userId')
    if (savedUser) {
      setUserId(JSON.parse(savedUser))
    }
  }, [])

  const isChat = id => id.chatid === chatId
  const display = chatId ? notes.filter(isChat)
    .map((el) => {
      const user = users.find(user => user.id === el.author)
      const name = user ? user.login : ''

      return <li key={el.id} style={{ backgroundColor: el.author === userId ? "#f8f8f8" : "white" }} >
        <Message
          content={el.content}
          userId={userId}
          name={name}
          id={el.id}
          authorId={el.author}
          deleteMessage={() => deleteMessage(el.id)}
        />
      </li>

    }
    ) : notes.map((el) => {
      const user = users.find(user => user.id === el.author)
      const name = user ? user.login : ''

      return <li key={el.id} style={{ backgroundColor: el.author === userId ? "#f8f8f8" : "white" }} >
        <Message
          content={el.content}
          userId={userId}
          chatId={chatId}
          name={name}
          id={el.id}
          authorId={el.author}
          deleteMessage={() => deleteMessage(el.id)}
        />
      </li>
    }
    )

  return (
    <>
      <div className='container-input'>
        <InputSearch
          users={users}
          chats={chats}
          setChats={setChats}
          invitations={invitations}
          setInvitations={setInvitations}
          userId={userId}
        />
        <Users users={users} choiceUserId={choiceUser} userId={userId} />
      </div>
      <div className='container-server'>
        {userId && <>
          <Chats
            chats={chats}
            setChats={setChats}
            chatId={chatId}
            setChatId={setChatId}
            userId={userId}
            invitations={invitations}
            setInvitations={setInvitations}
          />
          <div className='container-messages'>
            <ol>
              {display}
            </ol>
            <AddMessage notes={notes} setNotes={setNotes} userId={userId} chatId={chatId} />
          </div>
        </>}
      </div>
      {/* ************************************************************************************ */}
      {/* Logo Vite + React */}
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>

    </>
  )
}

export default App
