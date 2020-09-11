import { server } from "../../apis/server";
import history from "../../history";

export const signIn = (userDetails) => {
  return {
    type: "SIGN_IN",
    payload: userDetails,
  };
};
export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const createPost = (formValues) => async (dispatch, getState) => {
  const { userDetails } = getState().auth;
  await server
    .post("/createPost", { formValues, author: userDetails.username })
    .then(
      (response) => {
        if (response) {
          // dispatch({
          //   type: "CREATE_POST",
          //   payload: { ...formValues, author: userDetails.username },
          // });
          history.push("/blog/posts");
          console.log("post added successfully");
        }
      },
      (error) => {
        console.log(error);
      }
    );
};

// export const fetchPosts = () => async (dispatch) => {
//   return await server.get("/posts");
//   // console.log(response.data);
//   // return response.data;
//   // dispatch({ type: "FETCH_POSTS", payload: response.data });
// };

// export const createUser = formValues => async (dispatch, getState)=> {
// server.post("/register",formValues).then(response=>{
//   const response = await streamsAPI.post("/streams", formValue);
//   dispatch({ type: "CREATE_USER", payload: response.data });
//   history.push("/");
// })

// };

// export const createStream = (formValues) => async (dispatch, getState) => {
//   const { userId } = getState().auth;
//   const response = await streamsAPI.post("/streams", { ...formValues, userId });
//   dispatch({ type: CREATE_STREAM, payload: response.data });
//   history.push("/");
// };

// export const fetchStreams = () => async (dispatch) => {
//   const response = await streamsAPI.get("/streams");
//   dispatch({ type: FETCH_STREAMS, payload: response.data });
// };

// export const fetchStream = (id) => async (dispatch) => {
//   const response = await streamsAPI.get(`/streams/${id}`);
//   dispatch({ type: FETCH_STREAM, payload: response.data });
// };

// export const editStream = (id, formValues) => async (dispatch) => {
//   const response = await streamsAPI.patch(`/streams/${id}`, formValues);
//   dispatch({ type: EDIT_STREAM, payload: response.data });
//   history.push("/");
// };

// export const deleteStream = (id) => async (dispatch) => {
//   await streamsAPI.delete(`/streams/${id}`);
//   dispatch({ type: DELETE_STREAM, payload: id });
//   history.push("/");
// };
