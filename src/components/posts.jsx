import React, { useState } from "react";
import Copyright from "./Copyright";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";
import plusIcon from "../photos/icons8-plus-64.png";
import { useEffect } from "react";

const MAX_ITEMS_PER_PAGE = 5;

const Posts = () => {
  const [page, setPage] = useState(1);
  const [postCardData, setPostCardData] = useState({});

  useEffect(() => {
    fetch(`/posts`)
      .then((response) => response.json())
      .then(function (data) {
        setPostCardData(data);
      });
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
        userID={postCardData[i].userID}
        pet_name={postCardData[i].pet.name}
        pet_type={postCardData[i].pet.type}
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

  async function createPost () {
      let petsJson
      try {
        let response = await fetch('/posts/pets')
        petsJson = await response.json()
      } catch (error) {
        petsJson = {status: "error", error: error}
      }
      if(petsJson.status === "success"){
        console.log(petsJson);
        
        // I have no idea why but these next lines have to exist together to make it work
        setTimeout(() => {
          createPostModal.classList.add("show");
        }, 25);
        const createPostModal = document.getElementById("createPostModal");
        createPostModal.style.display = "block";


        let petsOptions = petsJson.pets.map(pet => {
          return `<option value="${pet.name}">${pet.name}</option>\t`
        });
        petsOptions += `<option value="add"><a>Add a pet</a></option>`
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
    <main id="posts">
      <h1 className="post-title">Sitting Posts</h1>
      <div>{postCardElements}</div>
      <Copyright />
      <img
        onClick={createPost}
        className="icon"
        role="button"
        alt="Add a Post"
        src={plusIcon}
      />
      <CreatePostModal />
      <nav className="page-nav" aria-label="Page navigation">
        <div>
          <ul className="pagination">
            <li className="page-item">
              <span className="page-link" onClick={() => setPage(page - 1)}>
                Previous
              </span>
            </li>
            <li className="page-item">
              <span className="page-link" onClick={() => setPage(1)}>
                1
              </span>
            </li>
            <li className="page-item">
              <span className="page-link" onClick={() => setPage(2)}>
                2
              </span>
            </li>
            <li className="page-item">
              <span className="page-link" onClick={() => setPage(3)}>
                3
              </span>
            </li>
            <li className="page-item">
              <span className="page-link" onClick={() => setPage(page + 1)}>
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
