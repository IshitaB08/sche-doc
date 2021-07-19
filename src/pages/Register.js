import React, { useState } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import {Divider, Select,  message, Button} from 'antd'
import { Link, useHistory } from 'react-router-dom'
import axiosInstance from '../component/axiosInstance'
import firebaseConfig from '../firebase'
import Modal from 'antd/lib/modal/Modal';


firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().languageCode = 'it';
const Register = () => {
    const [fullname, setfullname] = useState()
    const [otpOpen, setotpOpen] = useState(false)
    const [password, setpassword] = useState()
    const [email, setemail] = useState()
    const [role, setrole] = useState("admin")
   const Option = Select.Option
    const [modelOpen, setmodelOpen] = useState(false)
    const history=  useHistory();
    const handleRegister=async()=>{
        const data={ fullname, email, password, role }
        console.log(data)
        if(fullname && role && email && password ===undefined){
            return message.info("All Field are Mandatory")
        }
            RegisterAction(data)
       
    }
    const RegisterAction=async(data)=>{
        console.log(data)
        const signindata = data
        try {
            const callapi = await axiosInstance.post("/signup", {...signindata})
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
    const handlegoogle=()=>{
        
        console.log("with google")
      
        
    }
   const firebaseAction=()=>{
       console.log(role)
         const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
          });
          firebase.auth().languageCode = 'En';
    
          firebase.auth().signInWithPopup(provider).then(res=>{
              const { displayName, email} = res.user;
              const data ={
                  "fullname":displayName,
                  "email":email,
                  "role":role,
                  "password":"dami12345"
                  
              }
              RegisterAction(data)
          })
 
   }
   const facebookRegister=()=>{
    console.log(role)
      const provider = new firebase.auth.FacebookAuthProvider();

 
       firebase.auth().languageCode = 'En';
 
       firebase.auth().signInWithPopup(provider).then(res=>{
           const { displayName, email} = res.user;
           const data ={
               "fullname":displayName,
               "email":email,
               "role":role,
               "password":"dami12345"
               
           }
           RegisterAction(data)
       })

}
   const handlerole=(value)=>{
        setrole(value)
console.log(role, value )
   }



    return (
        <div className="login" >
  
        <div className="loginBox" >
        <h4>Register</h4>

          <input onChange={(e)=>setfullname(e.target.value)} placeholder="Enter Full Name"/>
          <input onChange={(e)=>setemail(e.target.value)} placeholder="Enter Email"/>
          <input type="password"  onChange={(e)=>setpassword(e.target.value)} placeholder="Enter Password"/>
          <select onChange={(e)=>setrole(e.target.value)}  defaultValue="Select Role" >
             
              <option  value="admin" >Specialist</option>
              <option value="user" >Patient</option>
          </select>
          {
              otpOpen? <input type="password"  onChange={(e)=>setpassword(e.target.value)} placeholder="Enter OTP"/>
              : ""
          }
         

          <button onClick={()=>setotpOpen(true)} >{otpOpen ? "Generated":"Generate OTP"}</button>
          <button onClick={()=>handleRegister()} >Register</button>
        

          <Divider orientation="center">or</Divider> 
          <Select onChange={(e)=>setrole(e)}  defaultValue="Select Role" >
             
             <Option value="admin" >Specialist</Option>
             <Option  value="user" >Patient</Option>
         
         </Select>
           <button  onClick={()=>firebaseAction()} >signup with Google</button>
           {/* <button  onClick={()=>facebookRegister()} >signup with Facebook</button> */}
          {/* <h4> <Link  to="/"> Already have an Account ? Login Now</Link></h4> */}

        </div>
    
    </div>
    )
}

export default Register
