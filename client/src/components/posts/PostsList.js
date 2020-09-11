import React, { useState, useEffect } from "react";
import "./style/PostList.css";
import { Link } from "react-router-dom";
import { server } from "../../apis/server";
import { connect } from "react-redux";
import PostItem from "./PostItem";

const Postlist = ({ isSignedIn }) => {
  const [posts, setNewPosts] = useState([]);

  const renderIfLogin = () => {
    if (isSignedIn)
      return (
        <Link to="/blog/newPost" className="add-btn">
          Create Post
        </Link>
      );
  };

  const getPosts = async () => {
    const response = await server.get(`/posts`);
    setNewPosts([...response.data[0]]);
  };

  const renderList = () => {
    return posts.map((post, index) => {
      const currentPost = Object.values(post);
      return (
        <PostItem {...currentPost[0]} key={index} id={currentPost[0].id} />
      );
    });
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container">
      <div className="btn-container">{renderIfLogin()}</div>
      <div className="listpost-container">{renderList()}</div>
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
export default connect(mapStateToProps, {})(Postlist);
