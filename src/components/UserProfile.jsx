import React from "react";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";

import wuyanzu from "../photos/wuyanzu.png";
import facebook from "../photos/facebook2.png";
import instagram from "../photos/instagram.png";
import plusIcon from "../photos/icons8-plus-64.png";

import pet1 from "../photos/pet1.jpg";
import pet2 from "../photos/pet2.jpg";
import pet3 from "../photos/pet3.jpg";
import pet4 from "../photos/pet4.jpg";
import add from "../photos/add.png";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function UserProfile({ stored, startEditCallback }) {
  const url = window.location.href;

  let loggedInUser = window.localStorage.getItem("user");
  let renderedUser;
  if (url.endsWith("/profile")) {
    renderedUser = loggedInUser;
  } else {
    renderedUser = url.substring(url.indexOf("/profile"));
  }
  let isOwnProfile = loggedInUser === renderedUser;

  let pet = {};
  let hasPet = false;
  if (stored.pets[0].name) {
    pet = stored.pets[0];
    hasPet = true;
  }

  let cleanStart, cleanEnd;
  if (stored.posts.length > 0) {
    cleanStart = new Date(stored.posts[0].start_date).toLocaleDateString();
    cleanEnd = new Date(stored.posts[0].end_date).toLocaleDateString();
  }

  async function createPost() {
    let petsJson;
    try {
      let response = await fetch("/posts/pets");
      petsJson = await response.json();
    } catch (error) {
      petsJson = { status: "error", error: error };
    }
    if (petsJson.status === "success") {
      // I have no idea why but these next lines have to exist together to make it work
      setTimeout(() => {
        createPostModal.classList.add("show");
      }, 25);
      const createPostModal = document.getElementById("createPostModal");
      createPostModal.style.display = "block";
      // ends here

      let petsOptions = petsJson.pets.map((pet) => {
        return `<option value="${pet.name}">${pet.name}</option>\t`;
      });
      petsOptions += `<option value="add">Add a pet</option>`;
      document.getElementById("pets_dropdown").innerHTML = petsOptions;
    } else {
      if (petsJson.error === "not logged in") {
        // prompt log in
        alert("You must log in to create a post!");
        // document.getElementById('signInModal').style.display = "block"
      } else {
        alert("Error: " + petsJson.error);
      }
    }
  }

  return (
    <div>
      <div className="profile-container">
        <div className="profile-wrapper">
          <img
            className="profile-pic"
            alt={"headshot"}
            src={stored.headimg || wuyanzu}
          ></img>

          {hasPet ? (
            <>
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
              <div className="profile-row">
                <span className="profile-row-name">Pet Age:</span>
                <span className="profile-row-value"> {pet.age}</span>
              </div>
            </>
          ) : (
            <></>
          )}

          {loggedInUser === renderedUser ? (
            <>
              <button
                className="profile-edit-button"
                onClick={startEditCallback}
              >
                Edit
              </button>
            </>
          ) : (
            <></>
          )}
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
            {stored.contact.instagram == "" || null ? (
              <></>
            ) : (
              <>
                <a
                  href={"https://www.instagram.com/" + stored.contact.instagram}
                  target="new"
                >
                  <img
                    className="profile-icon"
                    alt={"instagram"}
                    src={instagram}
                  ></img>
                </a>
              </>
            )}
            {stored.contact.facebook == "" || null ? (
              <></>
            ) : (
              <>
                <a
                  href={"https://www.facebook.com/" + stored.contact.facebook}
                  target="new"
                >
                  <img
                    className="profile-icon"
                    alt={"facebook"}
                    src={facebook}
                  ></img>
                </a>
              </>
            )}
          </div>
          {stored.contact.phone == "" || null ? (
            <></>
          ) : (
            <>
              <div className="profile-icons">
                <a href={"tel:+" + stored.contact.phone}>
                  {stored.contact.phone}
                </a>
              </div>
            </>
          )}

          {hasPet ? (
            <>
              <div className="pet-photos">
                <div className="swiper-container">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ autoplay: true, delay: 2000 }}
                  >
                    <SwiperSlide>
                      <div className="mask">
                        <img
                          className="content"
                          src={stored.pet1 ? stored.pet1 : pet1}
                          alt={"pet photo1"}
                          style={{ width: "100%" }}
                        />
                        <div className="mask-content">
                          <div className="pet-name">{stored.petname}</div>
                          <div className="pet-breed">{stored.breed}</div>
                          <div className="pet-size">{stored.petSize}</div>
                        </div>
                      </div>
                      <div className="photo-desc">{stored.bio}</div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="mask">
                        <img
                          className="content"
                          src={stored.pet2 ? stored.pet2 : pet2}
                          alt={"pet photo2"}
                          style={{ width: "100%" }}
                        />
                        <div className="mask-content">
                          <div className="pet-name">{stored.petname}</div>
                          <div className="pet-breed">{stored.breed}</div>
                          <div className="pet-size">{stored.petSize}</div>
                        </div>
                      </div>
                      <div className="photo-desc">{stored.bio}</div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="mask">
                        <img
                          className="content"
                          src={stored.pet3 ? stored.pet3 : pet3}
                          alt={"pet photo3"}
                          style={{ width: "100%" }}
                        />
                        <div className="mask-content">
                          <div className="pet-name">{stored.petname}</div>
                          <div className="pet-breed">{stored.breed}</div>
                          <div className="pet-size">{stored.petSize}</div>
                        </div>
                      </div>
                      <div className="photo-desc">{stored.bio}</div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="mask">
                        <img
                          className="content"
                          src={stored.pet4 ? stored.pet4 : pet4}
                          alt={"pet photo4"}
                          style={{ width: "100%" }}
                        />
                        <div className="mask-content">
                          <div className="pet-name">{stored.petname}</div>
                          <div className="pet-breed">{stored.breed}</div>
                          <div className="pet-size">{stored.petSize}</div>
                        </div>
                      </div>
                      <div className="photo-desc">{stored.bio}</div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="profile-con">
        {stored.posts.length > 0 ? (
          <>
            <div className="profile-name-post">On-going post:</div>
            <div className="profile-post">
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
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
