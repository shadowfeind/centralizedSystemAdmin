export const navLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_LINK":
      return { navLink: action.payload };
    default:
      return state;
  }
};
