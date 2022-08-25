import {
  GET_INITIAL_ROLE_FOR_PERMISSION_FAIL,
  GET_INITIAL_ROLE_FOR_PERMISSION_REQUEST,
  GET_INITIAL_ROLE_FOR_PERMISSION_RESET,
  GET_INITIAL_ROLE_FOR_PERMISSION_SUCCESS,
  GET_LIST_PERMISSION_BY_ROLE_FAIL,
  GET_LIST_PERMISSION_BY_ROLE_REQUEST,
  GET_LIST_PERMISSION_BY_ROLE_RESET,
  GET_LIST_PERMISSION_BY_ROLE_SUCCESS,
} from "./PermissionByRoleConstants";

export const getInitialRoleForPermissionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INITIAL_ROLE_FOR_PERMISSION_REQUEST:
      return { loading: true };
    case GET_INITIAL_ROLE_FOR_PERMISSION_SUCCESS:
      return { loading: false, initialRoleForPermission: action.payload };
    case GET_INITIAL_ROLE_FOR_PERMISSION_FAIL:
      return { loading: false, error: action.payload };
    case GET_INITIAL_ROLE_FOR_PERMISSION_RESET:
      return {};
    default:
      return state;
  }
};

export const getlistPermissionByRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_PERMISSION_BY_ROLE_REQUEST:
      return { loading: true };
    case GET_LIST_PERMISSION_BY_ROLE_SUCCESS:
      return { loading: false, listPermissionByRole: action.payload };
    case GET_LIST_PERMISSION_BY_ROLE_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_PERMISSION_BY_ROLE_RESET:
      return {};
    default:
      return state;
  }
};
