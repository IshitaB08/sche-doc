import React, { useEffect, useState } from 'react'
import { EnvironmentFilled, SafetyOutlined, CheckCircleFilled, CalendarFilled, CalendarOutlined} from '@ant-design/icons'
import { Button, message } from 'antd'
import axiosInstance from './axiosInstance'

const AppointmentBox = ({booked,data, onclick, specialist}) => {
    //   useEffect(() => {
    //      try {
    //         const callapi = await axiosInstance.get("/user") 
    //      } catch (error) {
             
    //      }
    //   }, [input])
    return (
        <li> 
        <h2>{data.fullname}</h2>
        <p>{`Availability : ${ new Date(data.admintiming.start).getHours()} :  ${ new Date(data.admintiming.start).getMinutes() }- ${ new Date(data.admintiming.end).getHours()} :  ${ new Date(data.admintiming.end).getMinutes() }`}</p>
     <div style={{display:"flex", justifyContent:"space-between"}} >
       <p> <SafetyOutlined /> {data.scope}</p>
        <p><EnvironmentFilled /> {data.location}</p></div> 
   
        <Button onClick={onclick} danger={booked? true : false} type="primary" > { booked? "Cencel" : specialist? "Accept": "Book Appointment" }   </Button>
        </li>
    )
}
const BookAppointmentBox = ({booked,data,  onclick}) => {
    const [admindata, setadmindata] = useState()
    const [loaded, setloaded] = useState(false)
      useEffect(() => {
          async function getdata(){

       
         try {
            const callapi = await axiosInstance.get("/userbyid", { headers:{ "id":data.assignTo } }) 
            const response = callapi.data.data;
            setadmindata(response)
            setloaded(true)
         } catch (error) {
             console.log(error)
         }  
        
        }
        getdata();
      })
      if(!loaded){
              return null
      }
    else{

 
    
      return (
        <li> 
        <h2>{admindata.fullname}</h2>
     <div style={{display:"flex", justifyContent:"space-between"}} >
       <p> <SafetyOutlined /> {admindata.scope}</p>
        <p><EnvironmentFilled /> {admindata.location}</p></div> 
        <div style={{display:"flex", justifyContent:"space-between"}} >
       <p> <CalendarOutlined /> {data.slot.date} {data.slot.time}</p>
        {/* <p><CalendarFilled />{admindata.details.timimg}</p> */}
        </div> 
        <Button disabled={data.done==="waiting"? true: false} onClick={onclick}  danger type="primary" >{data.done==="waiting"? "Pending" : "Cencel"}</Button>
        </li>
    )
}  
 }
const AppointmentBoxSpec = ({finished,data, details, onclick, specialist}) => {
    const [admindata, setadmindata] = useState()
    const [doctordata, setdoctordata] = useState()
    const [loaded, setloaded] = useState(false)
      useEffect(() => {
          async function getdata(){

       
         try {
            const callapi = await axiosInstance.get("/userbyid", { headers:{ "id":data.assignBy } }) 
            const response = callapi.data.data;
            setadmindata(response)
      
         } catch (error) {
             console.log(error)
         }  
         try {
          const callapi = await axiosInstance.get("/userbyid", { headers:{ "id":data.assignTo } }) 
          const response = callapi.data.data;
          setdoctordata(response)
          setloaded(true)
       } catch (error) {
           console.log(error)
       } 
        
        }
        getdata();
      })

       const acceptAppointment=async()=>{
                let getslots = doctordata.allslots;
                getslots.filter(i=>i.date===data.slot.date).find(i=>i.time===data.slot.time).status="booked"
          console.log(getslots)
       const appointmentid=data._id
       const data1={
         assignTo:data.assignTo
       }
       console.log(data1)
       try {
         const callapi = await axiosInstance.get(`/appointment/${appointmentid}/accept`)
         const responce = callapi.data;
         console.log(responce)
         message.success("Appointment Accepted Successfully")
       } catch (error) {
         console.log(error)
         message.error("Something went wrong !")
       }
       const data2={
         slots:getslots, assignTo:data.assignTo
       }
       try {
         const callapi = await axiosInstance.post("/updateslots", {...data2})
         const response =callapi.data;
         console.log(response)
       } catch (error) {
         console.log(error)
       }
      }
      const handleCencelAppintment=async(id)=>{
        console.log(id)
        try {
            const callapi = await axiosInstance.get(`/appointment/${id}/cencel`)
            const response = callapi.data;
            message.success("Appointment Cancelled Successfully")
        } catch (error) {
            console.log(error)
        }
    }

      if(!loaded){
              return null
      }
    else{
    return (
        <li> 
        <h2>{admindata.fullname}</h2>
     <div style={{display:"flex", justifyContent:"space-between"}} >
       <p> <CalendarFilled /> {data.slot.date} {data.slot.time}</p>
        <p> {data.details}</p></div> 
        <div style={{display:"flex", justifyContent:"space-between"}} >
       <p> <CheckCircleFilled />Age- "damidata"</p>
        <p><CalendarFilled /> medicalhistory- "damidata"</p>
        </div> 
        {
            finished ? <Button onClick={onclick} danger type="primary" > Delete  </Button> :
            data.done==="accepted"?  <Button disabled danger type="primary" > Accepted  </Button>:
            <div style={{display:"flex"}} >
            <Button style={{flex:"1"}} onClick={()=>acceptAppointment()} danger type="primary" >Accept </Button>
            <Button style={{flex:"1"}} onClick={()=>handleCencelAppintment(data._id)} danger type="primary" >Reject</Button>
            </div>
        }
       
        </li>
    )
}
}
export  { AppointmentBox, BookAppointmentBox,  AppointmentBoxSpec}
