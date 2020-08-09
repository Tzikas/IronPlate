import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  // ? (baseURL = 'https://sheltered-dawn-07708.herokuapp.com')
  ? (baseURL = 'window.location.origin')
  : (baseURL = 'http://localhost:5000');


const token = window.localStorage.getItem('token')
console.log(token)
const service = axios.create({ withCredentials: true, baseURL,  headers: { Authorization: `Bearer ${token}` }});

const actions = {
  getUser: async () => {
    //Check if token 
    // let token = window.localStorage.getItem('token')    
    return await service.get(`/profile`)
  },
  signUp: async (user) => {
    let res = await service.post('/signup', user)
    window.localStorage.setItem('token', res.data?.token)
    return res
  },
  logIn: async (user) => {
    let res = await service.post('/login', user)
    window.localStorage.setItem('token', res.data?.token)
    return res
  },
  logOut: async () => {
    window.localStorage.removeItem('token')
    return await service.get('/logout')
  }
};


// service.post('/api/posts').then(res => console.log(res))

export default actions;
