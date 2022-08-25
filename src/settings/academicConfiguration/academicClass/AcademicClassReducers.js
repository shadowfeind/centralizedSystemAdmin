import {
  ACADEMIC_CLASS_CREATE_FAIL,
  ACADEMIC_CLASS_CREATE_REQUEST,
  ACADEMIC_CLASS_CREATE_RESET,
  ACADEMIC_CLASS_CREATE_SUCCESS,
  GET_ALL_ACADEMIC_CLASS_FAIL,
  GET_ALL_ACADEMIC_CLASS_REQUEST,
  GET_ALL_ACADEMIC_CLASS_RESET,
  GET_ALL_ACADEMIC_CLASS_SUCCESS,
  GET_SINGLE_ACADEMIC_CLASS_FAIL,
  GET_SINGLE_ACADEMIC_CLASS_REQUEST,
  GET_SINGLE_ACADEMIC_CLASS_RESET,
  GET_SINGLE_ACADEMIC_CLASS_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_CLASS_FAIL,
  UPDATE_SINGLE_ACADEMIC_CLASS_REQUEST,
  UPDATE_SINGLE_ACADEMIC_CLASS_RESET,
  UPDATE_SINGLE_ACADEMIC_CLASS_SUCCESS,
} from "./AcademicClassConstants";

export const getAllAcademicClass = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACADEMIC_CLASS_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_CLASS_SUCCESS:
      return { loading: false, academicClass: action.payload };
    case GET_ALL_ACADEMIC_CLASS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ACADEMIC_CLASS_RESET:
      return {};
    default:
      return state;
  }
};

export const createAcademicClassReducer = (state = {}, action) => {
  switch (action.type) {
    case ACADEMIC_CLASS_CREATE_REQUEST:
      return { loading: true };
    case ACADEMIC_CLASS_CREATE_SUCCESS:
      return { loading: false, academicClass: action.payload, success: true };
    case ACADEMIC_CLASS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACADEMIC_CLASS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleAcademicClassReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ACADEMIC_CLASS_REQUEST:
      return { loading: true };
    case GET_SINGLE_ACADEMIC_CLASS_SUCCESS:
      return { loading: false, singleAcademicClass: action.payload };
    case GET_SINGLE_ACADEMIC_CLASS_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ACADEMIC_CLASS_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleAcademicClassReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ACADEMIC_CLASS_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_ACADEMIC_CLASS_SUCCESS:
      return {
        loading: false,
        updatedacademicClass: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_ACADEMIC_CLASS_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ACADEMIC_CLASS_RESET:
      return {};
    default:
      return state;
  }
};
