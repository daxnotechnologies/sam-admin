import  axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

//parents APIs
export const addParent = (formData) => API.post('addParents/addParent', formData);

//tutor APIs
export const addTutor = (formData) => API.post('addTutor/addTutor', formData);

//job APIs
export const addJob = (formData) => API.post('addJob/addJob', formData);