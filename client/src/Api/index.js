import axios from 'axios';

// const url = 'http://localhost:5000'
const url = 'https://course-hub-server.onrender.com'

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});

export const getAllPrograms = () => API.get(`/programs/getAllPrograms`);
export const getProgramsByDomain = (domain) => API.get(`/programs/getProgramsByDomain?Domain=${domain}`);
export const createProgram = (formData) => API.post(`/programs/createProgram`, formData);
export const editProgram = (formData) => API.patch(`/programs/updateProgram`, formData);
export const deleteProgram = (Program_id) => API.delete(`/programs/deleteProgram/${Program_id}`);

export const signin = (formData) => API.post(`/users/signin`, formData);
export const signup = (formData) => API.post(`/users/signup`, formData);