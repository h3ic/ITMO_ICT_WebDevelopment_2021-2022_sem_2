import {makeAutoObservable} from "mobx";
import axios from "axios";

class Controller {
  isLogged = false;
  currParticipantId;

  constructor() {
    makeAutoObservable(this)
  }

  BACK = 'http://localhost:8000'

  setLogged = (isLogged) => {
    this.isLogged = isLogged;
  }

  setCurrParticipantId = (id) => {
    this.currParticipantId = id;
  }

  register = (form) => {
    axios.post(`${this.BACK}/auth/users/`, form)
      .then(({data}) => data)
  }

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
    let searchString;
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

  getParticipant = (id) => {
    return axios.get(`${this.BACK}/participants/${id}`)
      .then(({data}) => data);
  }

  getParticipantPhoto = (id) => {
    const params = {
      params: {
        participant_id: id
      }
    }
    return axios.get(`${this.BACK}/participant_photo/`, params)
      .then(({data}) => data);
  }

  updateParticipant = (id, info) => {
    console.log(info);
    return axios.patch(`${this.BACK}/update_participant/${id}`, info)
      .then(({data}) => data);
  }

  deleteParticipant = (id) => {
    return axios.delete(`${this.BACK}/delete_participant/${id}`)
      .then(({data}) => data);
  }
}

const controller = new Controller();

export default controller;