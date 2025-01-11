import axios from "axios";


// console.log(import.meta.env.REACT_APP_API_URL)
const apiClient = axios.create({
    // baseURL: import.meta.env.REACT_APP_API_URL,
    baseURL: 'http://localhost:8080/api',
    withCredentials: true, 
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }, 
    
})


apiClient.interceptors.response.use((res)=>{
    return res;
},(error)=>{
    console.log(error.message)
    return Promise.reject(error);
})



export default apiClient