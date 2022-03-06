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

export default function EditableUserProfile({ stored, editCompleteCallback }) {
  //   const [name, setName] = useState(stored.name);
  const [userinfo, setUserinfo] = useState(stored);
  function handleCancelClicked() {
    editCompleteCallback(null);
  }

  function handleSaveClicked() {
    console.log("Saved");
    editCompleteCallback(userinfo);
  }

  function uploadPhoto(e) {
    console.log("e===========", e.target.file);

    var file = e.target.files[0];
    let r = new FileReader(); //本地预览
    r.onload = function () {
      console.log(r.result); //r.result 即为base64编码
      userinfo.headimg = r.result;
      setUserinfo({ ...userinfo });
    };
    r.readAsDataURL(file); //Base64
  }

  function uploadPet(e, index) {
    console.log("e===========", e.target.file);

    var file = e.target.files[0];
    let r = new FileReader(); //本地预览
    r.onload = function () {
      console.log(r.result); //r.result 即为base64编码
      userinfo["pet" + index] = r.result;
      setUserinfo({ ...userinfo });
    };
    r.readAsDataURL(file); //Base64
  }

  return (
    <div className="profile-edit">
      {/* <div className="profile-edit-row">
        <div className="profile-edit-row-name">Name:</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div> */}
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">My Name:</div>
        <input
          type="text"
          value={userinfo.name}
          onChange={(e) => {
            userinfo.name = e.target.value;
            setUserinfo({ ...userinfo });
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Location</div>
        <input
          type="text"
          value={userinfo.location}
          onChange={(e) => {
            userinfo.location = e.target.value;
            setUserinfo({ ...userinfo });
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
          <img
            alt=""
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 50 }}
            src={snap}
          ></img>
          Snap
        </div>
        <input
          type="text"
          value={userinfo.snap}
          onChange={(e) => {
            userinfo.snap = e.target.value;
            setUserinfo({ ...userinfo });
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
          value={userinfo.facebook}
          onChange={(e) => {
            userinfo.facebook = e.target.value;
            setUserinfo({ ...userinfo });
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
          Facebook
        </div>
        <input
          type="text"
          value={userinfo.instagram}
          onChange={(e) => {
            userinfo.instagram = e.target.value;
            setUserinfo({ ...userinfo });
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
          value={userinfo.petname}
          onChange={(e) => {
            userinfo.petname = e.target.value;
            setUserinfo({ ...userinfo });
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Type:</div>
        <input
          type="text"
          value={userinfo.pettype}
          onChange={(e) => {
            userinfo.pettype = e.target.value;
            setUserinfo({ ...userinfo });
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Breed:</div>
        <input
          type="text"
          value={userinfo.breed}
          onChange={(e) => {
            userinfo.breed = e.target.value;
            setUserinfo({ ...userinfo });
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Size:</div>
        <input
          type="int"
          value={userinfo.petSize}
          onChange={(e) => {
            userinfo.petSize = e.target.value;
            setUserinfo({ ...userinfo });
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Gender:</div>
        <input
          type="text"
          value={userinfo.petGender}
          onChange={(e) => {
            userinfo.petGender = e.target.value;
            setUserinfo({ ...userinfo });
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
