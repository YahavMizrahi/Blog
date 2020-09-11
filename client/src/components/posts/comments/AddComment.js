import React, { useState } from "react";
import { server } from "../../../apis/server";

// import "./style/Comment.css";

const AddComment = ({ idPost, getComments }) => {
  const [newComment, setNewComment] = useState({
    comment: "",
    time: new Date().toLocaleString(),
    ...JSON.parse(localStorage.getItem("whoSignIn")),
  });

  const onSubmit = (event) => {
    event.preventDefault();
    createComment(newComment, idPost);
    setNewComment({
      comment: "",
      time: new Date().toLocaleString(),
      ...JSON.parse(localStorage.getItem("whoSignIn")),
    });
  };

  const changeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setNewComment({
      ...newComment,
      [name]: value,
    });
  };

  const createComment = async (newComment) => {
    await server.post("/addComment", { newComment, idPost }).then(
      (response) => {
        if (response) {
          getComments();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <form
        onSubmit={(event) => onSubmit(event)}
        onChange={(event) => changeHandler(event)}
      >
        <textarea
          className="input-addComment"
          name="comment"
          type="text"
          value={newComment.comment}
          placeholder="Add Comment..."
          onChange={(event) => changeHandler(event)}
        ></textarea>
        <button type="submit" className="add-comment">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;
