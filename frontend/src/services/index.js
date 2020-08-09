import axios from 'axios';
import baseURL from './config.js'


console.log('coolbeans', baseURL)

const token = window.localStorage.getItem('token')
console.log(token, process.env)

const API = axios.create({ withCredentials: true, baseURL,  headers: { Authorization: `Bearer ${token}` }});

const actions = {
  getUser: async () => {
    return await API.get(`/user`)
  },
  signUp: async (user) => {
    let res = await API.post('/signup', user)
    window.localStorage.setItem('token', res?.data?.token)
    return res
  },
  logIn: async (user) => {
    let res = await API.post('/login', user)
    window.localStorage.setItem('token', res?.data?.token)
    return res
  },
  logOut: async () => {
    window.localStorage.removeItem('token')
    return await API.get('/logout')
  }
};


API.interceptors.response.use((response) => response, (error) => console.error(error?.response?.data))


export default actions;
