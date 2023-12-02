import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Message from './components/Message'
import AddMessage from './components/AddMessage'
import Users from './components/Users'
import Chats from './components/Chats'
import InputSearch from './components/InputSearch'
import noteService from './services/notes'



function App() {
  const [notes, setNotes] = useState([])
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')
  const [chats, setChats] = useState([])
  const [allMembers, setAllMembers] = useState([])
  const [userList, setUserList] = useState([])
  const [chatId, setChatId] = useState('')


  useEffect(() => {
    noteService
      .getChats()
      .then(initialChats => setChats(initialChats))
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
    noteService
      .getAllUsers()
      .then(user => setUsers(user))

  }, [userId])

  useEffect(() => {
    setAllMembers(chats.map(el => el.members))
  }, [chats])

  const deleteMessage = (id) => {
    noteService
      .deleted(id)
      .then(setNotes(notes.filter(n => n.id !== id)))
  }


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
          userList={userList}
          setUserList={setUserList}
          userId={userId}
        />
        {users && <Users users={users} userId={userId} setUserId={setUserId} />}
      </div>
      <div className='container-server'>
        {<>
          <Chats
            chats={chats}
            setChats={setChats}
            chatId={chatId}
            setChatId={setChatId}
            userId={userId}
            setUserId={setUserId}
            allMembers={allMembers}
            users={users}
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
      {/* <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a> */}
    </>
  )
}

export default App
