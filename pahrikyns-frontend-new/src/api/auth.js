import axios from "axios";

const API = "http://localhost:5000/api/auth"; // change when backend ready

export const loginUser = async (payload) => {
  return axios.post(`${API}/login`, payload);
};

export const registerUser = async (payload) => {
  return axios.post(`${API}/register`, payload);
};
