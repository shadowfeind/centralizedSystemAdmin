import {
  GET_ALL_TEACHER_NOTIFICATION_FAIL,
  GET_ALL_TEACHER_NOTIFICATION_REQUEST,
  GET_ALL_TEACHER_NOTIFICATION_RESET,
  GET_ALL_TEACHER_NOTIFICATION_SUCCESS,
  GET_LIST_TEACHER_NOTIFICATION_FAIL,
  GET_LIST_TEACHER_NOTIFICATION_REQUEST,
  GET_LIST_TEACHER_NOTIFICATION_RESET,
  GET_LIST_TEACHER_NOTIFICATION_SUCCESS,
  GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_FAIL,
  GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_REQUEST,
  GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_RESET,
  GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_SUCCESS,
  POST_TEACHER_NOTIFICATION_FAIL,
  POST_TEACHER_NOTIFICATION_REQUEST,
  POST_TEACHER_NOTIFICATION_RESET,
  POST_TEACHER_NOTIFICATION_SUCCESS,
} from "./TeacherNotificationConstants";

export const getAllTeacherNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TEACHER_NOTIFICATION_REQUEST:
      return { loading: true };
    case GET_ALL_TEACHER_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        allTeacherNotification: action.payload,
      };
    case GET_ALL_TEACHER_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_TEACHER_NOTIFICATION_RESET:
      return {};
    default:
      return state;
  }
};


export const getListTeacherNotificationReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_LIST_TEACHER_NOTIFICATION_REQUEST:
        return { loading: true };
      case GET_LIST_TEACHER_NOTIFICATION_SUCCESS:
        return {
          loading: false,
          listTeacherNotification: action.payload,
        };
      case GET_LIST_TEACHER_NOTIFICATION_FAIL:
        return { loading: false, error: action.payload };
      case GET_LIST_TEACHER_NOTIFICATION_RESET:
        return {};
      default:
        return state;
    }
  };

  export const getSingleCreateTeacherNotificationReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_REQUEST:
        return { loading: true };
      case GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_SUCCESS:
        return {
          loading: false,
          singleCreateTeacherNotification: action.payload,
        };
      case GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_FAIL:
        return { loading: false, error: action.payload };
      case GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_RESET:
        return {};
      default:
        return state;
    }
  };

  export const postTeacherNotificationReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_TEACHER_NOTIFICATION_REQUEST:
        return { loading: true };
      case POST_TEACHER_NOTIFICATION_SUCCESS:
        return {
          loading: false,
          success:true
        };
      case POST_TEACHER_NOTIFICATION_FAIL:
        return { loading: false, error: action.payload };
      case POST_TEACHER_NOTIFICATION_RESET:
        return {};
      default:
        return state;
    }
  };