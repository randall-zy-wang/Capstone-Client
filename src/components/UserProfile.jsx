import wuyanzu from "../photos/wuyanzu.png";
import facebook from "../photos/facebook2.png";
import instagram from "../photos/instagram.png";
import React from "react";
import pet1 from "../photos/pet1.jpg";
import pet2 from "../photos/pet2.jpg";
import pet3 from "../photos/pet3.jpg";
import pet4 from "../photos/pet4.jpg";
import add from "../photos/add.png";

export default function UserProfile({ stored, startEditCallback }) {
  let loggedInUser = window.localStorage.getItem("user")
  const url = window.location.href
  let renderedUser 
  if(url.endsWith('/profile')) {
    renderedUser = loggedInUser
  } else {
    renderedUser = url.substring(url.indexOf('/profile'))
  }
  let pet = {}
  if(stored.pets[0] !== null){
    pet = stored.pets[0]
  }
  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <img
          className="profile-pic"
          alt={"headshot"}
          src={stored.headimg || wuyanzu}
        ></img>
        <div className="profile-row">
          <span className="profile-row-name">Pet Type:</span>
          <span className="profile-row-value"> {pet.type}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Name:</span>
          <span className="profile-row-value"> {pet.name}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Breed:</span>
          <span className="profile-row-value"> {pet.breed}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Size:</span>
          <span className="profile-row-value"> {pet.size}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Gender:</span>
          <span className="profile-row-value"> {pet.gender}</span>
        </div>
        {loggedInUser === renderedUser ? (<>
        <button className="profile-edit-button" onClick={startEditCallback}>
          Edit
        </button>
        </>): (<></>)}
        
      </div>

      <div className="profile-con">
        <div className="profile-con-top">
          <img
            className="profile-con-top-pic"
            alt={"headshot"}
            src={stored.headimg || wuyanzu}
          ></img>
          <div>
            <div className="profile-name">{stored.username}</div>
          </div>
        </div>

        <div className="profile-name-c">Contact:</div>
        <div className="profile-icons">
          {stored.contact.instagram == "" || null ? (<></>) : (<>
            <a href={"https://www.instagram.com/" + stored.contact.instagram} target="new">
              <img
                className="profile-icon"
                alt={"instagram"}
                src={instagram}
              ></img>
            </a>
          </>)}
          {stored.contact.facebook == "" || null ? (<></>) : (<>
            <a href={"https://www.facebook.com/" + stored.contact.facebook} target="new">
              <img className="profile-icon" alt={"facebook"} src={facebook}></img>
            </a>
          </>)}
        </div>
        {stored.contact.phone == "" || null ? (<></>) : (<>
          <div className="profile-icons">
            <a href= {"tel:+" + stored.contact.phone}>{stored.contact.phone}</a>
          </div>
        </>)}
        <div className="profile-name-p">Pet photos:</div>
        <div className="pet-photos">
          <div className="pet-photos-sub">
            {stored.pet1 ? (
              <img
                className="pet-icon"
                alt={"pet photo1"}
                src={stored.pet1}
              ></img>
            ) : (
              ""
            )}
            {stored.pet2 ? (
              <img
                className="pet-icon"
                alt={"pet photo2"}
                src={stored.pet2}
              ></img>
            ) : (
              ""
            )}
          </div>
          <div className="pet-photos-sub">
            {stored.pet3 ? (
              <img
                className="pet-icon"
                alt={"pet photo3"}
                src={stored.pet3}
              ></img>
            ) : (
              ""
            )}
            {stored.pet4 ? (
              <img
                className="pet-icon"
                alt={"pet photo4"}
                src={stored.pet4}
              ></img>
            ) : (
              ""
            )}
          </div>
          {/* <div className="add-icon">
            <img className="add-icon-img" alt={"add icon"} src={add}></img>
          </div> */}
        </div>
      </div>
      <div className="profile-wrapper-mobile">
        <div className="profile-row">
          <span className="profile-row-name">Pet info:</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">My pet:</span>
          <span className="profile-row-value"> {pet.name}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Breed:</span>
          <span className="profile-row-value"> {pet.breed}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Size:</span>
          <span className="profile-row-value"> {pet.size}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Gender:</span>
          <span className="profile-row-value"> {pet.gender}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Age:</span>
          <span className="profile-row-value"> {pet.age}</span>
        </div>
        <button className="profile-edit-button" onClick={startEditCallback}>
          Edit
        </button>
      </div>
    </div>
  );
}
