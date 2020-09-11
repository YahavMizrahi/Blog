import React, { useState } from "react";
// import "./style/Comment.css";

const CommentForm = () => {
  return (
    <div>
      <textarea placeholder="Add Comment..."></textarea>
      <button className="add-comment">Add Comment</button>
    </div>
  );
};

export default CommentForm;
