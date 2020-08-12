
let baseURL; 
if( process.env.NODE_ENV === 'production' ) {
  if(process.env.REACT_APP_API){ 
    baseURL = `${process.env.REACT_APP_API}/api` //Netlify 
  } else {
    baseURL = `/api` //Heroku or 5000 
  }
} else {
  baseURL = `http://localhost:5000/api` //3000
}

export default baseURL