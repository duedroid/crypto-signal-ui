import axios from 'axios'


export default {
  install: (app, options) => {
    // app.config.globalProperties.$axios = axios;
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    })
    app.provide('axios', axiosInstance)
  }
}