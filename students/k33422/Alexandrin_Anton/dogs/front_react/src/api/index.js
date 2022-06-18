import axios from "axios";
import useController from "../store";

// const API = axios.create({
//     // withCredentials: true,
//     // headers: {
//     //     'Content-Type': 'application/json'
//     // }
// })

const BACK = 'http://localhost:8000'


export const register = () => {
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    this.axios.defaults.headers.common.Authorization = `token ${authToken}`
  }
  axios.post(`${BACK}/auth/token/users`)
    .then(({data}) => {
      // localStorage.setItem('token', data.auth_token)
    })
}

export const login = (credentials) => {
  axios.post(`${BACK}/auth/token/login`, credentials)
    .then(({data}) => {
      const { controller } = useController();
      controller.setLogged(true);
      localStorage.setItem('authToken', data.auth_token)
    })
}

export const logout = () => {
  axios.post(`${BACK}/auth/token/logout`)
    .then(({data}) => {
      const { controller } = useController();
      controller.setLogged(false);
      localStorage.removeItem('authToken')
    })
}

export const getUser = () => {
  axios.get(`${BACK}/auth/users/me/`)
    .then(({data}) => {
      return data;
    })
}