import React, { useEffect, useState } from 'react'
import { Avatar ,Divider, Button ,Input, TimePicker,  Modal, message, Select, DatePicker} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import {AppointmentBox, BookAppointmentBox }from '../component/AppointmentBox'
import { useHistory } from 'react-router'
import axiosInstance from '../component/axiosInstance'
import slotdata from '../component/slotData'



const Dashboard = () => {
    const history=  useHistory();
    const [initmodel, setinitmodel] = useState(true)
    const [slotsoptions, setslotsoptions] = useState(slotdata)
    const [showModel, setshowModel] = useState(false)
    const [bookedAppointment, setbookedAppointment] = useState()
    const [selectspecialist, setselectspecialist] = useState({})
    const [data, setdata] = useState()
    const [selecteddate, setselecteddate] = useState()
    const [selectedtime, setselectedtime] = useState()
    const [completeprofile, setcompleteprofile] = useState()
    const [specialist, setspecialist] = useState()
    const [adminslots, setadminslots] = useState()
    const [age, setage] = useState()
    const [gender, setgender] = useState()
    const [weight, setweight] = useState()
    const [height, setheight] = useState()
    const [allergies, setallergies] = useState()
    const [medicalhistory, setmedicalhistory] = useState()
    const [loaded, setloaded] = useState(false)

    const [details, setdetails] = useState()
    const [slot, setslot] = useState()
   const Option = Select.Option
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
    },[])
    
    const data1 =[1,2,3,4,5]
    const handleLogout=()=>{
        localStorage.clear();
        history.push("/")
    }
    const handleonclick=(i,index)=>{
      
            setselectspecialist(i)
            // setadminslots(specialist[index])      console.log(adminslots, index)
      
            setshowModel(true)
    }
    const handleAddApointment=async()=>{
        let getslots=selectspecialist.allslots;
        const token = window.localStorage.getItem("token")
    
         const slot ={
             "date":selecteddate, "time":selectedtime , "status":"pending"
         }
         getslots.push(slot)
           
           try {
               const appointment={
               details, slot, getslots , "assignTo":selectspecialist._id, "assignBy":data._id, "done":"waiting"
           }
           console.log(appointment)
               const callapi = await axiosInstance.post("/appointment/add", {...appointment},{ headers:{ "Authorization": `${token}` } })
               const response = callapi.data;
               console.log(response)
               message.success("Appointment created Successfully...")
               setshowModel(false)
           
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


    // const handleCencel=async()=>{
    //     let getslots=selectspecialist.allslots;
    //     if(slot){
    //           getslots.find(i=>i.time===slot.).status="pending"
     
           
    //        try {
    //            const appointment={
    //            "assignTo":selectspecialist._id, getslots
    //        }
    //        console.log(appointment)
    //            const callapi = await axiosInstance.post("/appointment/pending", {...appointment}) 
    //             setshowModel(false)
    //            const response = callapi.data;
    //            console.log(response)
    //            message.success("Data Saved as Draft.")
             
           
    //        } catch (error) {
    //            console.log(error)
    //            setshowModel(false)
    //        }
    //     }
      
    // }



    const dateonchange=(date, datestring)=>{
        setselecteddate(datestring)
        let newarr=[
            {"slot":"9:00AM-9.15AM", "booked":"false"},
            {"slot":"9:15AM-9.30AM", "booked":"false"},
            {"slot":"9:30AM-9.45AM", "booked":"false"},
            {"slot":"9:45AM-10.00AM", "booked":"false"},
            {"slot":"10:00AM-10.15AM", "booked":"false"},
            {"slot":"10:15AM-10.30AM", "booked":"false"},
            {"slot":"10:30AM-10.45AM", "booked":"false"},
            {"slot":"10:45AM-11.00AM", "booked":"false"},
            {"slot":"11:00AM-11.15AM", "booked":"false"},
            {"slot":"11:15AM-11.30AM", "booked":"false"},
            {"slot":"11:30AM-11.45AM", "booked":"false"},
            {"slot":"11:45AM-12.00AM", "booked":"false"},
            {"slot":"12:00AM-12.15AM", "booked":"false"},
            {"slot":"12:15AM-12.30AM", "booked":"false"},
            {"slot":"12:30AM-12.45AM", "booked":"false"},
            {"slot":"12:45AM-1.00PM", "booked":"false"},
            {"slot":"1:00PM-1.15PM", "booked":"false"},
            {"slot":"1:15PM-1.30PM", "booked":"false"},
            {"slot":"1:30PM-1.45PM", "booked":"false"},
            {"slot":"1:45PM-2.00PM", "booked":"false"},
            {"slot":"2:00PM-2.15PM", "booked":"false"},
            {"slot":"2:15PM-2.30PM", "booked":"false"},
            {"slot":"2:30PM-2.45PM", "booked":"false"},
            {"slot":"2:45PM-3.00PM", "booked":"false"},
            {"slot":"3:00PM-3.15PM", "booked":"false"},
            {"slot":"3:15PM-3.30PM", "booked":"false"},
            {"slot":"3:30PM-3.45PM", "booked":"false"},
            {"slot":"3:45PM-4.00PM", "booked":"false"},
            {"slot":"4:00PM-4.15PM", "booked":"false"},
            {"slot":"4:15PM-4.30PM", "booked":"false"},
            {"slot":"4:30PM-4.45PM", "booked":"false"},
            {"slot":"4:45PM-5.00PM", "booked":"false"},
        ];
        const getslot = selectspecialist.allslots.filter(i=>i.date === datestring)
         
         if(getslot.length > 0)  
         {slotdata.forEach(i=>{
             getslot.forEach(f=>{
                 if(i.slot===f.time){
            //   console.log("remoZ")
              
            if(f.status==="pending"){
                newarr.find(k=>k.slot===f.time).booked="pending"
           }
             else if(f.status==="booked"){
                 newarr.find(k=>k.slot===f.time).booked="booked"
            } 
             }

             
             else{
              console.log("not match")
             } 
             })
            
         }
         )}
    else{
        console.log("dmai")
    }
         

      setslotsoptions(newarr)
     console.log( datestring, newarr)
    }
    const handleCompleteProfile=()=>{
        setcompleteprofile(true)
}
const handleSave=async()=>{
    const data={ age, allergies,weight,height,medicalhistory,gender }
    const token = window.localStorage.getItem("token")
    console.log(data)
    try {
        const  callapi = await axiosInstance.put("/completeprofileClient", {...data},  { headers:{ "Authorization": `${token}` } })
        message.success("Profile Updated Successfully")
    setcompleteprofile(false)

    } catch (error) {
        console.log(error)
    setcompleteprofile(false)

    }
    setcompleteprofile(false)
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
            {
             completeprofile?
              <div>
            
  
            <div className="completeprofile" >
            <h4>Complete-Profile</h4> 
              <input value={age} onChange={(e)=>setage(e.target.value)} placeholder="Enter age (yrs)"/>
              <input value={weight} onChange={(e)=>setweight(e.target.value)} placeholder="Enter weight (kg)"/>
              <input value={height} onChange={(e)=>setheight(e.target.value)} placeholder="Enter height (ft)"/>
              <input value={allergies} onChange={(e)=>setallergies(e.target.value)} placeholder="Define allergies if you have.."/>
              <input value={medicalhistory} onChange={(e)=>setmedicalhistory(e.target.value)} placeholder="Medical history (Covid19 Status)"/>
              {/* <input onChange={(e)=>setscope(e.target.value)}  value={scope} placeholder="Specialization"/> */}
              <Select style={{margin:"15px"}} defaultValue="Select Gender" onChange={(e)=>setgender(e)}  >
                 <Option value="male" >Male</Option>
                 <Option value="female">Female</Option>
              </Select>
              {/* <input onChange={(e)=>setavailable(true)} value={available} type="boolean"  placeholder="Availability (true/ False)"/> */}
              {/* <input onChange={(e)=>settiming(e.target.value)} value={timimg}  placeholder="Timing"/> */}
              <button style={{color:"#f3f3f3"}} onClick={()=>handleSave()} >Save</button>


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
                    data.clientDetails? <>
                    <p>Age :{data.clientDetails.age} Yrs</p>
                    <p>Weight: {data.clientDetails.weight} Kg</p>
                    <p>Height: {data.clientDetails.height} ft</p>
                  
                    </> :""
                }
     </div>
     <div className="profileAction" >
       <Button type="primary" onClick={()=>handleCompleteProfile()} >Edit Profile</Button> 
       <Button type="primary" onClick={()=>handleLogout()} >LogOut</Button> 
            </div> 
             </>}
            </div>
          
            <div className="appointmentinfo">
                <h3>Appointments</h3>
                <div className="appointmentbody" >
                <div className="specilistList">
             <h3>  Avalable Specialist</h3> 
                    <ul>
                      {
                          specialist.map((i,index)=>
                          <AppointmentBox 
                                data={i}
                                onclick={()=>handleonclick(i, index)}
                             
                          />
                          )}
                    </ul>
                </div>
                <div className="specilistList">
             <h3>Booked Appointment</h3>   
                    <ul>
                         {
                          bookedAppointment.filter(i=>i.done!=="cencel").map((i,index)=>
                          <BookAppointmentBox
                              booked 
                              data={i}
                              onclick={()=>handleCencelAppintment(i._id)}
                             
                          />
                          )}
                    </ul>
                </div></div>
            </div>
            </div>
        
        {
            showModel?
        
            <Modal
        title="Book An Appointment"
        visible={showModel}
        onOk={()=>handleAddApointment()}
        onCancel={()=>setshowModel(false)}
      >
        <h3>Specialist -{selectspecialist.fullname}</h3>
       
        <Input onChange={(e)=>setdetails(e.target.value)} placeholder="Describe here..." />
        <DatePicker style={{margin:"10px", width:"100%"}} onChange={(date,datestring)=>dateonchange(date,datestring)} />
        <Select style={{width:"100%", margin:"10px"}} onChange={(e)=>setselectedtime(e)}  defaultValue="Select A Slot" >
            {  
                slotsoptions.map(i=><Option  style={i.booked==="booked"? {color:"red"}: i.booked==="pending"? {color:"#28AB00"}:{color:"black"}} value={i.slot}>{i.slot}</Option>)
            }
        </Select>
      </Modal> :""}
      <Modal title="Basic Information" visible={initmodel} onCancel={()=>setinitmodel(false)} onOk={()=>setinitmodel(false)}  destroyOnClose>
        <p>1. Please fill in your general information like age, height, weight etc before making an appointment.</p>
        <p>2. Do not take appointments with a previous date.</p>
        <p>3. Before making any appointment please check whether the specialist is available in that time slot or not</p>
      </Modal>
        </div>
    )
}
}
export default Dashboard
