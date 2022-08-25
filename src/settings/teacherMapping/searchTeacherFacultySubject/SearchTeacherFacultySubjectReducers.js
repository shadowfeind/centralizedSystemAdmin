import {
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_FAIL,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_RESET,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_FAIL,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_REQUEST,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_RESET,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_SUCCESS,
  GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_FAIL,
  GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_REQUEST,
  GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_RESET,
  GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_SUCCESS,
  PUT_SEARCH_TEACHER_FAC_SUB_DATA_FAIL,
  PUT_SEARCH_TEACHER_FAC_SUB_DATA_REQUEST,
  PUT_SEARCH_TEACHER_FAC_SUB_DATA_RESET,
  PUT_SEARCH_TEACHER_FAC_SUB_DATA_SUCCESS,
} from "./SearchTeacherFacultySubjectConstants";

export const getAllSearchTeacherFacSubInitialDataReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS:
      return { loading: false, searchTeacherFacInitData: action.payload };
    case GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllSearchTeacherFacSubListDataReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_SUCCESS:
      return {
        loading: false,
        searchTeacherFacListData: action.payload,
        currentQuery: action.query,
      };
    case GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_FAIL:
      return { loading: false, error: action.payload };

    case GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditSearchTeacherFacSubListDataReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_REQUEST:
      return { loading: true };
    case GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_SUCCESS:
      return {
        loading: false,
        singleEditSearchTeacherFacListData: action.payload,
        currentQuery: action.query,
      };
    case GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_FAIL:
      return { loading: false, error: action.payload };

    case GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const putSearchTeacherFacSubtDataReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_SEARCH_TEACHER_FAC_SUB_DATA_REQUEST:
      return { loading: true };
    case PUT_SEARCH_TEACHER_FAC_SUB_DATA_SUCCESS:
      return { loading: false, updatedEmployee: action.payload, success: true };
    case PUT_SEARCH_TEACHER_FAC_SUB_DATA_FAIL:
      return { loading: false, error: action.payload };
    case PUT_SEARCH_TEACHER_FAC_SUB_DATA_RESET:
      return {};
    default:
      return state;
  }
};
