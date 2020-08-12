import axios from 'axios';
import baseURL from './config.js'


console.log('coolbeans', baseURL)

const token = window.localStorage.getItem('token')
let t = token ? token.substring(0,15):null
console.log(t, process.env.NODE_ENV)

const API = axios.create({ withCredentials: true, baseURL,  headers: { Authorization: `Bearer ${token}` }});
console.log(API)
const actions = {
  getUser: async () => {
    return await API.get(`/user`)
  },
  signUp: async (user) => {
    let res = await API.post('/signup', user)
    let token =  res?.data?.token
    window.localStorage.setItem('token',token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return res
  },
  logIn: async (user) => {
    let res = await API.post('/login', user)
    let token =  res?.data?.token
    window.localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return res
  },
  logOut: async () => {
    window.localStorage.removeItem('token')
    return await API.get('/logout')
  },
  addPost: async(message) => {
    return await API.post('/new-post', message)
  },
  getAllPosts: async () => {
    return await API.get('/all-posts')
  },
  getMyPosts: async () => {
    return await API.get('/my-posts')
  },
  helpUser: async (user) => {
    return await API.post('/help', user)
  },

};


API.interceptors.response.use((response) => response, (error) => console.error(error?.response?.data))


export default actions;
