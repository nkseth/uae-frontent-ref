import axios from 'axios'

const baseurl=process.env.REACT_APP_ENDPOINT

console.log(baseurl)
const axiosInstance=axios.create({
    baseURL:baseurl,
   
})
export default axiosInstance