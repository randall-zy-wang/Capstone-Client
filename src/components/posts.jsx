import React, { useState } from "react";
import Copyright from "./Copyright";
import PostCard from "./PostCard";
import closeIcon from "../photos/icons8-close-16.png";
import plusIcon from "../photos/icons8-plus-64.png";
import { useEffect } from "react";
import SignInModal from "./SignInModal";

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
      .then(function (data) {
        setPostCardData(data);
      });

    document.getElementById("submit_post_button").addEventListener("click", (e) => {
      e.preventDefault()
      storePosts()
      closeCreatePostModal();
    })

    document.getElementById("create_post_button").addEventListener("click", async (e) => {
      e.preventDefault()
        // if user is logged in
        let petsJson
        try {
          let response = await fetch('/api/pets')
          petsJson = await response.json()
        } catch (error) {
          petsJson = {status: "error", error: error}
        }
        if(petsJson.status === "success"){
          console.log(petsJson.pets)
          let petsOptions = petsJson.pets.forEach(pet => {
            petsOptions += `<option value="${pet}">${pet}</option>\t`
          });
          document.getElementById("pets_dropdown").innerHTML = petsOptions
          setTimeout(() => {
            createPostModal.classList.add("show");
          }, 25);
          const createPostModal = document.getElementById("createPostModal");
          createPostModal.style.display = "block";
        } else {
          if(petsJson.error === "not logged in") {
            // prompt log in
            alert('You must log in to create a post!')
            document.getElementById('signInModal').style.display = "block"
          } else {
            alert(petsJson.error)
          }
        }
    })
  }, [page])

  const postCardElements = [];
  const start = Math.min((page - 1) * MAX_ITEMS_PER_PAGE, postCardData.length);
  const end = Math.min(page * MAX_ITEMS_PER_PAGE, postCardData.length);

  for (let i = start; i < end; i++) {
    // const newIndex = postCardElements.length;
    let cleanStart = new Date(postCardData[i].start_date).toLocaleDateString();
    let cleanEnd = new Date(postCardData[i].end_date).toLocaleDateString();
    postCardElements.push(
      <PostCard
        pet_name={postCardData[i].pet_name}
        pet_type={postCardData[i].pet_type}
        start_date={cleanStart}
        end_date={cleanEnd}
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
      <h1 className="post-title">Sitting Posts</h1>
      <div>{postCardElements}</div>
      <Copyright />
      <img
        id="create_post_button"
        className="icon"
        role="button"
        alt="Add a Post"
        src={plusIcon}
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
                <label for="pets">Choose a pet:  </label>
                <select name="pets" id="pets_dropdown">
                  <option value="pet 1">pet 1</option>
                  <option value="volvo">Add a pet</option>
                </select>
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
              <button
                id="submit_post_button"
                class="form__button"
                type="submit"
                // onClick={() => {
                //   setPostCardData([
                //     ...postCardData,
                //     {
                //       title: document.getElementById("petName").value,
                //       type: "",
                //       dates:
                //         document.getElementById("startDate").value +
                //         " - " +
                //         document.getElementById("endDate").value,
                //       description: document.getElementById("description").value,
                //       image: "",
                //     },
                //   ]);
                //   closeCreatePostModal();
                // }}
              >
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
      img: img,
    };

    // console.log(myData)
    let postPetResponse = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify(myData),
      headers: { "Content-Type": "application/json" },
    });
    let status = await postPetResponse.json();
    if (status.status === "error") {
      alert("Error: ", status.error);
    } else {
      document.getElementById("pet_name").value = "";
      document.getElementById("pet_type").value = "";
      document.getElementById("description").innerHTML = "";
      document.getElementById("start_date").innerHTML = "";
      document.getElementById("end_date").innerHTML = "";
      document.getElementById("img_link").innerHTML = "";
      alert("successfully uploaded");
      window.location.href = "/api/posts";
    }
    closeCreatePostModal();
  } catch (error) {
    console.log("There was an error: " + error);
  }
}

export default Posts;
