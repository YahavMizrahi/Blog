const INTIAL_STATE = {
  isSignedIn: null,
  userDetails: "",
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isSignedIn: true, userDetails: action.payload };
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userDetails: null };
    default:
      return state;
  }
};
