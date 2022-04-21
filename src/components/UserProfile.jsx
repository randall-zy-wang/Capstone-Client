import wuyanzu from "../photos/wuyanzu.png";
import PostCard from "./PostCard";
import facebook from "../photos/facebook2.png";
import instagram from "../photos/instagram.png";
import plusIcon from "../photos/icons8-plus-64.png";
import React from "react";
import pet1 from "../photos/pet1.jpg";
import pet2 from "../photos/pet2.jpg";
import pet3 from "../photos/pet3.jpg";
import pet4 from "../photos/pet4.jpg";
import add from "../photos/add.png";
import CreatePostModal from "./CreatePostModal";

export default function UserProfile({ stored, startEditCallback }) {
  const url = window.location.href

  let loggedInUser = window.localStorage.getItem("user")
  let renderedUser 
  if(url.endsWith('/profile')) {
    renderedUser = loggedInUser
  } else {
    renderedUser = url.substring(url.indexOf('/profile'))
  }
  let isOwnProfile = (loggedInUser === renderedUser)

  let pet = {}
  if(stored.pets[0] !== null){
    pet = stored.pets[0]
  }

  let cleanStart, cleanEnd;
  if(stored.posts.length > 0) {
    cleanStart = new Date(stored.posts[0].start_date).toLocaleDateString();
    cleanEnd = new Date(stored.posts[0].end_date).toLocaleDateString();
  }

  async function createPost () {
    let petsJson
    try {
      let response = await fetch('/posts/pets')
      petsJson = await response.json()
    } catch (error) {
      petsJson = {status: "error", error: error}
    }
    if(petsJson.status === "success"){
      
      // I have no idea why but these next lines have to exist together to make it work
      setTimeout(() => {
        createPostModal.classList.add("show");
      }, 25);
      const createPostModal = document.getElementById("createPostModal");
      createPostModal.style.display = "block";
      // ends here

      let petsOptions = petsJson.pets.map(pet => {
        return `<option value="${pet.name}">${pet.name}</option>\t`
      });
      petsOptions += `<option value="add">Add a pet</option>`
      document.getElementById("pets_dropdown").innerHTML = petsOptions
    } else {
      if(petsJson.error === "not logged in") {
        // prompt log in
        alert('You must log in to create a post!')
        // document.getElementById('signInModal').style.display = "block"
      } else {
        alert("Error: " + petsJson.error)
      }
    }
  }

  return (
    <div className="profile-container">

      {/* <div className="profile-wrapper">
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
        
      </div> */}
          
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

        {pet === {} ? (<></>) : (<><div className="profile-name-p">Pet photos:</div>
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
        </div></>)}
        
      </div>

      {pet === {} ? (<></>) : (<><div className="profile-wrapper-mobile">
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
        {isOwnProfile ? (<>
        <button className="profile-edit-button" onClick={startEditCallback}>
          Edit
        </button>
        </>): (<></>)}
      </div></>)}
          
      {/* change to multiple posts later */}
      {stored.posts.length > 0 ? (<>
        <div className="profile-post">
          <div className="profile-name-p">On-going post:</div>
          <PostCard
            postID={stored.posts[0]._id}
            userID={stored.userID}
            pet_name={pet.name}
            pet_type={pet.type}
            start_date={cleanStart}
            end_date={cleanEnd}
            description={stored.posts[0].description}
            img={stored.posts[0].img}
            renderEdit={isOwnProfile}
          />
        </div>
      </>) : (<></>)}
        
      <img
        onClick={createPost}
        className="icon"
        role="button"
        alt="Add a Post"
        src={plusIcon}
      />
      <CreatePostModal />
    </div>
  );
}
