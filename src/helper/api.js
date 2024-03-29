import axios from 'axios';
import { getEnvironments } from './getEnviroments';

const { VITE_REMINDER_SERVER_URL } = getEnvironments();

export const api = axios.create({ baseURL: VITE_REMINDER_SERVER_URL });
