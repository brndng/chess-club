import axios from "axios";
axios.defaults.withCredentials = true;

const adapter = {
  get(endpoint) {
    return axios.get(`${process.env.HOST}${endpoint}`);
  },

  post(endpoint, data) {
    return axios.post(`${process.env.HOST}${endpoint}`, data);
  },

  put(endpoint, data) {
    return axios.put(`${process.env.HOST}${endpoint}`, data);
  }
};

export default adapter;
