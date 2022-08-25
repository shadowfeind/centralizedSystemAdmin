import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  ACADEMIC_CLASS_CREATE_FAIL,
  ACADEMIC_CLASS_CREATE_REQUEST,
  ACADEMIC_CLASS_CREATE_SUCCESS,
  GET_ALL_ACADEMIC_CLASS_FAIL,
  GET_ALL_ACADEMIC_CLASS_REQUEST,
  GET_ALL_ACADEMIC_CLASS_SUCCESS,
  GET_SINGLE_ACADEMIC_CLASS_FAIL,
  GET_SINGLE_ACADEMIC_CLASS_REQUEST,
  GET_SINGLE_ACADEMIC_CLASS_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_CLASS_FAIL,
  UPDATE_SINGLE_ACADEMIC_CLASS_REQUEST,
  UPDATE_SINGLE_ACADEMIC_CLASS_SUCCESS,
} from "./AcademicClassConstants";

export const getAllAcademicClassAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_CLASS_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicClass/GetAcademicClass`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ACADEMIC_CLASS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_CLASS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const academicClassCreateAction =
  (academicClass) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_CLASS_CREATE_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicClass });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.post(
        `${API_URL}/api/AcademicClass/PostHRPosition`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: ACADEMIC_CLASS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_CLASS_CREATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleAcademicClassAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_CLASS_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicClass/GetAcademicClassById/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_ACADEMIC_CLASS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_CLASS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSingleAcademicClassAction =
  (academicClass) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_CLASS_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicClass });

      const { data } = await axiosInstance.put(
        `${API_URL}/api/AcademicClass/PutHRPosition`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: UPDATE_SINGLE_ACADEMIC_CLASS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_CLASS_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
