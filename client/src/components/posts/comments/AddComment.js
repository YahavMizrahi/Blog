import React, { useState } from "react";
import { server } from "../../../apis/server";

// import "./style/Comment.css";

const AddComment = ({ idPost }) => {
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

    console.log("chage");
  };

  const createComment = async (newComment, id) => {
    await server.post("/addComment", { newComment, idPost }).then(
      (response) => {
        if (response) {
          console.log("comment to post added successfully");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      {console.log(newComment)}
      <form
        onSubmit={(event) => onSubmit(event)}
        onChange={(event) => changeHandler(event)}
      >
        <textarea
          name="comment"
          value={newComment.comment}
          placeholder="Add Comment..."
        ></textarea>
        <button type="submit" className="add-comment">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;
