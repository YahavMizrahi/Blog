import React from "react";
import { server } from "../../../apis/server";
import { connect } from "react-redux";

const Comment = ({
  comment,
  time,
  username,
  id,
  postId,
  getComments,
  isSignedIn,
  userDetails,
}) => {
  const renderIfUserAdmin = () => {
    if (isSignedIn && userDetails.username === username) {
      return (
        <button
          style={{
            float: "right",
            border: "none",
            cursor: "pointer",
            padding: "5px",
            background: "#333",
            color: "#fff",
            letterSpacing: "2px",
          }}
          className="delete-comment"
          onClick={deleteComment}
        >
          Delete Comment
        </button>
      );
    }
  };
  const deleteComment = async () => {
    server.post(`/deleteComment/${postId}/${id}`).then(() => {
      getComments();
    });
  };
  return (
    <div
      style={{
        paddingBottom: "10px",
        borderBottom: "solid 1px silver",
        boxShadow: "2px 1px 2px",
        padding: "30px",
      }}
      className="comment-card"
    >
      <div style={{ background: "#ffff80", padding: "5px" }}>
        <h4>{username}</h4>
        <div style={{ fontSize: "12px" }}>{time}</div>
      </div>

      <div style={{ wordBreak: "break-all", fontSize: "16px" }}>{comment}</div>
      {renderIfUserAdmin()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userDetails: state.auth.userDetails,
    // userDetails: JSON.parse(localStorage.getItem("whoSignIn")) || null,
  };
};
export default connect(mapStateToProps, {})(Comment);
