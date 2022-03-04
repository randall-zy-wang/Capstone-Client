import { useState } from "react";
import EditableUserProfile from "./EditableUserProfile";
import UserProfile from "./UserProfile";
import wuyanzu from "../photos/wuyanzu.png";
import snap from "../photos/snapchat.png";
import facebook from "../photos/facebook2.png";
import instagram from "../photos/instagram.png";
import pet1 from "../photos/pet1.jpg";
import pet2 from "../photos/pet2.jpg";
import pet3 from "../photos/pet3.jpg";
import pet4 from "../photos/pet4.jpg";
import add from "../photos/add.png";
function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function App() {
  const [editMode, setEditMode] = useState(false);
  let userinfo = localStorage.getItem("userinfo");
  if(userinfo){
    userinfo = JSON.parse(userinfo);
  }else{
    userinfo = {
      name:"Disen Yang",
      color:randomColor(),
      petname:"Fishcake",
      breed:"Golden Retriever",
      petSize:"80 lbs",
      petGender:"Boy",
      location:"Seattle, WA",
      headimg:wuyanzu,
      pet1:"",
      pet2:"",
      pet3:"",
      pet4:"",
    }
  }

  const [name, setName] = useState(function () {
    return userinfo.name;
  });
  const [color, setColor] = useState(userinfo.color);
  const [petname, setpetName] = useState(function () {
    return userinfo.petname;
  });
  const [breed, setBreed] = useState(function () {
    return userinfo.breed;
  });
  const [petSize, setPetSize] = useState(function () {
    return userinfo.petSize;
  });
  const [petGender, setPetGender] = useState(function () {
    return userinfo.petGender;
  });
  const [location, setLocation] = useState(function () {
    return userinfo.location;
  });

  const stored = {
    name,
    color,
    petname,
    breed,
    petSize,
    petGender,
    location,
    pet1,
    pet2,
    pet3,
    pet4,
  };

  function handleEditComplete(result) {
    console.log("handleEditComplete", result);
    if (result != null) {
      setName(result.name);
      setColor(result.color);
      setpetName(result.petname);
      setBreed(result.breed);
      setPetSize(result.petSize);
      setPetGender(result.petGender);
      setLocation(result.location);
      localStorage.setItem("userinfo",JSON.stringify(result))

    }
    setEditMode(false);
  }

  return (
    <div className="SideProfile">
      <div className="App">
        {editMode ? (
          <>
            <h1 className="profileheader">My Profile</h1>
            <EditableUserProfile
              stored={userinfo}
              editCompleteCallback={handleEditComplete}
            />
          </>
        ) : (
          <>
            <UserProfile
              stored={userinfo}
              startEditCallback={() => setEditMode(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
