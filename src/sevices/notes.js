import axios from 'axios';

const baseUrl = '/api/notes' 
const usersUrl = '/users'

// const baseUrl = 'http://localhost:3000/api/notes'
// const usersUrl = 'http://localhost:3000/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
} 
const getAllUsers = () => {
    const request = axios.get(usersUrl)
    return request.then(response => response.data)
} 

const create = newObject => axios.post(baseUrl, newObject).then(response => response.data)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)

const deleted = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data)



const noteService = { getAll, getAllUsers, create, update, deleted }

export default noteService