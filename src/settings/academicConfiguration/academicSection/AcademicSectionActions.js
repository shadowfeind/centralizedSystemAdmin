import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  ACADEMIC_SECTION_CREATE_FAIL,
  ACADEMIC_SECTION_CREATE_REQUEST,
  ACADEMIC_SECTION_CREATE_SUCCESS,
  GET_ALL_ACADEMIC_SECTION_FAIL,
  GET_ALL_ACADEMIC_SECTION_REQUEST,
  GET_ALL_ACADEMIC_SECTION_SUCCESS,
  GET_SINGLE_ACADEMIC_SECTION_FAIL,
  GET_SINGLE_ACADEMIC_SECTION_REQUEST,
  GET_SINGLE_ACADEMIC_SECTION_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_SECTION_FAIL,
  UPDATE_SINGLE_ACADEMIC_SECTION_REQUEST,
  UPDATE_SINGLE_ACADEMIC_SECTION_SUCCESS,
} from "./AcademicSectionConstants";

export const getAllAcademicSectionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_SECTION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicRoom/GetAcademicRoom`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ACADEMIC_SECTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_SECTION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const AcademicSectionCreateAction =
  (academicSection) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_SECTION_CREATE_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicSection });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.post(
        `${API_URL}/api/AcademicRoom/PostAcademicRoom`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: ACADEMIC_SECTION_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_SECTION_CREATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleAcademicSectionAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_SECTION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicRoom/GetAcademicRoomById/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_ACADEMIC_SECTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_SECTION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSingleAcademicSectionAction =
  (academicSection) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_SECTION_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicSection });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        `${API_URL}/api/AcademicRoom/PutAcademicRoom`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: UPDATE_SINGLE_ACADEMIC_SECTION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_SECTION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
