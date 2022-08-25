import {
  GET_ALL_MOBILE_USER_FAIL,
  GET_ALL_MOBILE_USER_REQUEST,
  GET_ALL_MOBILE_USER_RESET,
  GET_ALL_MOBILE_USER_SUCCESS,
  GET_LIST_MOBILE_USER_FAIL,
  GET_LIST_MOBILE_USER_REQUEST,
  GET_LIST_MOBILE_USER_RESET,
  GET_LIST_MOBILE_USER_SUCCESS,
  GET_SINGLE_EDIT_MOBILE_USER_FAIL,
  GET_SINGLE_EDIT_MOBILE_USER_REQUEST,
  GET_SINGLE_EDIT_MOBILE_USER_RESET,
  GET_SINGLE_EDIT_MOBILE_USER_SUCCESS,
  PUT_MOBILE_USER_FAIL,
  PUT_MOBILE_USER_REQUEST,
  PUT_MOBILE_USER_RESET,
  PUT_MOBILE_USER_SUCCESS,
} from "./MobileUsersConstants";

export const getAllMobileUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_MOBILE_USER_REQUEST:
      return { loading: true };
    case GET_ALL_MOBILE_USER_SUCCESS:
      return { loading: false, allMobileUser: action.payload };
    case GET_ALL_MOBILE_USER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_MOBILE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const getMobileUserListsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_MOBILE_USER_REQUEST:
      return { loading: true };
    case GET_LIST_MOBILE_USER_SUCCESS:
      return { loading: false, mobileUserLists: action.payload };
    case GET_LIST_MOBILE_USER_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_MOBILE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleMobileUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EDIT_MOBILE_USER_REQUEST:
      return { loading: true };
    case GET_SINGLE_EDIT_MOBILE_USER_SUCCESS:
      return { loading: false, singleMobileUser: action.payload };
    case GET_SINGLE_EDIT_MOBILE_USER_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_EDIT_MOBILE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const putMobileUserReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_MOBILE_USER_REQUEST:
      return { loading: true };
    case PUT_MOBILE_USER_SUCCESS:
      return { loading: false, success: true };
    case PUT_MOBILE_USER_FAIL:
      return { loading: false, error: action.payload };
    case PUT_MOBILE_USER_RESET:
      return {};
    default:
      return state;
  }
};
