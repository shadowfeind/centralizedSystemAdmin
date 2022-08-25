import { API_URL, axiosInstance, tokenConfig } from "../../constants";

import {
  GET_ALL_EXAM_DIVISION_REQUEST,
  GET_ALL_EXAM_DIVISION_SUCCESS,
  GET_ALL_EXAM_DIVISION_FAIL,
  GET_SINGLE_EXAM_DIVISION_REQUEST,
  GET_SINGLE_EXAM_DIVISION_SUCCESS,
  GET_SINGLE_EXAM_DIVISION_FAIL,
  GET_SINGLE_EXAM_DIVISION_RESET,
  CREATE_EXAM_DIVISION_REQUEST,
  CREATE_EXAM_DIVISION_SUCCESS,
  CREATE_EXAM_DIVISION_FAIL,
  CREATE_EXAM_DIVISION_RESET,
  GET_SINGLE_EXAM_DIVISION_EDIT_REQUEST,
  GET_SINGLE_EXAM_DIVISION_EDIT_SUCCESS,
  GET_SINGLE_EXAM_DIVISION_EDIT_FAIL,
  GET_SINGLE_EXAM_DIVISION_EDIT_RESET,
  UPDATE_SINGLE_EXAM_DIVISION_REQUEST,
  UPDATE_SINGLE_EXAM_DIVISION_SUCCESS,
  UPDATE_SINGLE_EXAM_DIVISION_FAIL,
  UPDATE_SINGLE_EXAM_DIVISION_RESET,
} from "./ExamDivisionConstants";

export const getAllExamDivisionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EXAM_DIVISION_REQUEST });
    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicExamDivision/GetAllExamDivision`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_EXAM_DIVISION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EXAM_DIVISION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleExamDivisionAction = (program) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EXAM_DIVISION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicExamDivision/GetToCreateAcademicExamDivision?idFacultyProgramLink=${program}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_EXAM_DIVISION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EXAM_DIVISION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const createExamDivisionAction = (examDivision) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EXAM_DIVISION_REQUEST });

    const jsonData = JSON.stringify({ dbModel: examDivision });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axiosInstance.post(
      `${API_URL}/api/AcademicExamDivision/PostAcademicExamDivision`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: CREATE_EXAM_DIVISION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_EXAM_DIVISION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleExamDivisionEditAction =
  (id, program) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_EXAM_DIVISION_EDIT_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AcademicExamDivision/GetToEditSingleAcademicExamDivision/${id}?idFacultyProgramLink=${program}`,
        tokenConfig()
      );

      dispatch({ type: GET_SINGLE_EXAM_DIVISION_EDIT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_EXAM_DIVISION_EDIT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const updateSingleExamDivisionAction =
  (examDivision) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_EXAM_DIVISION_REQUEST });

      const jsonData = JSON.stringify({ dbModel: examDivision });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        ` ${API_URL}/api/AcademicExamDivision/PutAcademicExamDivision`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: UPDATE_SINGLE_EXAM_DIVISION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_EXAM_DIVISION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
