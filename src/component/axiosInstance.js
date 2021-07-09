
import axios from "axios";


const  axiosInstance = axios.create({
    baseURL: 'https://ajayprojects.herokuapp.com/api'
    // headers:{
    //     'Authorization':token? `Bearer ${token}`
    // }
   })


  
export default axiosInstance;