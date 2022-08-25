import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_GENERATE_FAIL,
  GET_ALL_GENERATE_PUBLISH_FAIL,
  GET_ALL_GENERATE_PUBLISH_REQUEST,
  GET_ALL_GENERATE_PUBLISH_RESULT_FAIL,
  GET_ALL_GENERATE_PUBLISH_RESULT_REQUEST,
  GET_ALL_GENERATE_PUBLISH_RESULT_SUCCESS,
  GET_ALL_GENERATE_PUBLISH_SUCCESS,
  GET_ALL_GENERATE_REQUEST,
  GET_ALL_GENERATE_SUCCESS,
} from "./GeneratePublishResultConstants";

export const getAllGeneratePublishAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_GENERATE_PUBLISH_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/GeneratePublishResult/GetAllGeneratePublish
      `,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_GENERATE_PUBLISH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_GENERATE_PUBLISH_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getAllGenerateAction =
  (year, program, level, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_GENERATE_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/GeneratePublishResult/GetListGeneratePublishResult?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${level}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_GENERATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_GENERATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getGenerateResultAction =
  (year, program, level, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_GENERATE_PUBLISH_RESULT_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/GeneratePublishResult/Generate?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${level}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}`,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_GENERATE_PUBLISH_RESULT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_GENERATE_PUBLISH_RESULT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
