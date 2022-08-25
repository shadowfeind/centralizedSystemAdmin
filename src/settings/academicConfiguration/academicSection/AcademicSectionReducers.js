import {
  ACADEMIC_SECTION_CREATE_FAIL,
  ACADEMIC_SECTION_CREATE_REQUEST,
  ACADEMIC_SECTION_CREATE_RESET,
  ACADEMIC_SECTION_CREATE_SUCCESS,
  GET_ALL_ACADEMIC_SECTION_FAIL,
  GET_ALL_ACADEMIC_SECTION_REQUEST,
  GET_ALL_ACADEMIC_SECTION_RESET,
  GET_ALL_ACADEMIC_SECTION_SUCCESS,
  GET_SINGLE_ACADEMIC_SECTION_FAIL,
  GET_SINGLE_ACADEMIC_SECTION_REQUEST,
  GET_SINGLE_ACADEMIC_SECTION_RESET,
  GET_SINGLE_ACADEMIC_SECTION_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_SECTION_FAIL,
  UPDATE_SINGLE_ACADEMIC_SECTION_REQUEST,
  UPDATE_SINGLE_ACADEMIC_SECTION_RESET,
  UPDATE_SINGLE_ACADEMIC_SECTION_SUCCESS,
} from "./AcademicSectionConstants";

export const getAllAcademicSection = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACADEMIC_SECTION_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_SECTION_SUCCESS:
      return { loading: false, academicSection: action.payload };
    case GET_ALL_ACADEMIC_SECTION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ACADEMIC_SECTION_RESET:
      return {};
    default:
      return state;
  }
};

export const createAcademicSectionReducer = (state = {}, action) => {
  switch (action.type) {
    case ACADEMIC_SECTION_CREATE_REQUEST:
      return { loading: true };
    case ACADEMIC_SECTION_CREATE_SUCCESS:
      return { loading: false, academicSection: action.payload, success: true };
    case ACADEMIC_SECTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACADEMIC_SECTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleAcademicSectionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ACADEMIC_SECTION_REQUEST:
      return { loading: true };
    case GET_SINGLE_ACADEMIC_SECTION_SUCCESS:
      return { loading: false, singleAcademicSection: action.payload };
    case GET_SINGLE_ACADEMIC_SECTION_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ACADEMIC_SECTION_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleAcademicSectionReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ACADEMIC_SECTION_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_ACADEMIC_SECTION_SUCCESS:
      return {
        loading: false,
        updatedAcademicSection: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_ACADEMIC_SECTION_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ACADEMIC_SECTION_RESET:
      return {};
    default:
      return state;
  }
};
