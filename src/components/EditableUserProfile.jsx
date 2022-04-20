import { useState, useEffect } from "react";
import snap from "../photos/snapchat.png";
import facebook from "../photos/facebook2.png";
import instagram from "../photos/instagram.png";
// import pet1 from "../photos/pet1.jpg";
// import pet2 from "../photos/pet2.jpg";
// import pet3 from "../photos/pet3.jpg";
// import pet4 from "../photos/pet4.jpg";
import add from "../photos/add.png";
import wuyanzu from "../photos/wuyanzu.png";
import React from "react";

export default function EditableUserProfile({ stored, editCompleteCallback }) {
  const[userinfo, setUserinfo] = useState(stored)

  function handleCancelClicked() {
    editCompleteCallback(null);
  }

  async function handleSaveClicked() {
    let postProfileResponse = await fetch(`/profile`,
        {method: "POST", body: JSON.stringify(userinfo), headers: {'Content-Type': 'application/json'}}
    )
    let statusInfo = await postProfileResponse.json();
    if(statusInfo.status === "success"){
      alert("profile saved successfully")
      editCompleteCallback(userinfo);
    } else{
      alert("Error: " + statusInfo.error)
    }
    
  }

  function uploadPhoto(e) {
    console.log("e===========", e.target.file);

    var file = e.target.files[0];
    let r = new FileReader(); 
    r.onload = function () {
      console.log(r.result); 
      userinfo.headimg = r.result;
    };
    r.readAsDataURL(file);
  }

  function uploadPet(e, index) {
    console.log("e===========", e.target.file);

    var file = e.target.files[0];
    let r = new FileReader(); 
    r.onload = function () {
      console.log(r.result); 
      userinfo["pet" + index] = r.result;
    };
    r.readAsDataURL(file);
  }

  return (
    <div className="profile-edit">
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">My Name:</div>
        <input
          type="text"
          id="username"
          value={userinfo.username}
          onChange={(e) => {
            userinfo.username = e.target.value;
            setUserinfo({ ...userinfo })
          }}
        />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Profile photo</div>
        <input type="file" onChange={(e) => uploadPhoto(e)} />
        <img
          alt=""
          style={{ width: 100, height: 100, margin: 10, borderRadius: 50 }}
          src={userinfo.headimg || wuyanzu}
        ></img>
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">
          Phone number
        </div>
        <input
          type="text"
          value={userinfo.contact.phone}
          onChange={(e) => {
            userinfo.contact.phone = e.target.value;
            setUserinfo({ ...userinfo })
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">
          <img
            alt=""
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 50 }}
            src={facebook}
          ></img>
          Facebook
        </div>
        <input
          type="text"
           value={userinfo.contact.facebook}
          onChange={(e) => {
            userinfo.contact.facebook = e.target.value;
            setUserinfo({ ...userinfo })
          }}
        />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">
          <img
            alt=""
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 50 }}
            src={instagram}
          ></img>
          Instagram
        </div>
        <input
          type="text"
           value={userinfo.contact.instagram}
          onChange={(e) => {
            userinfo.contact.instagram = e.target.value;
            setUserinfo({ ...userinfo })
          }}
        />
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 18,
          color: "#000",
          textAlign: "left",
          margin: 10,
        }}
      >
        Pet info
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Name:</div>
        <input
          type="text"
          value={userinfo.pets[0].name}
          onChange={(e) => {
            userinfo.pets[0].name = e.target.value;
            setUserinfo({ ...userinfo })
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Type:</div>
        <input
          type="text"
          value={userinfo.pets[0].type}
          onChange={(e) => {
            userinfo.pets[0].type = e.target.value;
            setUserinfo({ ...userinfo })
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Breed:</div>
        <input
          type="text"
          value={userinfo.pets[0].breed}
          onChange={(e) => {
            userinfo.pets[0].breed = e.target.value;
            setUserinfo({ ...userinfo })
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Size:</div>
        <input
          type="int"
          value={userinfo.pets[0].size}
          onChange={(e) => {
            userinfo.pets[0].size = e.target.value;
            setUserinfo({ ...userinfo })
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Gender:</div>
        <input
          type="text"
          value={userinfo.pets[0].gender}
          onChange={(e) => {
            userinfo.pets[0].gender = e.target.value;
            setUserinfo({ ...userinfo })
          }}
        />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Age:</div>
        <input
          type="text"
          value={userinfo.pets[0].age}
          onChange={(e) => {
            userinfo.pets[0].age = e.target.value;
            setUserinfo({ ...userinfo })
          }}
        />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet photo 1</div>
        <input type="file" onChange={(e) => uploadPet(e, 1)} />
        {userinfo.pet1 ? (
          <img
            alt=""
            style={{ width: 100, height: 100, margin: 10, borderRadius: 50 }}
            src={userinfo.pet1}
          ></img>
        ) : (
          ""
        )}
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet photo 2</div>
        <input type="file" onChange={(e) => uploadPet(e, 2)} />
        {userinfo.pet2 ? (
          <img
            alt=""
            style={{ width: 100, height: 100, margin: 10, borderRadius: 50 }}
            src={userinfo.pet2}
          ></img>
        ) : (
          ""
        )}
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet photo 3</div>
        <input type="file" onChange={(e) => uploadPet(e, 3)} />
        {userinfo.pet3 ? (
          <img
            alt=""
            style={{ width: 100, height: 100, margin: 10, borderRadius: 50 }}
            src={userinfo.pet3}
          ></img>
        ) : (
          ""
        )}
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet photo 4</div>
        <input type="file" onChange={(e) => uploadPet(e, 4)} />
        {userinfo.pet4 ? (
          <img
            alt=""
            style={{ width: 100, height: 100, margin: 10, borderRadius: 50 }}
            src={userinfo.pet4}
          ></img>
        ) : (
          ""
        )}
      </div>

      <div>
        <button className="profile-edit-button" onClick={handleSaveClicked}>
          Save
        </button>
        <button className="profile-edit-button" onClick={handleCancelClicked}>
          Cancel
        </button>
      </div>
    </div>
  );
}
