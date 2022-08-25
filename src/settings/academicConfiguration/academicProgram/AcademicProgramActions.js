import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  ACADEMIC_PROGRAM_CREATE_FAIL,
  ACADEMIC_PROGRAM_CREATE_REQUEST,
  ACADEMIC_PROGRAM_CREATE_SUCCESS,
  GET_ACADEMIC_PROGRAM_OPTION_FAIL,
  GET_ACADEMIC_PROGRAM_OPTION_REQUEST,
  GET_ACADEMIC_PROGRAM_OPTION_SUCCESS,
  GET_ALL_ACADEMIC_PROGRAM_FAIL,
  GET_ALL_ACADEMIC_PROGRAM_REQUEST,
  GET_ALL_ACADEMIC_PROGRAM_SUCCESS,
  GET_SINGLE_ACADEMIC_PROGRAM_FAIL,
  GET_SINGLE_ACADEMIC_PROGRAM_REQUEST,
  GET_SINGLE_ACADEMIC_PROGRAM_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_PROGRAM_FAIL,
  UPDATE_SINGLE_ACADEMIC_PROGRAM_REQUEST,
  UPDATE_SINGLE_ACADEMIC_PROGRAM_SUCCESS,
} from "./AcademicProgramConstants";

export const getAllAcademicProgramAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_PROGRAM_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicProgram/GetAcademicProgram`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ACADEMIC_PROGRAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_PROGRAM_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const AcademicProgramCreateAction =
  (academicProgram, checkboxState) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_PROGRAM_CREATE_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: academicProgram,
        postedChekboxLst: { CheckBoxListID: checkboxState },
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.post(
        `${API_URL}/api/AcademicProgram/PostAcademicProgram`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: ACADEMIC_PROGRAM_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_PROGRAM_CREATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getAcademicProgramOptionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ACADEMIC_PROGRAM_OPTION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicProgram/GetToCreateAcademicProgram?company=0&searchKey=0`,
      tokenConfig()
    );

    dispatch({ type: GET_ACADEMIC_PROGRAM_OPTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ACADEMIC_PROGRAM_OPTION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleAcademicProgramAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_PROGRAM_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicProgram/GetAcademicProgramById/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_ACADEMIC_PROGRAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_PROGRAM_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

// api not published
export const updateSingleAcademicProgramAction =
  (academicProgram) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_PROGRAM_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicProgram });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        `${API_URL}/api/AcademicProgram/PostAcademicProgram`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: UPDATE_SINGLE_ACADEMIC_PROGRAM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_PROGRAM_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
