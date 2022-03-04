import React, { useState } from "react";
import Copyright from "./Copyright";
import PostCard from "./PostCard";
import closeIcon from "../photos/icons8-close-16.png";
import plusIcon from "../photos/icons8-plus-64.png";
import { useEffect } from "react";

const MAX_ITEMS_PER_PAGE = 5;

function closeCreatePostModal() {
  const createPostModal = document.getElementById("createPostModal");
  createPostModal.classList.remove("show");
  setTimeout(() => {
    createPostModal.style.display = "";
  }, 250);
}

const Posts = () => {
  const [page, setPage] = useState(1);
  const [postCardData, setPostCardData] = useState({});

  useEffect(() => {
    fetch(`/api/posts`)
      .then((response) => response.json())
        .then(function(data) {
          setPostCardData(data)
        })
  }, [page])
  const postCardElements = [];
  const start = Math.min((page - 1) * MAX_ITEMS_PER_PAGE, postCardData.length);
  const end = Math.min(page * MAX_ITEMS_PER_PAGE, postCardData.length);
  for (let i = start; i < end; i++) {
    // const newIndex = postCardElements.length;
    // let cleanStart = postCardData[i].start_date.getDateWithoutTime()
    // let cleanEnd = postCardData[i].end_date.getDateWithoutTime()
    postCardElements.push(
      <PostCard
        key={postCardData[i].pet_name}
        pet_name={postCardData[i].pet_name}
        pet_type={postCardData[i].pet_type}
        start_date={postCardData[i].start_date}
        end_date={postCardData[i].end_date}
        description={postCardData[i].description}
        img={postCardData[i].img}
        // image={postCardData[i].image}
        // onDelete={() => {
        //   if (
        //     window.confirm("Are you really really sure that you wanna delete?")
        //   ) {
        //     const newArray = postCardData.slice();
        //     newArray.splice(newIndex, 1);
        //     setPostCardData(newArray);
        //   }
        // }}
      />
    );
  }
  return (
    <main id="posts">
      <div>{postCardElements}</div>
      <Copyright />
      <img
        className="icon"
        role="button"
        alt="Add a Post"
        src={plusIcon}
        onClick={() => {
          const createPostModal = document.getElementById("createPostModal");
          createPostModal.style.display = "block";
          setTimeout(() => {
            createPostModal.classList.add("show");
          }, 25);
        }}
      />
      <section className="modal fade" id="createPostModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <img
                role="button"
                alt="Close"
                src={closeIcon}
                onClick={closeCreatePostModal}
              />
              <h1 className="modal-title mx-auto">Create a post</h1>
            </div>
            <div className="modal-body">
              <div class="form__input-group">
                <label for="petName">Pet Name</label>
                <input type="text" class="form__input" id="pet_name"></input>
                <div class="form__input-error-message"></div>
              </div>
              <div class="form__input-group">
                <label for="petType">Pet Type</label>
                <input type="text" class="form__input" id="pet_type"></input>
                <div class="form__input-error-message"></div>
              </div>
              <div class="form__input-group">
                <label for="startDate">Start date</label>
                <input type="date" class="form__input" id="start_date"></input>
                <div class="form__input-error-message"></div>
              </div>
              <div class="form__input-group">
                <label for="endDate">End date</label>
                <input type="date" class="form__input" id="end_date"></input>
                <div class="form__input-error-message"></div>
              </div>
              {/* <div class="form__input-group">
                <label for="petPhoto">Pet Photo</label>
                <input type="file" class="form__input" id="petPhoto"></input>
                <div class="form__input-error-message"></div>
              </div> */}
              <div class="form__input-group">
                <label for="img_link">Image Link</label>
                <input type="text" class="form__input" id="img_link"></input>
                <div class="form__input-error-message"></div>
              </div>
              <div class="form__input-group">
                <label for="description">Description</label>
                <textarea class="form__input" id="description"></textarea>
                <div class="form__input-error-message"></div>
              </div>
              <button class="form__button" type="submit" onClick={storePosts}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
      <nav className="page-nav" aria-label="Page navigation">
        <div>
          <ul class="pagination">
            <li class="page-item">
              <span class="page-link" onClick={() => setPage(page - 1)}>
                Previous
              </span>
            </li>
            <li class="page-item">
              <span class="page-link" onClick={() => setPage(1)}>
                1
              </span>
            </li>
            <li class="page-item">
              <span class="page-link" onClick={() => setPage(2)}>
                2
              </span>
            </li>
            <li class="page-item">
              <span class="page-link" onClick={() => setPage(3)}>
                3
              </span>
            </li>
            <li class="page-item">
              <span class="page-link" onClick={() => setPage(page + 1)}>
                Next
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </main>
  );
};

async function storePosts() {
  try {
    // document.getElementById("postStatus").innerHTML = "sending data..."
    let pet_name = document.getElementById("pet_name").value;
    let pet_type = document.getElementById("pet_type").value;
    let start_date = document.getElementById("start_date").value;
    let end_date = document.getElementById("end_date").value;
    let description = document.getElementById("description").value;
    let img = document.getElementById("img_link").value;
    // store the image

    const myData = {
      pet_name: pet_name,
      pet_type: pet_type,
      description: description,
      start_date: start_date,
      end_date: end_date,
      img: img
    };

    // console.log(myData)
    let postPetResponse = await fetch(`/api/posts`,
        {method: "POST", body: JSON.stringify(myData), headers: {'Content-Type': 'application/json'}}
    )
    let status = await postPetResponse.json();
    if(status.status === "error"){
        alert("Error: ", status.error);
    } else {
        document.getElementById("pet_name").value = "";
        document.getElementById("pet_type").value = "";
        document.getElementById("description").innerHTML = "";
        document.getElementById("start_date").innerHTML = "";
        document.getElementById("end_date").innerHTML = "";
        document.getElementById("img_link").innerHTML = "";
        alert("successfully uploaded")
        window.location.href = "/api/posts"
      }
      closeCreatePostModal();
  }catch(error){
      console.log("There was an error: " + error);
  }
}

export default Posts;
