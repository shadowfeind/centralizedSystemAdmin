import {
  GET_ALL_STUDENT_PROFILE_REQUEST,
  GET_ALL_STUDENT_PROFILE_SUCCESS,
  GET_ALL_STUDENT_PROFILE_FAIL,
  GET_ALL_STUDENT_PROFILE_RESET,
  GET_LIST_STUDENT_PROFILE_REQUEST,
  GET_LIST_STUDENT_PROFILE_SUCCESS,
  GET_LIST_STUDENT_PROFILE_FAIL,
  GET_LIST_STUDENT_PROFILE_RESET,
  SINGLE_STUDENT_PROFILE_DETAILS_REQUEST,
  SINGLE_STUDENT_PROFILE_DETAILS_SUCCESS,
  SINGLE_STUDENT_PROFILE_DETAILS_FAIL,
  SINGLE_STUDENT_PROFILE_DETAILS_RESET,
  GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_REQUEST,
  GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_SUCCESS,
  GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_FAIL,
  GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_RESET,
  RESET_SINGLE_STUDENT_PROFILE_PASSWORD_REQUEST,
  RESET_SINGLE_STUDENT_PROFILE_PASSWORD_SUCCESS,
  RESET_SINGLE_STUDENT_PROFILE_PASSWORD_FAIL,
  RESET_SINGLE_STUDENT_PROFILE_PASSWORD_RESET,
  GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_REQUEST,
  GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_SUCCESS,
  GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_FAIL,
  GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_RESET,
  UPDATE_SINGLE_STUDENT_PROFILE_REQUEST,
  UPDATE_SINGLE_STUDENT_PROFILE_SUCCESS,
  UPDATE_SINGLE_STUDENT_PROFILE_FAIL,
  UPDATE_SINGLE_STUDENT_PROFILE_RESET,
  GET_UPLOAD_PHOTO_REQUEST,
  GET_UPLOAD_PHOTO_SUCCESS,
  GET_UPLOAD_PHOTO_FAIL,
  GET_UPLOAD_PHOTO_RESET,
  POST_UPLOAD_PHOTO_REQUEST,
  POST_UPLOAD_PHOTO_SUCCESS,
  POST_UPLOAD_PHOTO_FAIL,
  POST_UPLOAD_PHOTO_RESET,
} from "./StudentProfileConstants";

export const getAllStudentProfile = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_STUDENT_PROFILE_REQUEST:
      return { loading: true };
    case GET_ALL_STUDENT_PROFILE_SUCCESS:
      return { loading: false, studentProfile: action.payload };
    case GET_ALL_STUDENT_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_STUDENT_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const getListStudentProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_STUDENT_PROFILE_REQUEST:
      return { loading: true };
    case GET_LIST_STUDENT_PROFILE_SUCCESS:
      return { loading: false, listStudentProfile: action.payload };
    case GET_LIST_STUDENT_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_STUDENT_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleStudentProfileDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_STUDENT_PROFILE_DETAILS_REQUEST:
      return { loading: true };
    case SINGLE_STUDENT_PROFILE_DETAILS_SUCCESS:
      return { loading: false, singleStudentProfileDetails: action.payload };
    case SINGLE_STUDENT_PROFILE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SINGLE_STUDENT_PROFILE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleStudentProfilePasswordresetDataReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_REQUEST:
      return { loading: true };
    case GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_SUCCESS:
      return {
        loading: false,
        singleStudentProfilePasswordresetDataDetails: action.payload,
      };
    case GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_STUDENT_PROFILE_PASSWORDRESET_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const resetSingleStudentProfilePasswordReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case RESET_SINGLE_STUDENT_PROFILE_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_SINGLE_STUDENT_PROFILE_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case RESET_SINGLE_STUDENT_PROFILE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case RESET_SINGLE_STUDENT_PROFILE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleStudentProfileEditDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_REQUEST:
      return { loading: true };
    case GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_SUCCESS:
      return {
        loading: false,
        editSingleStudentData: action.payload,
      };
    case GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_STUDENT_PROFILE_EDIT_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleStudentProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_STUDENT_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_STUDENT_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_SINGLE_STUDENT_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_STUDENT_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const getUploadPhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_UPLOAD_PHOTO_REQUEST:
      return { loading: true };
    case GET_UPLOAD_PHOTO_SUCCESS:
      return {
        loading: false,
        uploadPhoto: action.payload,
      };
    case GET_UPLOAD_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    case GET_UPLOAD_PHOTO_RESET:
      return {};
    default:
      return state;
  }
};


export const postUploadPhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UPLOAD_PHOTO_REQUEST:
      return { loading: true };
    case POST_UPLOAD_PHOTO_SUCCESS:
      return {
        loading: false,
        success: true,
        postUploadPhoto: action.payload,
      };
    case POST_UPLOAD_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    case POST_UPLOAD_PHOTO_RESET:
      return {};
    default:
      return state;
  }
};
