import React, { useState } from 'react'

import {Divider, Select, message} from 'antd'
import { Link, useHistory } from 'react-router-dom'
import axiosInstance from '../component/axiosInstance'

const Register = () => {
    const [fullname, setfullname] = useState()
    const [password, setpassword] = useState()
    const [email, setemail] = useState()
    const [role, setrole] = useState()
    const history=  useHistory();
    const handleRegister=async()=>{
        const data={ fullname, email, password, role }
        console.log(data)
        if(fullname && role && email && password ===undefined){
            return message.info("All Field are Mandatory")
        }
        
        try {
            const callapi = await axiosInstance.post("/signup", {...data})
            const response = callapi.data;
            console.log(response)
            message.success("Account Created Successfully ...!")
            window.localStorage.setItem('token',response.token)
            if(response.data.role==="admin"){
                history.push("/dashboard/specialist")
            }
            else{
                history.push("/dashboard")
            }
        } catch (error) {
            console.log(error)
            message.error("Something went wrong ...!")
        }
    }
    return (
        <div className="login" >
  
        <div className="loginBox" >
        <h4>Register</h4>

          <input onChange={(e)=>setfullname(e.target.value)} placeholder="Enter Full Name"/>
          <input onChange={(e)=>setemail(e.target.value)} placeholder="Enter Email"/>
          <input onChange={(e)=>setpassword(e.target.value)} placeholder="Enter password"/>
          <select   defaultValue="Select Role" >
             
              <option onClick={(e)=>setrole(e.target.value)} key="admin" value="admin" >Specialist</option>
              <option onClick={(e)=>setrole(e.target.value)} key="user" value="user" >Patient</option>
          </select>
          <button onClick={()=>handleRegister()} >Register</button>

          <Divider orientation="center">or</Divider>
          <h4> <Link  to="/"> Already have an Account ? Login Now</Link></h4>

        </div>
    </div>
    )
}

export default Register
