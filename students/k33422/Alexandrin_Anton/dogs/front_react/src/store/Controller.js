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

  getUser = () => {
    return axios.get(`${this.BACK}/auth/users/me/`)
      .then(({data}) => data);
  }

  getExperts = (page) => {
    const params = {
      params: {
        page: page,
      }
    }
    return axios.get(`${this.BACK}/all_experts/`, params)
      .then(({data}) => data);
  }

  getParticipants = (page, minAge, maxAge, isOrdered) => {
    const params = {
      params: {
        page: page,
        age_min: minAge,
        age_max: maxAge,
        ordering: isOrdered ? 'vaccinated' : 'age'
      }
    }
    return axios.get(`${this.BACK}/all_participants/`, params)
      .then(({data}) => data);
  }

  getRings = (searchParams, page) => {
    const {breed, showType} = searchParams;
    // sorry :/
    let searchString = `${breed},${showType}`;
    if (breed && showType) {
      searchString = `${breed},${showType}`;
    } else if (breed) {
      searchString = breed;
    } else if (showType) {
      searchString = showType;
    } else {
      searchString = '';
    }

    const params = {
      params: {
        search: searchString,
        page: page
      }
    }
    return axios.get(`${this.BACK}/rings_search/`, params)
      .then(({data}) => data);
  }

  getShows = () => {
    return axios.get(`${this.BACK}/all_shows/`)
      .then(({data}) => data);
  }

  getReport = (year) => {
    return axios.get(`${this.BACK}/report/${year}`, )
      .then(({data}) => data);
  }

  getBreedExperts = () => {
    return axios.get(`${this.BACK}/breed_experts/`, )
      .then(({data}) => data);
  }

  getBreedsCount = () => {
    return axios.get(`${this.BACK}/breeds_count/`, )
      .then(({data}) => data);
  }
}

const controller = new Controller();

export default controller;