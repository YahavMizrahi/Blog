// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

require("firebase/storage");
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyBiDcKvMdKbfcgpcgpAsH3r8ADqQb9DFLs",
  authDomain: "blog-reactapp.firebaseapp.com",
  databaseURL: "https://blog-reactapp.firebaseio.com",
  projectId: "blog-reactapp",
  storageBucket: "blog-reactapp.appspot.com",
  messagingSenderId: "576979884487",
  appId: "1:576979884487:web:c7167148ccca30b89ba1e2",
  measurementId: "G-DQG5TGJZCL",
};
// `${process.env.FIREBASE_CONFIG}`;

//initial the database
firebase.initializeApp(firebaseConfig);

// enter to DB
const database = firebase.database();
const storageRef = firebase.storage().ref();

const existUsername = async (username) => {
  const exist = await database.ref(`users/${username}`).once("value");
  return exist.exists();
};

const signUpDB = async (userDetails) => {
  return await existUsername(userDetails.username).then((val) => {
    if (val) {
      return false;
    }
    database.ref(`users/${userDetails.username}`).set(userDetails);
    return true;
  });
};

//function for check if username and password are exist
const verificationLogin = async (userDetails) => {
  try {
    const user = (
      await database.ref(`users/${userDetails.username}`).once("value")
    ).val();

    if (userDetails.password === user.password) {
      const newDetails = {
        username: userDetails.username,
      };

      return newDetails;
    }
    console.log("the password don't match");
    return false;
  } catch (e) {
    console.log(e);
    console.log("the username don't exist");
    return false;
  }
};

const getSizeOfChilds = async (root) => {
  console.log("21321", root);
  const lentghChilds = await database.ref(`${root}`).once("value");
  return lentghChilds.child();
};

const createPostDB = async (formValues, user) => {
  return await existUsername(user).then((val) => {
    if (val) {
      try {
        database.ref(`postsList`).push({ ...formValues, author: user });
        return true;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
    console.log("user not exist");
    return null;
  });
};

const updatePostDB = async (formValues) => {
  try {
    database.ref(`postsList/${formValues.id}`).update({ ...formValues });
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getPostsList = async () => {
  const posts = (await database.ref(`postsList`).once("value")).val();
  const arrPost = [];
  const arrKey = [];
  Object.keys(posts).forEach(async (key) => {
    arrPost.push({ [key]: { ...posts[key], id: key } });
  });

  return [arrPost];
};

const getPost = async (id) => {
  const post = (await database.ref(`postsList/${id}`).once("value")).val();
  // if (post) return false;
  return post;
};

const deletePostDB = async (id) => {
  try {
    database.ref(`postsList/${id}`).remove();
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const addCommentToPost = async (comment) => {
  try {
    database
      .ref(`postsList/${comment.idPost}/comments/`)
      .push({ ...comment.newComment });
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getCommentsList = async (id) => {
  const comments = (
    await database.ref(`postsList/${id}/comments`).once("value")
  ).val();

  const arrComments = [];
  if (comments) {
    Object.keys(comments).forEach(async (key) => {
      arrComments.push({ [key]: { ...comments[key], id: key } });
    });
  }

  return [arrComments];
};

const deleteCommentDB = async (postid, commentid) => {
  try {
    database.ref(`postsList/${postid}/comments/${commentid}`).remove();
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  signUpDB,
  createPostDB,
  verificationLogin,
  getPostsList,
  getPost,
  deletePostDB,
  updatePostDB,
  addCommentToPost,
  getCommentsList,
  deleteCommentDB,
};
