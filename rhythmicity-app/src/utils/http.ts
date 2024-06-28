import axios from 'axios'

export const https = axios.create({
    baseURL: 'https://localhost',
    withCredentials: true
})

https.interceptors.response.use(
    response => response,
    async error => {
        console.log(error)
        if (error?.response?.status === 403 || error?.response?.status === 401) {
            window.location.assign("/sign-in")
        }
        return Promise.reject(error)
    }
)