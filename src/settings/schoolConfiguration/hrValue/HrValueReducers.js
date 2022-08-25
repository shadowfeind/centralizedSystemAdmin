import {
  GET_ALL_HR_VALUE_FAIL,
  GET_ALL_HR_VALUE_REQUEST,
  GET_ALL_HR_VALUE_RESET,
  GET_ALL_HR_VALUE_SUCCESS,
  GET_LIST_HR_VALUE_FAIL,
  GET_LIST_HR_VALUE_REQUEST,
  GET_LIST_HR_VALUE_RESET,
  GET_LIST_HR_VALUE_SUCCESS,
  GET_SINGLE_TO_CREATE_HR_VALUE_FAIL,
  GET_SINGLE_TO_CREATE_HR_VALUE_REQUEST,
  GET_SINGLE_TO_CREATE_HR_VALUE_RESET,
  GET_SINGLE_TO_CREATE_HR_VALUE_SUCCESS,
  GET_SINGLE_TO_EDIT_HR_VALUE_FAIL,
  GET_SINGLE_TO_EDIT_HR_VALUE_REQUEST,
  GET_SINGLE_TO_EDIT_HR_VALUE_RESET,
  GET_SINGLE_TO_EDIT_HR_VALUE_SUCCESS,
  POST_FILE_UPLOAD_HEADER_BANNER_FAIL,
  POST_FILE_UPLOAD_HEADER_BANNER_REQUEST,
  POST_FILE_UPLOAD_HEADER_BANNER_RESET,
  POST_FILE_UPLOAD_HEADER_BANNER_SUCCESS,
  POST_FILE_UPLOAD_PRINCIPLE_SIGNATURE_FAIL,
  POST_FILE_UPLOAD_PRINCIPLE_SIGNATURE_REQUEST,
  POST_FILE_UPLOAD_PRINCIPLE_SIGNATURE_RESET,
  POST_FILE_UPLOAD_PRINCIPLE_SIGNATURE_SUCCESS,
  POST_FILE_UPLOAD_SCHOOL_LOGO_FAIL,
  POST_FILE_UPLOAD_SCHOOL_LOGO_REQUEST,
  POST_FILE_UPLOAD_SCHOOL_LOGO_RESET,
  POST_FILE_UPLOAD_SCHOOL_LOGO_SUCCESS,
  POST_HR_VALUE_FAIL,
  POST_HR_VALUE_REQUEST,
  POST_HR_VALUE_RESET,
  POST_HR_VALUE_SUCCESS,
  PUT_HR_VALUE_FAIL,
  PUT_HR_VALUE_REQUEST,
  PUT_HR_VALUE_RESET,
  PUT_HR_VALUE_SUCCESS,
} from "./HrValueConstants";

export const getAllHrValueReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_HR_VALUE_REQUEST:
      return { loading: true };
    case GET_ALL_HR_VALUE_SUCCESS:
      return { loading: false, allHrValue: action.payload };
    case GET_ALL_HR_VALUE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_HR_VALUE_RESET:
      return {};
    default:
      return state;
  }
};

export const getListHrValueReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_HR_VALUE_REQUEST:
      return { loading: true };
    case GET_LIST_HR_VALUE_SUCCESS:
      return { loading: false, listHrValue: action.payload };
    case GET_LIST_HR_VALUE_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_HR_VALUE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleToCreateHrValueReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_CREATE_HR_VALUE_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_CREATE_HR_VALUE_SUCCESS:
      return { loading: false, singleCreateHrValue: action.payload };
    case GET_SINGLE_TO_CREATE_HR_VALUE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_CREATE_HR_VALUE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleToEditHrValueReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_EDIT_HR_VALUE_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_EDIT_HR_VALUE_SUCCESS:
      return { loading: false, singleEditHrValue: action.payload };
    case GET_SINGLE_TO_EDIT_HR_VALUE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_EDIT_HR_VALUE_RESET:
      return {};
    default:
      return state;
  }
};


export const postHrValueReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_HR_VALUE_REQUEST:
        return { loading: true };
      case POST_HR_VALUE_SUCCESS:
        return { loading: false, success: true };
      case POST_HR_VALUE_FAIL:
        return { loading: false, error: action.payload };
      case POST_HR_VALUE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const putHrValueReducer = (state = {}, action) => {
    switch (action.type) {
      case PUT_HR_VALUE_REQUEST:
        return { loading: true };
      case PUT_HR_VALUE_SUCCESS:
        return { loading: false, success: true };
      case PUT_HR_VALUE_FAIL:
        return { loading: false, error: action.payload };
      case PUT_HR_VALUE_RESET:
        return {};
      default:
        return state;
    }
  };


  export const postFileUploadHeaderBannerReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_FILE_UPLOAD_HEADER_BANNER_REQUEST:
        return { loading: true };
      case POST_FILE_UPLOAD_HEADER_BANNER_SUCCESS:
        return { loading: false, success: true };
      case POST_FILE_UPLOAD_HEADER_BANNER_FAIL:
        return { loading: false, error: action.payload };
      case POST_FILE_UPLOAD_HEADER_BANNER_RESET:
        return {};
      default:
        return state;
    }
  };

  export const postFileUploadSchoolLogoReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_FILE_UPLOAD_SCHOOL_LOGO_REQUEST:
        return { loading: true };
      case POST_FILE_UPLOAD_SCHOOL_LOGO_SUCCESS:
        return { loading: false, success: true };
      case POST_FILE_UPLOAD_SCHOOL_LOGO_FAIL:
        return { loading: false, error: action.payload };
      case POST_FILE_UPLOAD_SCHOOL_LOGO_RESET:
        return {};
      default:
        return state;
    }
  };

  export const postFileUploadPrincipleSignatureReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_FILE_UPLOAD_PRINCIPLE_SIGNATURE_REQUEST:
        return { loading: true };
      case POST_FILE_UPLOAD_PRINCIPLE_SIGNATURE_SUCCESS:
        return { loading: false, success: true };
      case POST_FILE_UPLOAD_PRINCIPLE_SIGNATURE_FAIL:
        return { loading: false, error: action.payload };
      case POST_FILE_UPLOAD_PRINCIPLE_SIGNATURE_RESET:
        return {};
      default:
        return state;
    }
  };
