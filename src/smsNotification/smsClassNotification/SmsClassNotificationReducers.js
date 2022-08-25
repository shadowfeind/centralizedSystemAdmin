import {
  GET_ALL_SMS_CLASS_NOTIFICATION_FAIL,
  GET_ALL_SMS_CLASS_NOTIFICATION_REQUEST,
  GET_ALL_SMS_CLASS_NOTIFICATION_RESET,
  GET_ALL_SMS_CLASS_NOTIFICATION_SUCCESS,
  GET_BULK_SMS_CLASS_NOTIFICATION_FAIL,
  GET_BULK_SMS_CLASS_NOTIFICATION_REQUEST,
  GET_BULK_SMS_CLASS_NOTIFICATION_RESET,
  GET_BULK_SMS_CLASS_NOTIFICATION_SUCCESS,
  GET_LIST_SMS_CLASS_NOTIFICATION_FAIL,
  GET_LIST_SMS_CLASS_NOTIFICATION_REQUEST,
  GET_LIST_SMS_CLASS_NOTIFICATION_RESET,
  GET_LIST_SMS_CLASS_NOTIFICATION_SUCCESS,
  POST_SMS_CLASS_NOTIFICATION_FAIL,
  POST_SMS_CLASS_NOTIFICATION_REQUEST,
  POST_SMS_CLASS_NOTIFICATION_RESET,
  POST_SMS_CLASS_NOTIFICATION_SUCCESS,
} from "./SmsClassNotificationConstants";

export const getAllSmsClassNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SMS_CLASS_NOTIFICATION_REQUEST:
      return { loading: true };
    case GET_ALL_SMS_CLASS_NOTIFICATION_SUCCESS:
      return { loading: false, smsClassNotification: action.payload };
    case GET_ALL_SMS_CLASS_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_SMS_CLASS_NOTIFICATION_RESET:
      return {};
    default:
      return state;
  }
};

export const getListSmsClassNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_SMS_CLASS_NOTIFICATION_REQUEST:
      return { loading: true };
    case GET_LIST_SMS_CLASS_NOTIFICATION_SUCCESS:
      return { loading: false, listSmsClassNotification: action.payload };
    case GET_LIST_SMS_CLASS_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_SMS_CLASS_NOTIFICATION_RESET:
      return {};
    default:
      return state;
  }
};

export const getBulkSmsClassNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BULK_SMS_CLASS_NOTIFICATION_REQUEST:
      return { loading: true };
    case GET_BULK_SMS_CLASS_NOTIFICATION_SUCCESS:
      return { loading: false, bulkSmsClassNotification: action.payload };
    case GET_BULK_SMS_CLASS_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_BULK_SMS_CLASS_NOTIFICATION_RESET:
      return {};
    default:
      return state;
  }
};

export const postSmsClassNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_SMS_CLASS_NOTIFICATION_REQUEST:
      return { loading: true };
    case POST_SMS_CLASS_NOTIFICATION_SUCCESS:
      return { loading: false, success: true };
    case POST_SMS_CLASS_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    case POST_SMS_CLASS_NOTIFICATION_RESET:
      return {};
    default:
      return state;
  }
};
