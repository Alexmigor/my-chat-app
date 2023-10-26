import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Message from './coponents/Message'
import AddMessage from './coponents/AddMessage'
import Users from './coponents/Users'
import noteService from './sevices/notes'




function App() {
  const [notes, setNotes] = useState([])
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState(0)

  const deleteMessage = (id) => {
    noteService
      .deleted(id)
      .then(setNotes(notes.filter(n => n.id !== id)))
  }
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [])
  useEffect(() => {
    noteService
      .getAllUsers()
      .then(user => setUsers(user))
  }, [])
  const choiceUserId = () => {
    const choiceUser = document.getElementById("users").value;
    setUserId(choiceUser)
  }
  return (
    <>
      <div className='container'>
      <Users users={users} choiceUserId={choiceUserId} />
        <h1>Welcome to the Chat</h1>
        <div className='server'>
          <ol>
            {notes.map(el =>
              <li key={el.id} style={{ backgroundColor: el.author == userId ? "#f8f8f8" : "white" }} >
                <Message
                  content={el.content}
                  id={el.id}
                  deleteMessage={() => deleteMessage(el.id)}
                />
              </li>
            )}
          </ol>
          <h2>You can add your message in the field below</h2>
          <AddMessage notes={notes} setNotes={setNotes} userId={userId} />
        </div>

        {/* ************************************************************************************ */}
        {/* Logo Vite + React */}
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

    </>
  )
}

export default App
