import React from "react";
import {useHistory} from "react-router";
// import deleteIcon from "../photos/icons8-delete-24.png";

const PostCard = (props) => {
  const history = useHistory()

  function toUserProfile() {
    history.push('/profile?user='+ props.userID)
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
      {/* <button className="btn btn-main post-card-action-icon">
        View details
      </button> */}
        {/* <img
          className="post-card-action-icon"
          role="button"
          alt="Delete"
          src={deleteIcon}
          onClick={props.onDelete}
        /> */}
      </div>
    </div>
  );
};
export default PostCard;
