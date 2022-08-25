import {
  ACADEMIC_PROGRAM_CREATE_FAIL,
  ACADEMIC_PROGRAM_CREATE_REQUEST,
  ACADEMIC_PROGRAM_CREATE_RESET,
  ACADEMIC_PROGRAM_CREATE_SUCCESS,
  GET_ACADEMIC_PROGRAM_OPTION_FAIL,
  GET_ACADEMIC_PROGRAM_OPTION_REQUEST,
  GET_ACADEMIC_PROGRAM_OPTION_RESET,
  GET_ACADEMIC_PROGRAM_OPTION_SUCCESS,
  GET_ALL_ACADEMIC_PROGRAM_FAIL,
  GET_ALL_ACADEMIC_PROGRAM_REQUEST,
  GET_ALL_ACADEMIC_PROGRAM_RESET,
  GET_ALL_ACADEMIC_PROGRAM_SUCCESS,
  GET_SINGLE_ACADEMIC_PROGRAM_FAIL,
  GET_SINGLE_ACADEMIC_PROGRAM_REQUEST,
  GET_SINGLE_ACADEMIC_PROGRAM_RESET,
  GET_SINGLE_ACADEMIC_PROGRAM_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_PROGRAM_FAIL,
  UPDATE_SINGLE_ACADEMIC_PROGRAM_REQUEST,
  UPDATE_SINGLE_ACADEMIC_PROGRAM_RESET,
  UPDATE_SINGLE_ACADEMIC_PROGRAM_SUCCESS,
} from "./AcademicProgramConstants";

export const getAllAcademicProgram = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACADEMIC_PROGRAM_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_PROGRAM_SUCCESS:
      return { loading: false, academicProgram: action.payload };
    case GET_ALL_ACADEMIC_PROGRAM_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ACADEMIC_PROGRAM_RESET:
      return {};
    default:
      return state;
  }
};

export const createAcademicProgramReducer = (state = {}, action) => {
  switch (action.type) {
    case ACADEMIC_PROGRAM_CREATE_REQUEST:
      return { loading: true };
    case ACADEMIC_PROGRAM_CREATE_SUCCESS:
      return { loading: false, academicProgram: action.payload, success: true };
    case ACADEMIC_PROGRAM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACADEMIC_PROGRAM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getAcademicProgramOptionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACADEMIC_PROGRAM_OPTION_REQUEST:
      return { loading: true };
    case GET_ACADEMIC_PROGRAM_OPTION_SUCCESS:
      return { loading: false, academicProgramOption: action.payload };
    case GET_ACADEMIC_PROGRAM_OPTION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACADEMIC_PROGRAM_OPTION_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleAcademicProgramReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ACADEMIC_PROGRAM_REQUEST:
      return { loading: true };
    case GET_SINGLE_ACADEMIC_PROGRAM_SUCCESS:
      return { loading: false, singleAcademicProgram: action.payload };
    case GET_SINGLE_ACADEMIC_PROGRAM_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ACADEMIC_PROGRAM_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleAcademicProgramReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ACADEMIC_PROGRAM_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_ACADEMIC_PROGRAM_SUCCESS:
      return {
        loading: false,
        updatedAcademicProgram: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_ACADEMIC_PROGRAM_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ACADEMIC_PROGRAM_RESET:
      return {};
    default:
      return state;
  }
};
