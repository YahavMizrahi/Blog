import React, { useState, useEffect, useCallback } from "react";
import PostForm from "./PostForm";
import { server } from "../../apis/server";
import history from "../../history";
const details = {
  author: "",
  time: "",
  img: "",
  post: "",
  title: "",
  id: "",
};
const PostEdit = ({
  match: {
    params: { id },
  },
}) => {
  const [postSelectedToedit, setPostSelected] = useState({
    ...details,
  });

  const userDetails = JSON.parse(localStorage.getItem("whoSignIn"));
  if (!userDetails || userDetails === postSelectedToedit.author)
    history.push(`/blog/post/${postSelectedToedit.id}`);

  const getPostSelected = useCallback(() => {
    server.get(`/post/${id}`).then((res) => {
      !res.data
        ? history.push("/blog/posts")
        : setPostSelected({ ...res.data, id: id });
    });
  }, [setPostSelected, id]);

  useEffect(() => {
    getPostSelected();
  }, [getPostSelected]);

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

  const onFormChange = async (formValue) => {
    formValue.preventDefault();
    const { name, value } = formValue.target;
    setPostSelected({
      ...postSelectedToedit,
      [name]: value,
    });
    if (formValue.target.files) {
      const imageBase64 = await convertImagFileToBase64(
        formValue.target.files[0]
      );
      setPostSelected({ ...postSelectedToedit, img: imageBase64 });
    }
  };

  const clickOnSubmit = (formValue) => {
    formValue.preventDefault();
    editPost({ ...postSelectedToedit });
  };

  const editPost = async (formValues) => {
    await server.post("/postEdit", { formValues }).then(
      (response) => {
        if (response) {
          history.push(`/blog/post/${formValues.id}`);
          console.log("post edited successfully");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div className="add-container-grid">
      <h3 className="create-post-title">Edit Post</h3>

      <div>
        <div className="grid-form">
          <PostForm
            onSubmit={clickOnSubmit}
            changeHandler={onFormChange}
            postDetails={postSelectedToedit}
            pathname={`/blog/post/${postSelectedToedit.id}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
