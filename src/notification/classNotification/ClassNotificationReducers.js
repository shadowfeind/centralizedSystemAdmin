import {
  GET_ALL_CLASS_NOTIFICATION_FAIL,
  GET_ALL_CLASS_NOTIFICATION_REQUEST,
  GET_ALL_CLASS_NOTIFICATION_RESET,
  GET_ALL_CLASS_NOTIFICATION_SUCCESS,
  GET_BULK_CLASS_NOTIFICATION_FAIL,
  GET_BULK_CLASS_NOTIFICATION_REQUEST,
  GET_BULK_CLASS_NOTIFICATION_RESET,
  GET_BULK_CLASS_NOTIFICATION_SUCCESS,
  GET_LIST_CLASS_NOTIFICATION_FAIL,
  GET_LIST_CLASS_NOTIFICATION_REQUEST,
  GET_LIST_CLASS_NOTIFICATION_RESET,
  GET_LIST_CLASS_NOTIFICATION_SUCCESS,
  POST_CLASS_NOTIFICATION_FAIL,
  POST_CLASS_NOTIFICATION_REQUEST,
  POST_CLASS_NOTIFICATION_RESET,
  POST_CLASS_NOTIFICATION_SUCCESS,
} from "./ClassNotificationConstants";

export const getAllClassNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CLASS_NOTIFICATION_REQUEST:
      return { loading: true };
    case GET_ALL_CLASS_NOTIFICATION_SUCCESS:
      return { loading: false, classNotification: action.payload };
    case GET_ALL_CLASS_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_CLASS_NOTIFICATION_RESET:
      return {};
    default:
      return state;
  }
};

export const getListClassNotificationReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_LIST_CLASS_NOTIFICATION_REQUEST:
        return { loading: true };
      case GET_LIST_CLASS_NOTIFICATION_SUCCESS:
        return { loading: false, listClassNotification: action.payload };
      case GET_LIST_CLASS_NOTIFICATION_FAIL:
        return { loading: false, error: action.payload };
      case GET_LIST_CLASS_NOTIFICATION_RESET:
        return {};
      default:
        return state;
    }
  };


  export const getBulkClassNotificationReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_BULK_CLASS_NOTIFICATION_REQUEST:
        return { loading: true };
      case GET_BULK_CLASS_NOTIFICATION_SUCCESS:
        return { loading: false, bulkClassNotification: action.payload };
      case GET_BULK_CLASS_NOTIFICATION_FAIL:
        return { loading: false, error: action.payload };
      case GET_BULK_CLASS_NOTIFICATION_RESET:
        return {};
      default:
        return state;
    }
  };

  export const postClassNotificationReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_CLASS_NOTIFICATION_REQUEST:
        return { loading: true };
      case POST_CLASS_NOTIFICATION_SUCCESS:
        return { loading: false, success: true };
      case POST_CLASS_NOTIFICATION_FAIL:
        return { loading: false, error: action.payload };
      case POST_CLASS_NOTIFICATION_RESET:
        return {};
      default:
        return state;
    }
  };

