const PORT = process.env.PORT || 3005;
const bodyParser = require("body-parser"),
  express = require("express"),
  app = express(),
  {
    signUpDB,
    verificationLogin,
    createPostDB,
    getPostsList,
    getPost,
    deletePostDB,
    updatePostDB,
  } = require("./firebase/config");

const multer = require("multer");
const { response } = require("express");

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./Images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + ".jpg");
  },
});
const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  const allowedOrigins = "http://localhost:3000";
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//APP config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//RESTFULL ROUTES

// create a register request and check if the user exist
app.post("/registerRequest", (req, res) => {
  signUpDB(req.body).then((response) => {
    if (!response) {
      res.status("404").send();
      return;
    }
    res.send(response);
  });
});

// create a login request and check if the user exist
app.post("/loginRequest", (req, res) => {
  const userDetails = req.body;
  verificationLogin(userDetails).then((response) => {
    if (!response) {
      res.status("404").send("Login Error");
      return false;
    }

    res.send(response);
    return true;
  });
});

//create a post request
app.post("/createPost", (req, res) => {
  const postDetails = req.body;
  createPostDB(postDetails.formValues, postDetails.author).then((response) => {
    if (!response) {
      console.log("Error adding post");
      res.status("404").send("Error adding post");
      return false;
    }
    console.log("POST ADDED TO FIREBASE REALTIME");
    res.send(response);
    return postDetails;
  });
});
//edit post request
app.post("/postEdit", (req, res) => {
  const postDetails = req.body;
  console.log("backend edit post");
  updatePostDB(postDetails.formValues).then((response) => {
    if (!response) {
      console.log("Error edited post");
      res.status("404").send("Error edited post");
      return false;
    }
    console.log("POST EDITED - FIREBASE REALTIME");
    res.send(response);
    return postDetails;
  });
});

app.get("/post/:id", (req, res) => {
  const id = req.params.id;
  getPost(id).then((response) => {
    if (!response) {
      console.log("Error get post");
      response.status("404").send("Error adding post");
      return false;
    }
    res.send(response);
    return response;
  });
});

app.get("/posts", (req, res) => {
  getPostsList().then((response) => {
    if (!response) {
      console.log("Error gets posts");
      response.status("404").send("Error adding post");
      return false;
    }

    res.send(response);
    return res;
  });
});
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  deletePostDB(id).then((response) => {
    if (!response) {
      console.log("Error adding post");
      res.status("404").send("Error delete post");
      return false;
    }
    console.log("POST DELETED FROM FIREBASE REALTIME");
    res.send(response);
    return true;
  });
});

// app.post("/upfile", upload.single("image"), (req, res) => {
//   const file = req.file;
//   console.log(file);
//   if (file) {
//     uploadImageToStorage(file);
//   }
//   // res.send(postDetails);

//   // return postDetails;
// });

app.listen(PORT, () => {
  console.log(
    "+++++++++++++++_SERVER_RUN_IN_PORT:_" + PORT + "+++++++++++++++"
  );
});
