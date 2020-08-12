import axios from 'axios';
import baseURL from './config.js'


console.log('coolbeans', baseURL)

const token = window.localStorage.getItem('token')
let t = token ? token.substring(0,15):null

console.log(t, 'yo',process.env.NODE_ENV)


let head = () =>  { 
  return { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } }
}

const API = axios.create({ withCredentials: true, baseURL ,  headers: { Authorization: `Bearer ${token}`} } );


const actions = {
  getUser: async () => {
    return await API.get(`/user`, head())
  },
  signUp: async (user) => {
    let res = await API.post('/signup', user, head())
    let token =  res?.data?.token
    window.localStorage.setItem('token',token)
    //FixMe 
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return res
  },
  logIn: async (user) => {
    let res = await API.post('/login', user, head())
    let token =  res?.data?.token
    window.localStorage.setItem('token', token)
    return res
  },
  logOut: async () => {
    window.localStorage.removeItem('token')
    return await API.get('/logout')
  },
  addPost: async(message) => {
    return await API.post('/new-post', message,  head())
  },
  getAllPosts: async () => {
    return await API.get('/all-posts',head())
  },
  getMyPosts: async () => {
    return await API.get('/my-posts', head())
  },
  getOtherPosts: async () => {
    return await API.get('/other-posts', head())
  },
  helpUser: async (user) => {
    return await API.post('/help', user, head())
  },
  resolvePost: async(post) => {
    return await API.post('/resolve-post', post)
  }

};


API.interceptors.response.use((response) => response, (error) => console.error(error?.response?.data))


export default actions;
