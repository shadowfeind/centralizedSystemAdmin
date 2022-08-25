import {
  GET_NOTIFICATION_EMPLOYEELIST_SEARCH_FAIL,
  GET_NOTIFICATION_EMPLOYEELIST_SEARCH_REQUEST,
  GET_NOTIFICATION_EMPLOYEELIST_SEARCH_RESET,
  GET_NOTIFICATION_EMPLOYEELIST_SEARCH_SUCCESS,
  GET_NOTIFICATION_FCM_TOKEN_FAIL,
  GET_NOTIFICATION_FCM_TOKEN_REQUEST,
  GET_NOTIFICATION_FCM_TOKEN_RESET,
  GET_NOTIFICATION_FCM_TOKEN_SUCCESS,
  POST_NOTIFICATION_FCM_TOKEN_FAIL,
  POST_NOTIFICATION_FCM_TOKEN_REQUEST,
  POST_NOTIFICATION_FCM_TOKEN_RESET,
  POST_NOTIFICATION_FCM_TOKEN_SUCCESS,
} from "./IndividualNotificationConstants";

export const getNotificationEmployeeListSearchReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_NOTIFICATION_EMPLOYEELIST_SEARCH_REQUEST:
      return { loading: true };
    case GET_NOTIFICATION_EMPLOYEELIST_SEARCH_SUCCESS:
      return { loading: false, notificationEmployeeList: action.payload };
    case GET_NOTIFICATION_EMPLOYEELIST_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    case GET_NOTIFICATION_EMPLOYEELIST_SEARCH_RESET:
      return {};
    default:
      return state;
  }
};

export const getNotificationFcmTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_FCM_TOKEN_REQUEST:
      return { loading: true };
    case GET_NOTIFICATION_FCM_TOKEN_SUCCESS:
      return { loading: false, notificationFcmToken: action.payload };
    case GET_NOTIFICATION_FCM_TOKEN_FAIL:
      return { loading: false, error: action.payload };
    case GET_NOTIFICATION_FCM_TOKEN_RESET:
      return {};
    default:
      return state;
  }
};

export const postNotificationFcmTokenReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_NOTIFICATION_FCM_TOKEN_REQUEST:
        return { loading: true };
      case POST_NOTIFICATION_FCM_TOKEN_SUCCESS:
        return { loading: false, notificationFcmToken: action.payload };
      case POST_NOTIFICATION_FCM_TOKEN_FAIL:
        return { loading: false, error: action.payload };
      case POST_NOTIFICATION_FCM_TOKEN_RESET:
        return {};
      default:
        return state;
    }
  };
  
