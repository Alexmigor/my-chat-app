import axios from 'axios';

const baseUrl = '/api/notes' 
const usersUrl = '/users'
const chatsUrl = '/chats'
const invitationsUrl = '/invitations'

// const baseUrl = 'http://localhost:3000/api/notes'
// const usersUrl = 'http://localhost:3000/users'
// const chatsUrl = 'http://localhost:3000/chats'
// const invitationsUrl = 'http://localhost:3000/invitations'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
} 
const getAllUsers = () => {
    const request = axios.get(usersUrl)
    return request.then(response => response.data)
} 
const getChats = () => {
    const request = axios.get(chatsUrl)
    return request.then(response => response.data)
}
const getOneChat = (id) => {
    const request = axios.get(`${chatsUrl}/${id}`)
    return request.then(response => response.data)
}

const getInvitations = () => {
    const request = axios.get(invitationsUrl)
    return request.then(response => response.data)
}

const createChat = newObject => axios.post(chatsUrl, newObject).then(response => response.data)
const updateChat = (id, newObject) => axios.put(`${chatsUrl}/${id}`, newObject).then(response => response.data)

const createInvitation = newObject => axios.post(invitationsUrl, newObject).then(response => response.data)

const create = newObject => axios.post(baseUrl, newObject).then(response => response.data)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)

const deleted = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data)



const noteService = {
    baseUrl,
    getAll,
    getAllUsers,
    getChats,
    getOneChat,
    getInvitations,
    create,
    update,
    deleted,
    createChat,
    updateChat,
    createInvitation,
    chatsUrl,
    invitationsUrl
}

export default noteService