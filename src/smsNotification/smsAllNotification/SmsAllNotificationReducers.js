import {
  GET_ALL_SMS_ANNOUNCEMENT_FAIL,
  GET_ALL_SMS_ANNOUNCEMENT_REQUEST,
  GET_ALL_SMS_ANNOUNCEMENT_RESET,
  GET_ALL_SMS_ANNOUNCEMENT_SUCCESS,
  GET_LIST_SMS_ANNOUNCEMENT_FAIL,
  GET_LIST_SMS_ANNOUNCEMENT_REQUEST,
  GET_LIST_SMS_ANNOUNCEMENT_RESET,
  GET_LIST_SMS_ANNOUNCEMENT_SUCCESS,
  GET_SINGLE_SMS_ANNOUNCEMENT_FAIL,
  GET_SINGLE_SMS_ANNOUNCEMENT_REQUEST,
  GET_SINGLE_SMS_ANNOUNCEMENT_RESET,
  GET_SINGLE_SMS_ANNOUNCEMENT_SUCCESS,
  SMS_ANNOUNCEMENT_CREATE_FAIL,
  SMS_ANNOUNCEMENT_CREATE_REQUEST,
  SMS_ANNOUNCEMENT_CREATE_RESET,
  SMS_ANNOUNCEMENT_CREATE_SUCCESS,
  SMS_ANNOUNCEMENT_FCM_FAIL,
  SMS_ANNOUNCEMENT_FCM_REQUEST,
  SMS_ANNOUNCEMENT_FCM_RESET,
  SMS_ANNOUNCEMENT_FCM_SUCCESS,
  UPDATE_SINGLE_SMS_ANNOUNCEMENT_FAIL,
  UPDATE_SINGLE_SMS_ANNOUNCEMENT_REQUEST,
  UPDATE_SINGLE_SMS_ANNOUNCEMENT_RESET,
  UPDATE_SINGLE_SMS_ANNOUNCEMENT_SUCCESS,
} from "./SmsAllNotificationConstants";

export const getAllSmsAnnouncement = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SMS_ANNOUNCEMENT_REQUEST:
      return { loading: true };
    case GET_ALL_SMS_ANNOUNCEMENT_SUCCESS:
      return { loading: false, smsAnnouncement: action.payload };
    case GET_ALL_SMS_ANNOUNCEMENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_SMS_ANNOUNCEMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getListSmsAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_SMS_ANNOUNCEMENT_REQUEST:
      return { loading: true };
    case GET_LIST_SMS_ANNOUNCEMENT_SUCCESS:
      return { loading: false, smsAnnouncementList: action.payload };
    case GET_LIST_SMS_ANNOUNCEMENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_SMS_ANNOUNCEMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getFCMForSmsAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case SMS_ANNOUNCEMENT_FCM_REQUEST:
      return { loading: true };
    case SMS_ANNOUNCEMENT_FCM_SUCCESS:
      return { loading: false, smsAnnouncementFCM: action.payload };
    case SMS_ANNOUNCEMENT_FCM_FAIL:
      return { loading: false, error: action.payload };
    case SMS_ANNOUNCEMENT_FCM_RESET:
      return {};
    default:
      return state;
  }
};

export const createSmsAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case SMS_ANNOUNCEMENT_CREATE_REQUEST:
      return { loading: true };
    case SMS_ANNOUNCEMENT_CREATE_SUCCESS:
      return {
        loading: false,
        smsAnnouncementCreate: action.payload,
        success: true,
      };
    case SMS_ANNOUNCEMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SMS_ANNOUNCEMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleSmsAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_SMS_ANNOUNCEMENT_REQUEST:
      return { loading: true };
    case GET_SINGLE_SMS_ANNOUNCEMENT_SUCCESS:
      return { loading: false, singleSmsAnnouncement: action.payload };
    case GET_SINGLE_SMS_ANNOUNCEMENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_SMS_ANNOUNCEMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleSmsAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_SMS_ANNOUNCEMENT_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_SMS_ANNOUNCEMENT_SUCCESS:
      return {
        loading: false,
        updateSingleSmsAnnouncement: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_SMS_ANNOUNCEMENT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_SMS_ANNOUNCEMENT_RESET:
      return {};
    default:
      return state;
  }
};
