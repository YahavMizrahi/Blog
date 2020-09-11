import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PostForm = ({ onSubmit, changeHandler, postDetails, pathname }) => {
  const renderIfIMG = () => {
    if (postDetails.img !== "")
      return (
        <div>
          <img
            alt="DestroyImage"
            src={postDetails.img}
            style={{ width: "130px" }}
          />
          <div>To change an image, select a new file</div>
        </div>
      );
    return;
  };

  const createForm = () => {
    return (
      <form
        onSubmit={(event) => onSubmit(event)}
        onChange={(event) => changeHandler(event)}
      >
        <div className="form-item-post">
          <label className="labelNamePost">Title:</label>
          <input
            name="title"
            className="field-input-post"
            type="text"
            value={postDetails.title}
            onChange={(event) => changeHandler(event)}
            autoComplete="off"
          />
        </div>

        <div className="form-item-post">
          <textarea
            name="post"
            className="post-input"
            type="text"
            placeholder="Enter your post..."
            onChange={(event) => changeHandler(event)}
            value={postDetails.post}
          />
        </div>
        {renderIfIMG()}
        <div className="form-item-post-file">
          <input
            className="file-input"
            type="file"
            name="img"
            onChange={(event) => changeHandler(event)}
          />
        </div>
        <div>
          <div className="form-item-post grid-btn-post">
            <button className="blue-background-post btn-post " type="submit">
              OK
            </button>
            <Link to={pathname}>
              <button className="blue-border-post btn-post ">Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    );
  };
  return createForm();
};

export default connect(null, {})(PostForm);
