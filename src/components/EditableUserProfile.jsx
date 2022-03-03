import { useState, useEffect } from "react";

export default function EditableUserProfile({ stored, editCompleteCallback }) {
  //   const [name, setName] = useState(stored.name);
  const [petname, setpetName] = useState(stored.petname);
  const [breed, setBreed] = useState(stored.breed);
  const [petSize, setPetSize] = useState(stored.petSize);
  const [petGender, setPetGender] = useState(stored.petGender);
  const [location, setLocation] = useState(stored.location);

  function handleCancelClicked() {
    editCompleteCallback(null);
  }

  function handleSaveClicked() {
    console.log("Saved");
    editCompleteCallback({
      //   name,
      petname,
      breed,
      petGender,
      petSize,
      location,
    });
  }

  return (
    <>
      {/* <div className="profile-edit-row">
        <div className="profile-edit-row-name">Name:</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div> */}
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Name:</div>
        <input
          type="text"
          value={petname}
          onChange={(e) => setpetName(e.target.value)}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Breed:</div>
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Size:</div>
        <input
          type="int"
          value={petSize}
          onChange={(e) => setPetSize(e.target.value)}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Gender:</div>
        <input
          type="text"
          value={petGender}
          onChange={(e) => setPetGender(e.target.value)}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Location:</div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <button className="profile-edit-button" onClick={handleSaveClicked}>
          Save
        </button>
        <button className="profile-edit-button" onClick={handleCancelClicked}>
          Cancel
        </button>
      </div>
    </>
  );
}
