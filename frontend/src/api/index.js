import axios from 'axios';
import baseURL from './config.js'
import {NotificationContainer, NotificationManager} from 'react-notifications';


console.log('coolbeans baby', baseURL)

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
    return await API.get('/logout',  head())
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
  getMyResolvedPosts: async() => {
    return await API.get('/resolved-posts', head())
  },
  helpUser: async (user) => {
    return await API.post('/help', user, head())
  },
  resolvePost: async(post) => {
    return await API.post('/resolve-post', post, head())
  },
  cancelPost: async(post) => {
    return await API.post('/cancel-post', post,  head())
  },
  updateCalendly: async(post) => {
    return await API.post('/calendly', post, head())
  }

};


API.interceptors.response.use((response) => response, (error) => { 
  console.error(error?.response?.data, '????')
  if(error?.response?.data.name !== "JsonWebTokenError" )
    NotificationManager.error(String(error?.response?.data.message))
  else
    NotificationManager.error("Please signup or login")

})


export default actions;
