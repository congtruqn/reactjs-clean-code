import axios from 'axios'
//import {ROUTE_NAME, routeTo} from '@services/routes'
//import {parseResponseData} from '@utils/Utils'

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('access'),
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

let isRefreshing = false
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void }[] = []

const processQueue = (error: null, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

axiosInstance.interceptors.request.use(
  function (config) {
    const access = localStorage.getItem('access')
    if (!access) {
      //store.dispatch(userSignOut())
    }
    if(config.headers){
      config.headers['Authorization'] = 'Bearer ' + access
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) :any {
    const originalRequest = error.config

    const refreshToken = window.localStorage.getItem('refresh')

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken &&
      !error.config.url.includes('/oauth/api-token-refresh/')
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({resolve, reject})
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return axiosInstance(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      return new Promise(function (resolve, reject) {
        axios
          .post('/oauth/api-token-refresh/', {refresh: refreshToken})
          .then(({data}) => {
            //data = parseResponseData(data)
            window.localStorage.setItem('access', data.access_token)
            window.localStorage.setItem('refresh', data.refresh_token)
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
            originalRequest.headers['Authorization'] = 'Bearer ' + data.token
            processQueue(null, data.token)
            resolve(axiosInstance(originalRequest))
          })
          .catch((err:any) => {
            processQueue(err, null)
            if (err.response?.status === 401) {
              window.localStorage.removeItem('access')
              window.localStorage.removeItem('refresh')
              //store.dispatch(userSignOut())
            }
            reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    } else if (error.response?.status === 403) {
      //history.push('/page/error-403')
    }

    return Promise.reject(error)
  }
)
export default axiosInstance
