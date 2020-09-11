import React, { useState } from "react";
import PostForm from "./PostForm";
import { connect } from "react-redux";
import { createPost } from "../../redux/action";
import "./style/PostAdd.css";

const PostAdd = ({ createPost }) => {
  const [newBlogPost, setNewBlogPost] = useState({
    title: "",
    post: "",
    time: new Date().toLocaleString(),
    img: "",
  });

  const convertImagFileToBase64 = (imagefile) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imagefile);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const clickOnSubmit = (formValue) => {
    formValue.preventDefault();
    createPost(newBlogPost);
    setNewBlogPost({
      title: "",
      post: "",
      time: new Date().toLocaleString(),
      img: null,
    });
  };

  const onFormChange = async (formValue) => {
    formValue.preventDefault();
    const { name, value } = formValue.target;
    setNewBlogPost({
      ...newBlogPost,
      [name]: value,
    });
    if (formValue.target.files) {
      const imageBase64 = await convertImagFileToBase64(
        formValue.target.files[0]
      );
      setNewBlogPost({ ...newBlogPost, img: imageBase64 });
    }
  };

  return (
    <div className="add-container-grid">
      <h3 className="create-post-title">Create a Post</h3>

      <div>
        <div className="grid-form">
          <PostForm
            onSubmit={clickOnSubmit}
            changeHandler={onFormChange}
            postDetails={newBlogPost}
            pathname="/blog/posts"
          />
        </div>
      </div>
    </div>
  );
};

export default connect(null, { createPost })(PostAdd);
