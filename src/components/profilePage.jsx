import { useEffect, useState } from "react";
import EditableUserProfile from "./EditableUserProfile";
import UserProfile from "./UserProfile";
import wuyanzu from "../photos/wuyanzu.png";
import React from "react";
import snap from "../photos/snapchat.png";
import facebook from "../photos/facebook2.png";
import instagram from "../photos/instagram.png";
import pet1 from "../photos/pet1.jpg";
import pet2 from "../photos/pet2.jpg";
import pet3 from "../photos/pet3.jpg";
import pet4 from "../photos/pet4.jpg";
import add from "../photos/add.png";
import Copyright from "./Copyright";
function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function Profile() {
  const [profileEditMode, setProfileEditMode] = useState(false);
  // const [petEditMode, setPetEditMode] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(true)
    
  useEffect(() => {
    try {
      fetch(`/profile/userInfo`)
         .then((response) => response.json())
         .then(function (data) {
            if(data.status === 'success') {
              console.log("from backend: ", data.userInfo)
              setUserInfo(data.userInfo)
              setLoading(false)
            } else{
              console.log("error: ", data.error)
            }
         });
   } catch (error) {
     console.log(error)
   }
  }, [])
  console.log("userInfo: ", userInfo)

  // let userinfo = localStorage.getItem("userinfo");
  // if (userinfo) {
  //   userinfo = JSON.parse(userinfo);
  // } else {
  //   userinfo = {
  //     name: "Hongyi Yang",
  //     color: randomColor(),
  //     pettype: "Dog",
  //     petname: "Fishcake",
  //     breed: "Golden Retriever",
  //     petSize: "80 lbs",
  //     petGender: "Boy",
  //     location: "Seattle, WA",
  //     headimg: wuyanzu,
  //     pet1: "",
  //     pet2: "",
  //     pet3: "",
  //     pet4: "",
  //   };
  // }

  // const [name, setName] = useState(function () {
  //   return userinfo.name;
  // });
  // const [color, setColor] = useState(userinfo.color);
  // const [petname, setpetName] = useState(function () {
  //   return userinfo.petname;
  // });
  // const [breed, setBreed] = useState(function () {
  //   return userinfo.breed;
  // });
  // const [petSize, setPetSize] = useState(function () {
  //   return userinfo.petSize;
  // });
  // const [petGender, setPetGender] = useState(function () {
  //   return userinfo.petGender;
  // });
  // const [location, setLocation] = useState(function () {
  //   return userinfo.location;
  // });

  // const stored = {
  //   name,
  //   color,
  //   petname,
  //   breed,
  //   petSize,
  //   petGender,
  //   location,
  //   pet1,
  //   pet2,
  //   pet3,
  //   pet4,
  // };

  function handleEditComplete(result) {
    console.log("handleEditComplete", result);
    if (result != null) {
      setUserInfo(result)
    }
    setProfileEditMode(false);
  }

  return (
    <div className="SideProfile">
      <div className="App">
        {loading ? (<><h1>Loading</h1></>) : (<>
        {profileEditMode ? (
          <>
            <h1 className="profileheader">My Profile</h1>
            <EditableUserProfile
              stored={userInfo}
              editCompleteCallback={handleEditComplete}
            />
          </>
        ) : (
          <>
            <UserProfile
              stored={userInfo}
              startEditCallback={() => setProfileEditMode(true)}
            />
          </>
        )}</>)}
        
      </div>
      <Copyright />
    </div>
  );
}

export default Profile;
