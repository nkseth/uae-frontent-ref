import axios from 'axios'

const baseurl=process.env.REACT_APP_ENDPOINT


const axiosInstance=axios.create({
    baseURL:baseurl,
   
})
export default axiosInstance