import { GET_ALL_SMS_TEACHER_NOTIFICATION_FAIL, GET_ALL_SMS_TEACHER_NOTIFICATION_REQUEST, GET_ALL_SMS_TEACHER_NOTIFICATION_RESET, GET_ALL_SMS_TEACHER_NOTIFICATION_SUCCESS, GET_LIST_SMS_TEACHER_NOTIFICATION_FAIL, GET_LIST_SMS_TEACHER_NOTIFICATION_REQUEST, GET_LIST_SMS_TEACHER_NOTIFICATION_RESET, GET_LIST_SMS_TEACHER_NOTIFICATION_SUCCESS, GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_FAIL, GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_REQUEST, GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_RESET, GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_SUCCESS, POST_SMS_TEACHER_NOTIFICATION_FAIL, POST_SMS_TEACHER_NOTIFICATION_REQUEST, POST_SMS_TEACHER_NOTIFICATION_RESET, POST_SMS_TEACHER_NOTIFICATION_SUCCESS } from "./SmsTeacherNotificationConstants";

export const getAllSmsTeacherNotificationReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_SMS_TEACHER_NOTIFICATION_REQUEST:
        return { loading: true };
      case GET_ALL_SMS_TEACHER_NOTIFICATION_SUCCESS:
        return {
          loading: false,
          allSmsTeacherNotification: action.payload,
        };
      case GET_ALL_SMS_TEACHER_NOTIFICATION_FAIL:
        return { loading: false, error: action.payload };
      case GET_ALL_SMS_TEACHER_NOTIFICATION_RESET:
        return {};
      default:
        return state;
    }
  };
  
  
  export const getListSmsTeacherNotificationReducer = (state = {}, action) => {
      switch (action.type) {
        case GET_LIST_SMS_TEACHER_NOTIFICATION_REQUEST:
          return { loading: true };
        case GET_LIST_SMS_TEACHER_NOTIFICATION_SUCCESS:
          return {
            loading: false,
            listSmsTeacherNotification: action.payload,
          };
        case GET_LIST_SMS_TEACHER_NOTIFICATION_FAIL:
          return { loading: false, error: action.payload };
        case GET_LIST_SMS_TEACHER_NOTIFICATION_RESET:
          return {};
        default:
          return state;
      }
    };
  
    export const getSingleCreateSmsTeacherNotificationReducer = (state = {}, action) => {
      switch (action.type) {
        case GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_REQUEST:
          return { loading: true };
        case GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_SUCCESS:
          return {
            loading: false,
            singleCreateSmsTeacherNotification: action.payload,
          };
        case GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_FAIL:
          return { loading: false, error: action.payload };
        case GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_RESET:
          return {};
        default:
          return state;
      }
    };
  
    export const postSmsTeacherNotificationReducer = (state = {}, action) => {
      switch (action.type) {
        case POST_SMS_TEACHER_NOTIFICATION_REQUEST:
          return { loading: true };
        case POST_SMS_TEACHER_NOTIFICATION_SUCCESS:
          return {
            loading: false,
            success:true
          };
        case POST_SMS_TEACHER_NOTIFICATION_FAIL:
          return { loading: false, error: action.payload };
        case POST_SMS_TEACHER_NOTIFICATION_RESET:
          return {};
        default:
          return state;
      }
    };