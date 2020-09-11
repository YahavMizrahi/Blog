import React from "react";
import Comment from "./Comment";

const CommentsList = ({ comments }) => {
  const renderList = () => {
    return comments.map((comment, index) => {
      const currentComment = Object.values(comment);

      return (
        <Comment {...currentComment[0]} key={index} id={currentComment[0].id} />
      );
    });
  };

  return <div className="listComments-container">{renderList()}</div>;
};

export default CommentsList;
