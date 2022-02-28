import React, { useState } from "react";
import Copyright from "./Copyright";
import PostCard from "./PostCard";
import closeIcon from "../photos/icons8-close-16.png";
import plusIcon from "../photos/icons8-plus-64.png";

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
  const [postCardData, setPostCardData] = useState([
    {
      title: "Maddy",
      type: "Cat",
      dates: "Feb 10 - Feb 12",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur.",
      image:
        "https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg",
    },
    {
      title: "Fishcake",
      type: "Dog",
      dates: "Feb 20 - Feb 22",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*",
    },
    {
      title: "Hawk",
      type: "Fish",
      dates: "Feb 10 - Feb 12",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Katri.jpg",
    },
    {
      title: "Bond",
      type: "Rabbit",
      dates: "Feb 10 - Feb 12",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/rabbit-care-sheet",
    },
  ]);
  const postCardElements = [];
  const start = Math.min((page - 1) * MAX_ITEMS_PER_PAGE, postCardData.length);
  const end = Math.min(page * MAX_ITEMS_PER_PAGE, postCardData.length);
  for (let i = start; i < end; i++) {
    const newIndex = postCardElements.length;
    postCardElements.push(
      <PostCard
        title={postCardData[i].title}
        type={postCardData[i].type}
        dates={postCardData[i].dates}
        description={postCardData[i].description}
        image={postCardData[i].image}
        onDelete={() => {
          if (
            window.confirm("Are you really really sure that you wanna delete?")
          ) {
            const newArray = postCardData.slice();
            newArray.splice(newIndex, 1);
            setPostCardData(newArray);
          }
        }}
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
                <input type="text" class="form__input" id="petName"></input>
                <div class="form__input-error-message"></div>
              </div>
              <div class="form__input-group">
                <label for="startDate">Start date</label>
                <input type="date" class="form__input" id="startDate"></input>
                <div class="form__input-error-message"></div>
              </div>
              <div class="form__input-group">
                <label for="endDate">End date</label>
                <input type="date" class="form__input" id="endDate"></input>
                <div class="form__input-error-message"></div>
              </div>
              <div class="form__input-group">
                <label for="petPhoto">Pet Photo</label>
                <input type="file" class="form__input" id="petPhoto"></input>
                <div class="form__input-error-message"></div>
              </div>
              <div class="form__input-group">
                <label for="description">Description</label>
                <textarea class="form__input" id="description"></textarea>
                <div class="form__input-error-message"></div>
              </div>
              <button
                class="form__button"
                type="submit"
                onClick={() => {
                  setPostCardData([
                    ...postCardData,
                    {
                      title: document.getElementById("petName").value,
                      type: "",
                      dates:
                        document.getElementById("startDate").value +
                        " - " +
                        document.getElementById("endDate").value,
                      description: document.getElementById("description").value,
                      image: "",
                    },
                  ]);
                  closeCreatePostModal();
                }}
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

export default Posts;
