import React from "react";

import "./style/PostDelete.css";
import { server } from "../../apis/server";
import history from "../../history";

const PostDelete = ({ show, close, postid, post }) => {
  const deletePost = (postid) => {
    server.post(`/delete/${postid}`).then((res) => {
      history.push("/blog/posts");
      alert("Post Deleted");
    });
  };

  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
      <div className="modal-header">
        <h3>Delete Post</h3>
        <span className="close-modal-btn" onClick={close}>
          X
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <h4>Sure you want to delete this post?</h4>
          <div className="p">
            {post.title}, from: {post.time}
            <div>
              <img alt="..." src={post.img} style={{ width: "100px" }} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="cnacel-modal-btn" onClick={close}>
            CANCEL
          </button>
          <button
            className="delete-modal-btn"
            onClick={() => deletePost(postid)}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDelete;
