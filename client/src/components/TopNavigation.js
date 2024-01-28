import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'

function TopNavigation() {
let navigate= useNavigate();
    let storeObj= useSelector((store)=>{
        return store;
    });

    useEffect(()=>{
        if(storeObj && storeObj.loginDetails && storeObj.loginDetails.email)
        {
        
        }else{
        // navigate("/");
        }},[]);

    let highlightActiveLink= (obj)=>{
        if(obj.isActive == true){
            return{backgroundColor:"red", color:"white"};
        }
    };

    let deleteProfile= async()=>{

        let reqOptions = {
                method:"DELETE",
        };
        let url = `http://localhost:4567/deleteProfile?email=${storeObj.loginDetails.email}`;

        let JSONData = await fetch(url,reqOptions);
        let JSOData =await JSONData.json();

        if(JSOData.status=="success"){
                alert(JSOData.msg);
                navigate("/");
        }


    }
  return (
    
        <nav>
        <NavLink to="/home" style={(obj)=>{
                return highlightActiveLink(obj)
            
        }}>Home</NavLink>
        <NavLink to="/tasks" style={(obj)=>{
                return highlightActiveLink(obj)
            
        }}>Tasks</NavLink>
        <NavLink to="/requests" style={(obj)=>{

         return highlightActiveLink(obj)
            
        }}>Requests</NavLink>
        <NavLink to="/leaves" style={(obj)=>{
                return highlightActiveLink(obj)
            
        }}>Leaves</NavLink>

       <NavLink to="/editprofile" style={(obj)=>{
                return highlightActiveLink(obj)
            
        }}>EditProfile</NavLink>

      <NavLink to="/deleteprofile" style={(obj)=>{
                return highlightActiveLink(obj)
            
        }} onClick={()=>{
                deleteProfile();
        }}>DeleteProfile</NavLink>

        <NavLink to="/" onClick={()=>{
                localStorage.clear();
        // }} style={(obj)=>{
        //         return highlightActiveLink(obj)

            
        }}>Logout</NavLink>

       
        </nav>
    
  )
}

export default TopNavigation