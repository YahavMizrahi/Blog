import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import "./style/PostItem.css";

var pic = require("../Navbar/blacklogo.png");

const PostItem = ({ id, post, time, author, title, img }) => {
  if (!img) {
    img = pic;
  }
  return (
    <div className="blog-card">
      <div className="meta">
        <img className="photo" alt="imageDestroyed" src={img} />
        <ul className="details">
          <li className="author">
            <Link className="tag-a" to="/user">
              <FontAwesomeIcon
                style={{ color: "gold", marginRight: "3px" }}
                className="user-icon"
                icon={faUser}
              />

              {author}
            </Link>
          </li>

          <li className="date">
            {" "}
            <FontAwesomeIcon
              style={{ color: "gold", marginRight: "3px" }}
              className="user-icon"
              icon={faCalendar}
            />
            {time}
          </li>
        </ul>
      </div>
      <div className="description">
        {title}
        <p> {post.substr(0, 40)}...</p>
        <p id={id} className="tag-a read-more">
          <Link className="tag-a read-more" to={`/blog/post/${id}`}>
            <FontAwesomeIcon
              style={{
                color: "gray",
                borderRadius: "50%",
                marginRight: "8px",
                fontSize: "20px",
                padding: "3px",
                background: "#fff",
              }}
              className="user-icon"
              icon={faInfoCircle}
            />
            Read-More
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PostItem;
