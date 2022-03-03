import { useState } from "react";
import EditableUserProfile from "./EditableUserProfile";
import UserProfile from "./UserProfile";

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// function randomName() {
//   return "Username";
// }

function App() {
  const now = new Date(Date.now());
  const defaultBirthday = new Date(now.getTime() + 86400000);

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState(function () {
    return "Enter Name";
  });
  const [month, setMonth] = useState(defaultBirthday.getMonth());
  const [day, setDay] = useState(defaultBirthday.getDate());
  const [color, setColor] = useState(randomColor());
  const [petname, setpetName] = useState(function () {
    return "Fishcake";
  });
  const [breed, setBreed] = useState(function () {
    return "Golden Retriever";
  });
  const [petSize, setPetSize] = useState(function () {
    return "80 lbs";
  });
  const [petGender, setPetGender] = useState(function () {
    return "Boy";
  });
  const [location, setLocation] = useState(function () {
    return "Seattle, WA";
  });

  const stored = {
    name,
    month,
    day,
    color,
    petname,
    breed,
    petSize,
    petGender,
    location,
  };
  const isBirthdayToday = now.getMonth() === month && now.getDate() === day;

  function handleEditComplete(result) {
    console.log("handleEditComplete", result);
    if (result != null) {
      setName(result.name);
      setMonth(result.month);
      setDay(result.day);
      setColor(result.color);
      setpetName(result.petname);
      setBreed(result.breed);
      setPetSize(result.petSize);
      setPetGender(result.petGender);
      setLocation(result.location);
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
              stored={stored}
              editCompleteCallback={handleEditComplete}
            />
          </>
        ) : (
          <>
            <UserProfile
              stored={stored}
              startEditCallback={() => setEditMode(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
