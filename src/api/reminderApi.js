import axios from 'axios';

// TODO: pendiente de utilizar variables de entorno para esta URL.
export const api = axios.create({ baseURL: 'http://127.0.0.1:3000'})
