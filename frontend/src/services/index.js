import axios from 'axios';
let baseURL;

/**CHANGE THIS**/
process.env.NODE_ENV === 'production'
  ? (baseURL = '/api') //https://rocky-ocean-03987.herokuapp.com/  
  : (baseURL = 'http://localhost:5000/api');  
/****/  
console.log(process.env, baseURL)

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get('/is-logged-in')
  },
  signUp: async (user) => {
    return await service.post('/signup', user)
  },
  logIn: async (user) => {
    return await service.post('/login', user)
  },
  logOut: async () => {
    return await service.get('/logout')
  }
};

export default actions;
