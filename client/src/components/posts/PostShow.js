import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { server } from "../../apis/server";

import AddComment from "./comments/AddComment";
import CommentsList from "./comments/CommentsList";
import PostDelete from "./PostDelete";

import "./style/PostShow.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";

const PostShow = ({ match, isSignedIn, userDetails }) => {
  const [postSelected, setPostSelected] = useState({
    author: "",
    time: "",
    img: "",
    post: "",
    title: "",
    id: match.params.id,
  });

  const [comments, setComments] = useState([]);

  const [showDeleteModal, setShowModal] = useState(false);

  var pic = require("../Navbar/blacklogo.png");
  if (!postSelected.img) {
    postSelected.img = pic;
  }
  const getComments = async () => {
    server
      .get(`/comments/${postSelected.id}`)
      .then((res) => setComments([...res.data[0]]));
  };
  useEffect(() => {
    const getPostSelected = async (id) => {
      server.get(`/post/${id}`).then((res) => {
        setPostSelected({ ...res.data, id: id });
      });
      getComments();
    };

    getPostSelected(postSelected.id);
  }, [postSelected.id]);

  const renderIfLogin = () => {
    if (isSignedIn) {
      return (
        <div className="like-wrap">
          <AddComment getComments={getComments} idPost={postSelected.id} />

          <span style={{ fontSize: "13px" }}> 1</span>
          <FontAwesomeIcon className="like-icon" icon={faThumbsUp} />
        </div>
      );
    }
  };
  const renderIfUserAdmin = () => {
    if (isSignedIn && userDetails.username === postSelected.author) {
      return (
        <div className="btn-postshow">
          <Link
            className="btn-edit-post"
            to={`/blog/post/edit/${postSelected.id}`}
          >
            Edit
          </Link>
          <div className="or">Or</div>
          <button
            className="btn-delete-modal"
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
        </div>
      );
    }
  };
  const closeModalHandler = () => setShowModal(false);

  return (
    <div>
      <div className="container-postShow">
        <div className="header-postShow">
          <h1>{postSelected.title}</h1>
          <p className="br"></p> <br></br>
          <div className="details-postShow">
            <span>{postSelected.author}, </span>
            <span>{postSelected.time}</span>
          </div>
        </div>
        <div className="img-postShow">
          <img
            className="pic-postShow"
            alt="DestroyImage"
            src={postSelected.img}
          />
        </div>

        <div className="text-post">
          <p>{postSelected.post}</p>
        </div>
        {renderIfUserAdmin()}
      </div>

      <div className="container-comment-postShow">
        {renderIfLogin()}{" "}
        <div className="comments-list">
          <CommentsList
            idPost={postSelected.id}
            comments={comments}
            // getComments={() => getComments()}
          />
        </div>
      </div>

      {showDeleteModal ? (
        <div className="dledteModal">
          <div className="back-drop" onClick={closeModalHandler}></div>
          <PostDelete
            postid={postSelected.id}
            post={postSelected}
            show={showDeleteModal}
            close={closeModalHandler}
          />
        </div>
      ) : null}
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
export default connect(mapStateToProps, {})(PostShow);
