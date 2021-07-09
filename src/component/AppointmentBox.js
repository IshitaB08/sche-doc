import React, { useEffect, useState } from 'react'
import { EnvironmentFilled, SafetyOutlined, CheckCircleFilled, CalendarFilled} from '@ant-design/icons'
import { Button } from 'antd'
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
     <div style={{display:"flex", justifyContent:"space-between"}} >
       <p> <SafetyOutlined /> {data.details.scope}</p>
        <p><EnvironmentFilled /> {data.details.location}</p></div> 
        <div style={{display:"flex", justifyContent:"space-between"}} >
       <p> <CheckCircleFilled /> {data.details.available? "Available" :"Booked"}</p>
        <p><CalendarFilled />{data.details.timimg}</p></div> 
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
       <p> <SafetyOutlined /> {admindata.details.scope}</p>
        <p><EnvironmentFilled /> {admindata.details.location}</p></div> 
        <div style={{display:"flex", justifyContent:"space-between"}} >
       <p> <CheckCircleFilled /> {admindata.details.available? "Available" :"Booked"}</p>
        <p><CalendarFilled />{admindata.details.timimg}</p></div> 
        <Button onClick={onclick} danger type="primary" >Cencel</Button>
        </li>
    )
}  
 }
const AppointmentBoxSpec = ({finished,data, details, onclick, specialist}) => {
    const [admindata, setadmindata] = useState()
    const [loaded, setloaded] = useState(false)
      useEffect(() => {
          async function getdata(){

       
         try {
            const callapi = await axiosInstance.get("/userbyid", { headers:{ "id":data.assignBy } }) 
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
       <p> <CalendarFilled /> {data.slot}</p>
        <p> {data.details}</p></div> 
        <div style={{display:"flex", justifyContent:"space-between"}} >
       {/* <p> <CheckCircleFilled /> {data.details.available? "Available" :"Booked"}</p> */}
        {/* <p><CalendarFilled />{data.details.timimg}</p> */}
        </div> 
        {
            finished ? <Button onClick={onclick} danger type="primary" > Delete  </Button> :
            <div style={{display:"flex"}} >
            <Button style={{flex:"1"}} onClick={onclick} danger type="primary" >finish  </Button>
            {/* <Button style={{flex:"1"}} onClick={onclick} danger type="primary" > Delete  </Button> */}
            </div>
        }
       
        </li>
    )
}
}
export  { AppointmentBox, BookAppointmentBox,  AppointmentBoxSpec}
