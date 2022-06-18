import {makeAutoObservable} from "mobx";
import axios from "axios";

class Controller {
  isLogged = false;
  userData;
  expertsData;
  particpantsData;

  constructor() {
    makeAutoObservable(this)
  }

  BACK = 'http://localhost:8000'

  setLogged = (isLogged) => {
    this.isLogged = isLogged;
  }

  // register = () => {
  //   const authToken = localStorage.getItem('authToken')
  //   if (authToken) {
  //     axios.defaults.headers.common['Authorization'] = `token ${this.authToken}`
  //   }
  //   axios.post(`${this.BACK}/auth/token/users`)
  //     .then(({data}) => {
  //       // localStorage.setItem('token', data.auth_token)
  //     })
  // }

  login = async (credentials) => {
    const response = await axios.post(`${this.BACK}/auth/token/login`,
      credentials);
    this.setLogged(true);
    const authToken = response.data.auth_token;
    localStorage.setItem('authToken', authToken)
    axios.defaults.headers.common.Authorization = `token ${authToken}`;
  }

  logout = () => {
    this.setLogged(false);
    axios.post(`${this.BACK}/auth/token/logout`)
      .then(() => {
        localStorage.removeItem('authToken')
        delete axios.defaults.headers.common.Authorization;
      })
  }

  getUser = async () => {
    await axios.get(`${this.BACK}/auth/users/me/`)
      .then(({data}) => {
        this.userData = data
      });
  }

  getExperts = () => {
    axios.get(`${this.BACK}/all_experts/`)
      .then(({data}) => {
        this.expertsData = data
      });
  }

  getParticipants = (page) => {
    const params = {
      params: {
        page: page
      }
    }
    return axios.get(`${this.BACK}/all_participants/`, params)
      .then(({data}) => {
        console.log(data);
        return data;
        // this.participantsData = data
      });
  }
}

const controller = new Controller();

export default controller;