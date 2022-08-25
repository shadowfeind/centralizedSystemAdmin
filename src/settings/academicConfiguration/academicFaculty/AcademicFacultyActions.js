import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  ACADEMIC_FACULTY_CREATE_FAIL,
  ACADEMIC_FACULTY_CREATE_REQUEST,
  ACADEMIC_FACULTY_CREATE_SUCCESS,
  GET_ACADEMIC_FACULTY_OPTION_FAIL,
  GET_ACADEMIC_FACULTY_OPTION_REQUEST,
  GET_ACADEMIC_FACULTY_OPTION_SUCCESS,
  GET_ALL_ACADEMIC_FACULTY_FAIL,
  GET_ALL_ACADEMIC_FACULTY_REQUEST,
  GET_ALL_ACADEMIC_FACULTY_SUCCESS,
  GET_SINGLE_ACADEMIC_FACULTY_FAIL,
  GET_SINGLE_ACADEMIC_FACULTY_REQUEST,
  GET_SINGLE_ACADEMIC_FACULTY_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_FACULTY_FAIL,
  UPDATE_SINGLE_ACADEMIC_FACULTY_REQUEST,
  UPDATE_SINGLE_ACADEMIC_FACULTY_SUCCESS,
} from "./AcademicFacultyConstants";

export const getAllAcademicFacultyAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_FACULTY_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicFaculty/GetAcademicFaculty`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ACADEMIC_FACULTY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_FACULTY_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const AcademicFacultyCreateAction =
  (academicFaculty, checkboxState) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_FACULTY_CREATE_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: academicFaculty,
        postedChekboxLst: { CheckBoxListID: checkboxState },
      });

      console.log(jsonData);

      const { data } = await axiosInstance.post(
        `${API_URL}/api/AcademicFaculty/PostAcademicFaculty`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: ACADEMIC_FACULTY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_FACULTY_CREATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getAcademicFacultyOptionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ACADEMIC_FACULTY_OPTION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicFaculty/GetToCreateAcademicFaculty?company=0&searchKey=0`,
      tokenConfig()
    );

    dispatch({ type: GET_ACADEMIC_FACULTY_OPTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ACADEMIC_FACULTY_OPTION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleAcademicFacultyAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_FACULTY_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicFaculty/GetAcademicFacultyById/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_ACADEMIC_FACULTY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_FACULTY_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSingleAcademicFacultyAction =
  (academicFaculty) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_FACULTY_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicFaculty });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        `${API_URL}/api/AcademicFaculty`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: UPDATE_SINGLE_ACADEMIC_FACULTY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_FACULTY_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
