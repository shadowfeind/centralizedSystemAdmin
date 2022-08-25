import {
  DELETE_ROLE_FAIL,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_RESET,
  DELETE_ROLE_SUCCESS,
  GET_ALL_ROLE_FAIL,
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_RESET,
  GET_ALL_ROLE_SUCCESS,
  GET_SINGLE_ROLE_FAIL,
  GET_SINGLE_ROLE_REQUEST,
  GET_SINGLE_ROLE_RESET,
  GET_SINGLE_ROLE_SUCCESS,
  ROLE_CREATE_FAIL,
  ROLE_CREATE_REQUEST,
  ROLE_CREATE_RESET,
  ROLE_CREATE_SUCCESS,
  UPDATE_SINGLE_ROLE_FAIL,
  UPDATE_SINGLE_ROLE_REQUEST,
  UPDATE_SINGLE_ROLE_RESET,
  UPDATE_SINGLE_ROLE_SUCCESS,
} from "./RoleConstant";

export const getAllRoles = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ROLE_REQUEST:
      return { loading: true };
    case GET_ALL_ROLE_SUCCESS:
      return { loading: false, role: action.payload };
    case GET_ALL_ROLE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ROLE_RESET:
      return {};
    default:
      return state;
  }
};

export const createRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case ROLE_CREATE_REQUEST:
      return { loading: true };
    case ROLE_CREATE_SUCCESS:
      return { loading: false, role: action.payload, success: true };
    case ROLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ROLE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ROLE_REQUEST:
      return { loading: true };
    case GET_SINGLE_ROLE_SUCCESS:
      return { loading: false, singleRole: action.payload };
    case GET_SINGLE_ROLE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ROLE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ROLE_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_ROLE_SUCCESS:
      return { loading: false, updatedRole: action.payload, success: true };
    case UPDATE_SINGLE_ROLE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ROLE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROLE_REQUEST:
      return { loading: true };
    case DELETE_ROLE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_ROLE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_ROLE_RESET:
      return {};
    default:
      return state;
  }
};
