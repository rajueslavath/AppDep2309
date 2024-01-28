import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux';
function Home() {
let storeObj = useSelector((store)=>{return store});
  console.log("inside home")
  console.log(storeObj);
  return (
    <div className='App'>
        <TopNavigation/>
        <h1>Home</h1>
        <h2 style={{color:"green"}}>Welcome to {storeObj.loginDetails.firstName} {storeObj.loginDetails.lastName} page</h2>
        <img style={{width:"300px", border:"2px solid grey", borderRadius:"150px",backgroundColor:"orange"}} src={`http://localhost:4567/${storeObj.loginDetails.profilePic}`} alt=''></img>
    </div>
  )
}

export default Home