import axios from 'axios';

const supabaseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default supabaseInstance;
