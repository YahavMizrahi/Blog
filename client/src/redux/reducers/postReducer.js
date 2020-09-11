export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return { ...state, [action.payload.posts]: action.payload };
    // case "FETCH_POST":
    //   return { ...state, [action.payload.id]: action.payload };
    case "CREATE_POST":
      return { ...state, [action.payload.selectedPost]: action.payload };
    // case "EDIT_POST":
    //   return { ...state, [action.payload.id]: action.payload };
    // case "DELETE_POST":
    //   return _.omit(state, action.payload);
    default:
      return state;
  }
};
