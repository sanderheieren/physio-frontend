import axios from 'axios';
import Cookies from 'js-cookie';

const customAxios = axios.create({
  baseURL: 'http://localhost:4000',
});

customAxios.interceptors.request.use(req => {
  const token = Cookies.get('auth');
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

customAxios.interceptors.response.use(
  res => {
    if (res.data?.token) {
      Cookies.set('auth', res.data.token);
    }
    return res;
  },
  error => {
    const customErrorMessage = error.response?.data?.error;
    console.log({ customErrorMessage });
    throw customErrorMessage ? customErrorMessage : { error };
  }
);

export default customAxios;
