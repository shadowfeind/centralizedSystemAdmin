import {
  GET_ALL_SMS_ACCESS_CONTROL_FAIL,
  GET_ALL_SMS_ACCESS_CONTROL_REQUEST,
  GET_ALL_SMS_ACCESS_CONTROL_RESET,
  GET_ALL_SMS_ACCESS_CONTROL_SUCCESS,
  GET_LIST_SMS_ACCESS_CONTROL_FAIL,
  GET_LIST_SMS_ACCESS_CONTROL_REQUEST,
  GET_LIST_SMS_ACCESS_CONTROL_RESET,
  GET_LIST_SMS_ACCESS_CONTROL_SUCCESS,
  GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_FAIL,
  GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_REQUEST,
  GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_RESET,
  GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_SUCCESS,
  GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_FAIL,
  GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_REQUEST,
  GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_RESET,
  GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_SUCCESS,
  POST_SMS_ACCESS_CONTROL_FAIL,
  POST_SMS_ACCESS_CONTROL_REQUEST,
  POST_SMS_ACCESS_CONTROL_RESET,
  POST_SMS_ACCESS_CONTROL_SUCCESS,
  PUT_SMS_ACCESS_CONTROL_FAIL,
  PUT_SMS_ACCESS_CONTROL_REQUEST,
  PUT_SMS_ACCESS_CONTROL_RESET,
  PUT_SMS_ACCESS_CONTROL_SUCCESS,
} from "./SmsAccessControlConstants";

export const getAllSmsAccessControlReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SMS_ACCESS_CONTROL_REQUEST:
      return { loading: true };
    case GET_ALL_SMS_ACCESS_CONTROL_SUCCESS:
      return {
        loading: false,
        allSmsAccessControl: action.payload,
      };
    case GET_ALL_SMS_ACCESS_CONTROL_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_SMS_ACCESS_CONTROL_RESET:
      return {};
    default:
      return state;
  }
};

export const getListSmsAccessControlReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_LIST_SMS_ACCESS_CONTROL_REQUEST:
        return { loading: true };
      case GET_LIST_SMS_ACCESS_CONTROL_SUCCESS:
        return {
          loading: false,
          listSmsAccessControl: action.payload,
        };
      case GET_LIST_SMS_ACCESS_CONTROL_FAIL:
        return { loading: false, error: action.payload };
      case GET_LIST_SMS_ACCESS_CONTROL_RESET:
        return {};
      default:
        return state;
    }
  };
  

  export const getSingleToCreateSmsAccessControlReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_REQUEST:
        return { loading: true };
      case GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_SUCCESS:
        return {
          loading: false,
          singleCreateSmsAccessControl: action.payload,
        };
      case GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_FAIL:
        return { loading: false, error: action.payload };
      case GET_SINGLE_TO_CREATE_SMS_ACCESS_CONTROL_RESET:
        return {};
      default:
        return state;
    }
  };


  export const getSingleToEditSmsAccessControlReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_REQUEST:
        return { loading: true };
      case GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_SUCCESS:
        return {
          loading: false,
          singleEditSmsAccessControl: action.payload,
        };
      case GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_FAIL:
        return { loading: false, error: action.payload };
      case GET_SINGLE_TO_EDIT_SMS_ACCESS_CONTROL_RESET:
        return {};
      default:
        return state;
    }
  };

  export const postSmsAccessControlReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_SMS_ACCESS_CONTROL_REQUEST:
        return { loading: true };
      case POST_SMS_ACCESS_CONTROL_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case POST_SMS_ACCESS_CONTROL_FAIL:
        return { loading: false, error: action.payload };
      case POST_SMS_ACCESS_CONTROL_RESET:
        return {};
      default:
        return state;
    }
  };

  export const putSmsAccessControlReducer = (state = {}, action) => {
    switch (action.type) {
      case PUT_SMS_ACCESS_CONTROL_REQUEST:
        return { loading: true };
      case PUT_SMS_ACCESS_CONTROL_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case PUT_SMS_ACCESS_CONTROL_FAIL:
        return { loading: false, error: action.payload };
      case PUT_SMS_ACCESS_CONTROL_RESET:
        return {};
      default:
        return state;
    }
  };


