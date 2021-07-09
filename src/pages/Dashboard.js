import React, { useEffect, useState } from 'react'
import { Avatar ,Divider, Button ,Input, TimePicker,  Modal, message} from 'antd'
import {UserOutlined, EnvironmentFilled, SafetyOutlined, CheckCircleFilled, CalendarFilled} from '@ant-design/icons'
import {AppointmentBox, BookAppointmentBox }from '../component/AppointmentBox'
import { useHistory } from 'react-router'
import axiosInstance from '../component/axiosInstance'

const Dashboard = () => {
    const history=  useHistory();
    const [showModel, setshowModel] = useState(false)
    const [bookedAppointment, setbookedAppointment] = useState()
    const [selectspecialist, setselectspecialist] = useState({})
    const [data, setdata] = useState()
    const [specialist, setspecialist] = useState()
    const [loaded, setloaded] = useState(false)
    const [details, setdetails] = useState()
    const [slot, setslot] = useState()

    const token = localStorage.getItem("token");
   
    // console.log(token)
    useEffect(() => {
        async function getdata(){
      try {
          const callapi = await axiosInstance.get("/userdata", { headers: {"Authorization" : `${token}`} })
          const response = callapi.data;
        //   console.log(response)
          setdata(response.data)
        
      } catch (error) {
          console.log(error)
      }
      try {
          const callapi =await axiosInstance.get("/user/admin")
          const response = callapi.data;
          setspecialist(response.data)
       
      } catch (error) {
          console.log(error)
      }
      try {
          const callapi = await axiosInstance.get("/myappointment/user", { headers:{ "Authorization": `${token}` } })
          const response = callapi.data;
          setbookedAppointment(response.data)
        
          setloaded(true)
      } catch (error) {
          console.log(error)
      }
    }
    getdata();
    })
    
    const data1 =[1,2,3,4,5]
    const handleLogout=()=>{
        localStorage.clear();
        history.push("/")
    }
    const handleonclick=(i)=>{
        console.log(i)
            setselectspecialist(i)
            setshowModel(true)
    }
    const handleAddApointment=async()=>{
           
           try {const appointment={
               details, slot, "assignTo":selectspecialist._id, "assignBy":data._id
           }
           console.log(appointment)
               const callapi = await axiosInstance.post("/appointment/add", {...appointment})
               const response = callapi.data;
               console.log(response)
               message.success("Appointment Booked Successfully...")
               setshowModel(false)
           
           } catch (error) {
               console.log(error)
           }
    }
    if(!loaded){
        return <h3>Loading pls wait ...</h3>
    }
    else{

    
    return (
        <div className="dashboard">
             <div className="dashboardTop">
                 <h4>User Dashboard</h4>
             </div>
            <div className="dashboardBody">
            <div className="personalInfo">
         
           <div style={{flexGrow:"1"}} >
            <div className="userdp" >
            <Avatar size={64} icon={<UserOutlined />} /></div>
               <Divider/>
                <b>{data.fullname}</b>
                <p>{data.email}</p>
                <p>password : {data.password}</p>
     </div>
     <div className="profileAction" >
       <Button type="primary" >Edit Profile</Button> 
       <Button type="primary" onClick={()=>handleLogout()} >LogOut</Button> 
            </div></div>
            <div className="appointmentinfo">
                <h3>Appontments</h3>
                <div className="appointmentbody" >
                <div className="specilistList">
             <h3>  Avalable Specialist</h3> 
                    <ul>
                      {
                          specialist.map(i=>
                          <AppointmentBox 
                                data={i}
                                onclick={()=>handleonclick(i)}
                             
                          />
                          )}
                    </ul>
                </div>
                <div className="specilistList">
             <h3>Booked Appointment</h3>   
                    <ul>
                         {
                          bookedAppointment.map(i=>
                          <BookAppointmentBox
                              booked 
                              data={i}
                             
                          />
                          )}
                    </ul>
                </div></div>
            </div>
            </div>
            <Modal
        title="Book An Appointment"
        visible={showModel}
        onOk={()=>handleAddApointment()}
        onCancel={()=>setshowModel(false)}
      >
        <h3>Specialist -{selectspecialist.fullname}</h3>
        <Input onChange={(e)=>setdetails(e.target.value)} placeholder="Describe here..." />
        <Input onChange={(e)=>setslot(e.target.value)} placeholder="Time Slot" />
      </Modal>
        </div>
    )
}
}
export default Dashboard
