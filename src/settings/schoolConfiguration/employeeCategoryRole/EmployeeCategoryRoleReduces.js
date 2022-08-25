import {
  DELETE_EMPLOYEE_CATEGORY_ROLE_FAIL,
  DELETE_EMPLOYEE_CATEGORY_ROLE_REQUEST,
  DELETE_EMPLOYEE_CATEGORY_ROLE_RESET,
  DELETE_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
  EMPLOYEE_CATEGORY_ROLE_CREATE_FAIL,
  EMPLOYEE_CATEGORY_ROLE_CREATE_REQUEST,
  EMPLOYEE_CATEGORY_ROLE_CREATE_RESET,
  EMPLOYEE_CATEGORY_ROLE_CREATE_SUCCESS,
  GET_ALL_EMPLOYEE_CATEGORY_ROLE_FAIL,
  GET_ALL_EMPLOYEE_CATEGORY_ROLE_REQUEST,
  GET_ALL_EMPLOYEE_CATEGORY_ROLE_RESET,
  GET_ALL_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
  GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_FAIL,
  GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_REQUEST,
  GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET,
  GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
  UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_FAIL,
  UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_REQUEST,
  UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET,
  UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_SUCCESS,
} from "./EmployeeCategoryRoleConstant";

export const getAllEmployeeCategoryRole = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEE_CATEGORY_ROLE_REQUEST:
      return { loading: true };
    case GET_ALL_EMPLOYEE_CATEGORY_ROLE_SUCCESS:
      return { loading: false, employeeCategoryRole: action.payload };
    case GET_ALL_EMPLOYEE_CATEGORY_ROLE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_EMPLOYEE_CATEGORY_ROLE_RESET:
      return {};
    default:
      return state;
  }
};

export const createEmployeeCategoryRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_CATEGORY_ROLE_CREATE_REQUEST:
      return { loading: true };
    case EMPLOYEE_CATEGORY_ROLE_CREATE_SUCCESS:
      return {
        loading: false,
        employeeCategoryRole: action.payload,
        success: true,
      };
    case EMPLOYEE_CATEGORY_ROLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_CATEGORY_ROLE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEmployeeCategoryRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_REQUEST:
      return { loading: true };
    case GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_SUCCESS:
      return { loading: false, singleEmployeeCategoryRole: action.payload };
    case GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleEmployeeCategoryRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_SUCCESS:
      return {
        loading: false,
        updateSingleCategoryRole: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_EMPLOYEE_CATEGORY_ROLE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteEmployeeCategoryRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_CATEGORY_ROLE_REQUEST:
      return { loading: true };
    case DELETE_EMPLOYEE_CATEGORY_ROLE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_EMPLOYEE_CATEGORY_ROLE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_EMPLOYEE_CATEGORY_ROLE_RESET:
      return {};
    default:
      return state;
  }
};

