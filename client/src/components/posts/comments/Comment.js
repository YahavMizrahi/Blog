import React from "react";

const Comment = ({ comment, time, username }) => {
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
      >
        Delete Comment
      </button>
    </div>
  );
};

export default Comment;
