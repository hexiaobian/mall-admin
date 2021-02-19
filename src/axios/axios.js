import axios from 'axios';
import store from '@/store/index.js'
const instance = axios.create({
  baseURL: ' https://mallapi.duyiedu.com/'
})

instance.interceptors.request.use((config) => {
  if (config.url.includes('passport')) {
    return config
  } else {
    const params = {
      ...config.params,
      appkey: store.state.user.appkey
    }
    config = {
      ...config,
      params
    }
    console.log(config)
    return {
      ...config,
      params: params,
    }
  }
}, (error) => Promise.reject(error))

instance.interceptors.response.use((res) => {
  return res.data
}, (error) => Promise.reject(error))

export default instance
