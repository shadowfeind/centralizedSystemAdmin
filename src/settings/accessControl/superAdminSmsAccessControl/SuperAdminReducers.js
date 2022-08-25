import { GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL, GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST, GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET, GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS, GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL, GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST, GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET, GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS, GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL, GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST, GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET, GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS, GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL, GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST, GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET, GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS, POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL, POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST, POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET, POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS, PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL, PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST, PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET, PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS } from "./SuperAdminConstant";

export const getAllSuperAdminSmsAccessControlReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST:
        return { loading: true };
      case GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS:
        return {
          loading: false,
          allSuperAdminSmsAccessControl: action.payload,
        };
      case GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL:
        return { loading: false, error: action.payload };
      case GET_ALL_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const getListSuperAdminSmsAccessControlReducer = (state = {}, action) => {
      switch (action.type) {
        case GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST:
          return { loading: true };
        case GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS:
          return {
            loading: false,
            listSuperAdminSmsAccessControl: action.payload,
          };
        case GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL:
          return { loading: false, error: action.payload };
        case GET_LIST_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET:
          return {};
        default:
          return state;
      }
    };
    
  
    export const getSingleToCreateSuperAdminSmsAccessControlReducer = (state = {}, action) => {
      switch (action.type) {
        case GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST:
          return { loading: true };
        case GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS:
          return {
            loading: false,
            singleCreateSuperAdminSmsAccessControl: action.payload,
          };
        case GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL:
          return { loading: false, error: action.payload };
        case GET_SINGLE_CREATE_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET:
          return {};
        default:
          return state;
      }
    };
  
  
    export const getSingleToEditSuperAdminSmsAccessControlReducer = (state = {}, action) => {
      switch (action.type) {
        case GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST:
          return { loading: true };
        case GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS:
          return {
            loading: false,
            singleEditSuperAdminSmsAccessControl: action.payload,
          };
        case GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL:
          return { loading: false, error: action.payload };
        case GET_SINGLE_EDIT_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET:
          return {};
        default:
          return state;
      }
    };
  
    export const postSuperAdminSmsAccessControlReducer = (state = {}, action) => {
      switch (action.type) {
        case POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST:
          return { loading: true };
        case POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS:
          return {
            loading: false,
            success: true,
          };
        case POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL:
          return { loading: false, error: action.payload };
        case POST_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET:
          return {};
        default:
          return state;
      }
    };
  
    export const putSuperAdminSmsAccessControlReducer = (state = {}, action) => {
      switch (action.type) {
        case PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_REQUEST:
          return { loading: true };
        case PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_SUCCESS:
          return {
            loading: false,
            success: true,
          };
        case PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_FAIL:
          return { loading: false, error: action.payload };
        case PUT_SUPER_ADMIN_SMS_ACCESS_CONTROL_RESET:
          return {};
        default:
          return state;
      }
    };