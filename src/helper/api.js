import axios from 'axios';
import { getEnvironments } from '.';

const { VITE_REMINDER_SERVER_URL } = getEnvironments();

debugger;
export const api = axios.create({ baseURL: VITE_REMINDER_SERVER_URL });
