import axios from 'axios';

export default axios.create({
  baseURL: 'https://lambda-study-app.herokuapp.com/api'
})