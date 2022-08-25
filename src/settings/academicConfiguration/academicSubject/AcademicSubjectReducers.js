import { StarRateOutlined } from "@material-ui/icons";
import {
  GET_All_ACADEMIC_SUBJECT_REQUEST,
  GET_ALL_ACADEMIC_SUBJECT_SUCCES,
  GET_ALL_ACADEMIC_SUBJECT_FAIL,
  GET_SINGLE_ACADEMIC_SUBJECT_REQUEST,
  GET_SINGLE_ACADEMIC_SUBJECT_SUCCESS,
  GET_SINGLE_ACADEMIC_SUBJECT_FAIL,
  GET_SINGLE_ACADEMIC_SUBJECT_RESET,
  ACADEMIC_SUBJECT_CREATE_REQUEST,
  ACADEMIC_SUBJECT_CREATE_SUCCESS,
  ACADEMIC_SUBJECT_CREATE_FAIL,
  ACADEMIC_SUBJECT_CREATE_RESET,
  UPDATE_SINGLE_ACADEMIC_SUBJECT_REQUEST,
  UPDATE_SINGLE_ACADEMIC_SUBJECT_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_SUBJECT_FAIL,
  UPDATE_SINGLE_ACADEMIC_SUBJECT_RESET,
  GET_ALL_ACADEMIC_SUBJECT_RESET,
} from "./AcademicSubjectConstants";

export const getAllAcademicSubject = (state = {}, action) => {
  switch (action.type) {
    case GET_All_ACADEMIC_SUBJECT_REQUEST:
      return { loading: true };
    case GET_ALL_ACADEMIC_SUBJECT_SUCCES:
      return { loading: false, academicSubject: action.payload };
    case GET_ALL_ACADEMIC_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ACADEMIC_SUBJECT_RESET:
      return {};

    default:
      return state;
  }
};

export const getSingleAcademicSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ACADEMIC_SUBJECT_REQUEST:
      return { loading: true };
    case GET_SINGLE_ACADEMIC_SUBJECT_SUCCESS:
      return { loading: false, academicSubject: action.payload };
    case GET_SINGLE_ACADEMIC_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ACADEMIC_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

export const createAcademicSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case ACADEMIC_SUBJECT_CREATE_REQUEST:
      return { loading: true };
    case ACADEMIC_SUBJECT_CREATE_SUCCESS:
      return { loading: false, academicSubject: action.payload, success: true };
    case ACADEMIC_SUBJECT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACADEMIC_SUBJECT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleAcademicSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ACADEMIC_SUBJECT_REQUEST:
      return { loading: false };
    case UPDATE_SINGLE_ACADEMIC_SUBJECT_SUCCESS:
      return {
        loading: false,
        updateAcademicSubject: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_ACADEMIC_SUBJECT_FAIL:
      return { loading: false };
    case UPDATE_SINGLE_ACADEMIC_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};
