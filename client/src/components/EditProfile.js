import React, { useEffect, useRef,useState, } from 'react'
import { Link } from 'react-router-dom'
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';


function EditProfile() {

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let genderInputRef= useRef();
    let maritalInputRef=useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let profilePicInputRef = useRef();
    let[profilePicPath,setProfilePicPath] = useState("./images/images.png");


    
    let sendSignupDataToServerThruFD = async()=>{
    let dataToSend = new FormData();
    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("gender",genderInputRef.current.value);
    dataToSend.append("marital",maritalInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);

    for(let i=0;i<profilePicInputRef.current.files.length;i++){
    dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
    }
    

    let reqOptions ={
        method:"PUT",
        body:dataToSend,
        
    };
    
    let JSONData = await fetch("/updateProfile",reqOptions);

    let JSOData = await JSONData.json();

    if(JSOData.status == "success"){
      alert(JSOData.msg);
    }else {
      alert(JSOData.msg);
    }

    console.log(JSOData);

};

let storeObj = useSelector((store)=>{
    return store;

});


useEffect(()=>{

    firstNameInputRef.current.value = storeObj.loginDetails.firstName;
    lastNameInputRef.current.value = storeObj.loginDetails.lastName;
    ageInputRef.current.value = storeObj.loginDetails.age;
    genderInputRef.current.value = storeObj.loginDetails.gender;
    maritalInputRef.current.value= storeObj.loginDetails.marital;
    emailInputRef.current.value= storeObj.loginDetails.email;
    setProfilePicPath(`/${storeObj.loginDetails.profilePic}`)
    

},[]);



  return (
    <div className="App">
     <TopNavigation/>

    <form>
    <h1>Edit Profile</h1>    
    <div>
   <label>First Name</label>
   <input ref={firstNameInputRef}></input>
   </div>

   <div>
   <label>Last Name</label>
   <input ref={lastNameInputRef}></input>
   </div>

   <div>
   <label>Age</label>
   <input ref={ageInputRef}></input>
   </div>

   <div>
   <label>Gender</label>
   <input ref={genderInputRef}></input>
   </div>

   <div>
   <label>Marital Status</label>
   <input ref={maritalInputRef}></input>
   </div>

   <div>
   <label>Email</label>
   <input ref={emailInputRef} readOnly></input>
   </div>

   <div>
   <label>Password</label>
   <input ref={passwordInputRef}></input>
   </div>

   <div>
   <label>Profile Pic</label>
   <input ref={profilePicInputRef} type="file" onChange={(eventObj)=>{
    let selectedImagePath = URL.createObjectURL(eventObj.target.files[0]);

    setProfilePicPath(selectedImagePath);
   }}></input>
   </div>

    <div>
    <img className="profilePic" src={profilePicPath}></img>
   </div>

   <div>
   <button type='button' onClick={()=>{
    sendSignupDataToServerThruFD();
   }}>Update Profile</button>
   </div>
  </form>

  
    </div>
  )
};

export default EditProfile