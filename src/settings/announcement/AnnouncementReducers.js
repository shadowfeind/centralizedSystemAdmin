import {
  GET_ALL_ANNOUNCEMENT_REQUEST,
  GET_ALL_ANNOUNCEMENT_SUCCESS,
  GET_ALL_ANNOUNCEMENT_FAIL,
  GET_ALL_ANNOUNCEMENT_RESET,
  ANNOUNCEMENT_CREATE_REQUEST,
  ANNOUNCEMENT_CREATE_SUCCESS,
  ANNOUNCEMENT_CREATE_FAIL,
  ANNOUNCEMENT_CREATE_RESET,
  GET_SINGLE_ANNOUNCEMENT_REQUEST,
  GET_SINGLE_ANNOUNCEMENT_SUCCESS,
  GET_SINGLE_ANNOUNCEMENT_FAIL,
  GET_SINGLE_ANNOUNCEMENT_RESET,
  UPDATE_SINGLE_ANNOUNCEMENT_REQUEST,
  UPDATE_SINGLE_ANNOUNCEMENT_SUCCESS,
  UPDATE_SINGLE_ANNOUNCEMENT_FAIL,
  UPDATE_SINGLE_ANNOUNCEMENT_RESET,
  ANNOUNCEMENT_FCM_REQUEST,
  ANNOUNCEMENT_FCM_SUCCESS,
  ANNOUNCEMENT_FCM_FAIL,
  ANNOUNCEMENT_FCM_RESET,
  GET_LIST_ANNOUNCEMENT_REQUEST,
  GET_LIST_ANNOUNCEMENT_SUCCESS,
  GET_LIST_ANNOUNCEMENT_FAIL,
  GET_LIST_ANNOUNCEMENT_RESET,
} from "./AnnouncementConstants";

export const getAllAnnouncement = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ANNOUNCEMENT_REQUEST:
      return { loading: true };
    case GET_ALL_ANNOUNCEMENT_SUCCESS:
      return { loading: false, announcement: action.payload };
    case GET_ALL_ANNOUNCEMENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ANNOUNCEMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getListAnnouncement = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_ANNOUNCEMENT_REQUEST:
      return { loading: true };
    case GET_LIST_ANNOUNCEMENT_SUCCESS:
      return { loading: false, announcementList: action.payload };
    case GET_LIST_ANNOUNCEMENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_ANNOUNCEMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getFCMForAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_FCM_REQUEST:
      return { loading: true };
    case ANNOUNCEMENT_FCM_SUCCESS:
      return { loading: false, announcementFCM: action.payload };
    case ANNOUNCEMENT_FCM_FAIL:
      return { loading: false, error: action.payload };
    case ANNOUNCEMENT_FCM_RESET:
      return {};
    default:
      return state;
  }
};

export const createAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_CREATE_REQUEST:
      return { loading: true };
    case ANNOUNCEMENT_CREATE_SUCCESS:
      return {
        loading: false,
        announcementCreate: action.payload,
        success: true,
      };
    case ANNOUNCEMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ANNOUNCEMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ANNOUNCEMENT_REQUEST:
      return { loading: true };
    case GET_SINGLE_ANNOUNCEMENT_SUCCESS:
      return { loading: false, singleAnnouncement: action.payload };
    case GET_SINGLE_ANNOUNCEMENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ANNOUNCEMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ANNOUNCEMENT_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_ANNOUNCEMENT_SUCCESS:
      return {
        loading: false,
        updateSingleAnnouncement: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_ANNOUNCEMENT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ANNOUNCEMENT_RESET:
      return {};
    default:
      return state;
  }
};
