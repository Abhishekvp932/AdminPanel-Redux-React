import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:2323/api',
})

export default api