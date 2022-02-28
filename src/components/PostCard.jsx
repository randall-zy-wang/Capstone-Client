import React from "react";
import deleteIcon from "../photos/icons8-delete-24.png";

const PostCard = (props) => (
  <div className="post-card">
    <img className="post-card-image" alt={props.title} src={props.image} />
    <div className="post-card-title">{props.title}</div>
    <div className="post-card-subtitle">
      {props.type} | {props.dates}
    </div>
    <div className="post-card-description">{props.description}</div>
    <div className="post-card-action-icon-bar">
      <img
        className="post-card-action-icon"
        role="button"
        alt="Delete"
        src={deleteIcon}
        onClick={props.onDelete}
      />
    </div>
  </div>
);
export default PostCard;
