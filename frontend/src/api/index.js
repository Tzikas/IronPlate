import axios from 'axios';
import baseURL from './config.js'
import {NotificationContainer, NotificationManager} from 'react-notifications';


console.log(baseURL)

const token = window.localStorage.getItem('token')
let t = token ? token.substring(0,15):null

console.log('TOKEN',t, 'NODE_ENV',process.env.NODE_ENV)


let resetHead = () =>  {  
  return { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } }
}

const API = axios.create({ withCredentials: true, baseURL ,  headers: { Authorization: `Bearer ${token}`} } );


const actions = {
  getUser: async () => {
    return await API.get(`/user`, resetHead())
  },
  signUp: async (user) => {
    let res = await API.post('/signup', user, resetHead())
    window.localStorage.setItem('token', res?.data?.token)
    return res
  },
  logIn: async (user) => {
    let res = await API.post('/login', user, resetHead())
    window.localStorage.setItem('token', res?.data?.token)
    return res
  },
  logOut: async () => {
    window.localStorage.removeItem('token')
    return await API.get('/logout', resetHead())
  }
};

API.interceptors.response.use((response) => response, (error) => { 
  console.error(error?.response?.data)
  if(error?.response?.data.name !== "JsonWebTokenError" )
    NotificationManager.error(String(error?.response?.data.message))
  else
    NotificationManager.error("Please signup or login")

})

export default actions;
