import {
  DELETE_LEAVE_REQUESTS_FAIL,
  DELETE_LEAVE_REQUESTS_REQUEST,
  DELETE_LEAVE_REQUESTS_RESET,
  DELETE_LEAVE_REQUESTS_SUCCESS,
  DOWNLOAD_DOC_LEAVE_REQUESTS_FAIL,
  DOWNLOAD_DOC_LEAVE_REQUESTS_REQUEST,
  DOWNLOAD_DOC_LEAVE_REQUESTS_RESET,
  DOWNLOAD_DOC_LEAVE_REQUESTS_SUCCESS,
  GET_ALL_LEAVE_REQUESTS_FAIL,
  GET_ALL_LEAVE_REQUESTS_REQUEST,
  GET_ALL_LEAVE_REQUESTS_RESET,
  GET_ALL_LEAVE_REQUESTS_SUCCESS,
  GET_DASHBOARD_TOP_CONTENT_FAIL,
  GET_DASHBOARD_TOP_CONTENT_REQUEST,
  GET_DASHBOARD_TOP_CONTENT_RESET,
  GET_DASHBOARD_TOP_CONTENT_SUCCESS,
  GET_HEADER_BANNER_FAIL,
  GET_HEADER_BANNER_REQUEST,
  GET_HEADER_BANNER_RESET,
  GET_HEADER_BANNER_SUCCESS,
  GET_HEADER_CONTENT_FAIL,
  GET_HEADER_CONTENT_REQUEST,
  GET_HEADER_CONTENT_RESET,
  GET_HEADER_CONTENT_SUCCESS,
  GET_LIST_LEAVE_REQUESTS_FAIL,
  GET_LIST_LEAVE_REQUESTS_REQUEST,
  GET_LIST_LEAVE_REQUESTS_RESET,
  GET_LIST_LEAVE_REQUESTS_SUCCESS,
  GET_PRINCIPLE_SIGNATURE_FAIL,
  GET_PRINCIPLE_SIGNATURE_REQUEST,
  GET_PRINCIPLE_SIGNATURE_RESET,
  GET_PRINCIPLE_SIGNATURE_SUCCESS,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_FAIL,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_REQUEST,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_SUCCESS,
  GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_FAIL,
  GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_REQUEST,
  GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_SUCCESS,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_FAIL,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_REQUEST,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_SUCCESS,
  GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_FAIL,
  GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_REQUEST,
  GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_SUCCESS,
  POST_FILE_UPLOAD_LEAVE_REQUESTS_FAIL,
  POST_FILE_UPLOAD_LEAVE_REQUESTS_REQUEST,
  POST_FILE_UPLOAD_LEAVE_REQUESTS_RESET,
  POST_FILE_UPLOAD_LEAVE_REQUESTS_SUCCESS,
  POST_LEAVE_REQUESTS_FAIL,
  POST_LEAVE_REQUESTS_REQUEST,
  POST_LEAVE_REQUESTS_RESET,
  POST_LEAVE_REQUESTS_SUCCESS,
  PUT_LEAVE_REQUESTS_FAIL,
  PUT_LEAVE_REQUESTS_REQUEST,
  PUT_LEAVE_REQUESTS_RESET,
  PUT_LEAVE_REQUESTS_SUCCESS,
} from "./DashboardConstants";

export const getHeaderContentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_HEADER_CONTENT_REQUEST:
      return { loading: true };
    case GET_HEADER_CONTENT_SUCCESS:
      return { loading: false, headerContent: action.payload };
    case GET_HEADER_CONTENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_HEADER_CONTENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getHeaderBannerReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_HEADER_BANNER_REQUEST:
      return { loading: true };
    case GET_HEADER_BANNER_SUCCESS:
      return { loading: false, headerBanners: action.payload };
    case GET_HEADER_BANNER_FAIL:
      return { loading: false, error: action.payload };
    case GET_HEADER_BANNER_RESET:
      return {};
    default:
      return state;
  }
};

export const getDashboardTopContentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DASHBOARD_TOP_CONTENT_REQUEST:
      return { loading: true };
    case GET_DASHBOARD_TOP_CONTENT_SUCCESS:
      return { loading: false, dashboardTopContent: action.payload };
    case GET_DASHBOARD_TOP_CONTENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_DASHBOARD_TOP_CONTENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getPrincipleSignatureReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRINCIPLE_SIGNATURE_REQUEST:
      return { loading: true };
    case GET_PRINCIPLE_SIGNATURE_SUCCESS:
      return { loading: false, principleSignature: action.payload };
    case GET_PRINCIPLE_SIGNATURE_FAIL:
      return { loading: false, error: action.payload };
    case GET_PRINCIPLE_SIGNATURE_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case GET_ALL_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, allLeaveRequest: action.payload };
    case GET_ALL_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const getListLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case GET_LIST_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, listLeaveRequest: action.payload };
    case GET_LIST_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleCreateLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, singleCreateLeaveRequest: action.payload };
    case GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, singleEditLeaveRequest: action.payload };
    case GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const postLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case POST_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, success: true };
    case POST_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case POST_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const putLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case PUT_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, success: true };
    case PUT_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case PUT_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleDeleteLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, singleDeleteLeaveRequest: action.payload };
    case GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case DELETE_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, success: true };
    case DELETE_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const downloadLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_DOC_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case DOWNLOAD_DOC_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, success: true };
    case DOWNLOAD_DOC_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case DOWNLOAD_DOC_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditSentLeaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_SUCCESS:
      return { loading: false, singleEditSentLeaveRequest: action.payload };
    case GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_RESET:
      return {};
    default:
      return state;
  }
};
