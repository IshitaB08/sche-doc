import React, { useEffect, useState } from 'react'
import { Avatar ,Divider, Button, message, Select, DatePicker } from 'antd'
import {UserOutlined, EnvironmentFilled, SafetyOutlined, CheckCircleFilled, CalendarFilled} from '@ant-design/icons'
import {AppointmentBoxSpec} from '../component/AppointmentBox'
import { useHistory } from 'react-router'
import axiosInstance from '../component/axiosInstance'
import slotdata, { Specialization } from '../component/slotData'
import moment from 'moment';
const SpecialistDashboard = () => {
    const [data, setdata] = useState()
    const [myappoint, setmyappoint] = useState([])
    const [location, setlocation] = useState()
    const [timimg, settiming] = useState()
    const [available, setavailable] = useState()
    const [scope, setscope] = useState()
    const [completeprofile, setcompleteprofile] = useState(false)
    const [loaded, setloaded] = useState()
    const [starttime, setstarttime] = useState()
    const [endtime, setendtime] = useState()

   const history=   useHistory()
   const format = 'HH:mm';
    const Option = Select.Option
        const token = window.localStorage.token;
        if(!token){
             history.push("/")
        }
        useEffect(() => {
            const token = localStorage.getItem("token")
            async function getdata(){
                try {
                    const callapi = await axiosInstance.get('/userdata', { headers:{ "Authorization": `${token}`} })
                    const response = callapi.data;
                    setdata(response.data)
                    // console.log(response)
                  
                } catch (error) {
                    console.log(error)
                }
                try {
                    const callapi = await axiosInstance.get("/myappointment", { headers :{ "Authorization":`${token}` } })
                    const response = callapi.data;
                    setmyappoint(response.data) 
                    // console.log(response)
                     setloaded(true)
                } catch (error) {
                    console.log(error)
                }
            }
            getdata();
        },[])
    const data1 =[1,2,3,4,5]
    const handlelogout=()=>{
        localStorage.clear();
        history.push("/")
    }
    const handleCompleteProfile=()=>{
                 setcompleteprofile(true)
    }
    const handleSave=async()=>{
        const token = localStorage.getItem("token")
const data={location, scope, "admintiming":{
   "start":starttime,"end":endtime
}}
console.log(data)
try { 
    const callapi = await axiosInstance.put('/completeprofile', {...data}, {headers :{"Authorization":`${token}` }})
    const response = callapi.data;
    console.log(response)
    message.success("Profile Updated Successfully...")
    setcompleteprofile(false)
} catch (error) {
    console.log(error)
}
    }

   const handleDone=async(id)=>{
       console.log(id)
       try {
           const callapi = await axiosInstance.get(`/appointment/${id}/finish`)
           const response = callapi.data;
       } catch (error) {
           console.log(error)
       }
   }



    if(!loaded){
        return <h3>Loading pls await...</h3>
    }
    else {

    
    return (
        <div className="dashboard">
             <div className="dashboardTop">
                 <h4>Specialist Dashboard</h4>
             </div>
            <div className="dashboardBody">
            <div className="personalInfo">
         {
             completeprofile? <div>
            
  
            <div className="completeprofile" >
            <h4>Login</h4> 
              <input onChange={(e)=>setlocation(e.target.value)} value={location}  placeholder="Location"/>
              {/* <input onChange={(e)=>setscope(e.target.value)}  value={scope} placeholder="Specialization"/> */}
              <Select style={{margin:"15px"}} defaultValue="Select Specialization" onChange={(e)=>setscope(e)}  >
                  {
                      Specialization.map(i=>
                       <Option value={i} >{i}</Option>
                      )
                  }
              </Select>
              <p>Availability</p>
              <div style={{display:"flex", flexDirection:"row"}} >
              <DatePicker.TimePicker style={{margin:"10px", width:"100%"}} format={format}  onChange={(time,datestring)=>setstarttime(time)}/>
              <DatePicker.TimePicker style={{margin:"10px", width:"100%"}} format={format}  onChange={(time,datestring)=>setendtime(time)}/> </div>
              {/* <input onChange={(e)=>setavailable(true)} value={available} type="boolean"  placeholder="Availability (true/ False)"/> */}
              {/* <input onChange={(e)=>settiming(e.target.value)} value={timimg}  placeholder="Timing"/> */}
              <button style={{backgroundColor:"#ff0534"}} onClick={()=>handleSave()} >Save</button>


        </div>
             </div>
         : <>
           <div style={{flexGrow:"1"}} >
            <div className="userdp" >
            <Avatar size={64} icon={<UserOutlined />} /></div>
               <Divider/>
                <b>{data.fullname}</b>
                <p>{data.email}</p>
                <p>Password : {data.password}</p>
                 {
                     data.location?  <p> <EnvironmentFilled /> Location : {data.location}</p>  :""
                 }
                  
                    {/* <p> <CheckCircleFilled /> Available : { `${data.details.available}`}</p> */}
                 {
                     data.scope?  <p>  <SafetyOutlined /> Scope : {data.scope}</p> :""
                 } 
                
               
     </div>
     <div className="profileAction" >
       <Button type="primary" onClick={()=>handleCompleteProfile()} > { data.details? "Update" :"Complete" } Profile</Button> 
       <Button type="primary" onClick={()=>handlelogout()} >LogOut</Button> 
            </div>
          
     </> }
       </div>
            <div className="appointmentinfo">
                <h3>Appointment</h3>
                <div className="appointmentbody" >
                <div className="specilistList">
             <h3> Pending Appointment </h3> 
                    <ul>
                      {
                          myappoint.filter(i=>i.done!=="done").filter(i=>i.done!=="cencel").map(i=>
                          <AppointmentBoxSpec
                          
                            data={i}
                            onclick={()=>handleDone(i._id)}
                          />
                          )}
                    </ul>
                </div>
                <div className="specilistList">
             <h3>Finished Appointment</h3>   
                    <ul>
                         {
                            myappoint.filter(i=>i.done==='true').map(i=>
                          <AppointmentBoxSpec
                            finished
                            data={i}
                            
                          />
                          )}
                    </ul>
                </div></div>
            </div>
        
            </div>
        </div>
    )
}
}

export default SpecialistDashboard
