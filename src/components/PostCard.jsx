import React from "react";
import {useHistory} from "react-router";
import deleteIcon from "../photos/icons8-delete-24.png";

const PostCard = (props) => {
  const history = useHistory()

  function toUserProfile() {
    let endpoint = "/profile"
    if(props.userID) {
      endpoint += "?user=" + props.userID
    }
    history.push(endpoint)
  }

  async function deletePost() {
    try {
      let response = await fetch(`/posts`, {
        method: "DELETE",
        body: JSON.stringify({ postID: props.postID }),
        headers: { "Content-Type": "application/json" },
      });
      let responesJSON = await response.json();
      if (responesJSON.status == "error") {
        alert("Error:" + responesJSON.error);
      } else {
        alert("Successfully deleted your post!")
        window.location.reload(false) // possibly need to create a state for reload.
      }
    } catch (error) {
      console.log("error:" + error);
    }
  } 

  return (
    <div className="post-card" key={props.pet_name} onClick={toUserProfile}>
      <img className="post-card-image" alt={props.pet_name} src={props.img} />
      <div className="post-card-title">{props.pet_name} | {props.pet_type}</div>
      <div className="post-card-subtitle">
        {props.start_date} | {props.end_date}
      </div>
      <div className="post-card-description">Description: {props.description}</div>
      <div className="post-card-action-icon-bar">
      {props.renderEdit ? (<>
        <img
          className="post-card-action-icon"
          role="button"
          alt="Delete"
          src={deleteIcon}
          onClick={deletePost}
        />
      </>): (<></>)}
      
      </div>
    </div>
  );
};
export default PostCard;
