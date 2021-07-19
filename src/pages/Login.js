import React, { useState } from 'react'
import './style.css'
import {Divider} from 'antd'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import axiosInstance from '../component/axiosInstance'


const Login = () => {
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const history=  useHistory()
    
    const token = window.localStorage.token;
    if(token){
         history.push("/dashboard")
    }
    const handleLogin=async()=>{
        
        const data={ email, password }
        console.log(data)
        try {
            const callapi = await axiosInstance.post('/signin', {...data})
            const resposne = callapi.data;
            console.log(resposne)
            window.localStorage.setItem('token',resposne.token)
            if(resposne.user.role==="admin"){
                history.push("/dashboard/specialist")
            }
            else{
                history.push("/dashboard")
            }
        } catch (error) {
            console.log(error)
        }
    
    }
    return (
        <div className="login" >
  
            <div className="loginBox" >
            <h4>Login</h4>
              <input onChange={(e)=>setemail(e.target.value)} placeholder="Enter Email"/>
              <input type="password" onChange={(e)=>setpassword(e.target.value)}  placeholder="Enter Password"/>
              <button onClick={()=>handleLogin()} >Login</button>

              <Divider orientation="center">or</Divider>
              <h4> <Link to="/register" >New to Plateform ? Register Now</Link> </h4>

            </div>
        </div>
    )
}

export default Login
