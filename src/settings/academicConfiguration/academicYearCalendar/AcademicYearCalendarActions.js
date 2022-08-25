import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  ACADEMIC_YEAR_CALENDAR_CREATE_FAIL,
  ACADEMIC_YEAR_CALENDAR_CREATE_POST_FAIL,
  ACADEMIC_YEAR_CALENDAR_CREATE_POST_REQUEST,
  ACADEMIC_YEAR_CALENDAR_CREATE_POST_SUCCESS,
  ACADEMIC_YEAR_CALENDAR_CREATE_REQUEST,
  ACADEMIC_YEAR_CALENDAR_CREATE_SUCCESS,
  ACADEMIC_YEAR_CALENDAR_SEARCH_FAIL,
  ACADEMIC_YEAR_CALENDAR_SEARCH_REQUEST,
  ACADEMIC_YEAR_CALENDAR_SEARCH_SUCCESS,
  GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_FAIL,
  GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_REQUEST,
  GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_SUCCESS,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_FAIL,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_REQUEST,
  GET_ALL_ACADEMIC_YEAR_CALENDAR_SUCCESS,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST,
  GET_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST,
  UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
} from "./AcademicYearCalendarConstant";

export const getAllAcademicYearCalendarAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_YEAR_CALENDAR_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicYearCalendar/GetAcademicYearCalendarLst`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ACADEMIC_YEAR_CALENDAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_YEAR_CALENDAR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getAcademicYearCalendarProgramAction =
  (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AcademicYearCalendar/GetUniversityProgramFaculty?idAcademicYear=${id}`,
        tokenConfig()
      );
      dispatch({
        type: GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACADEMIC_YEAR_CALENDAR_PROGRAM_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const createAcademicYearCalendarAction =
  (acaYear, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_YEAR_CALENDAR_CREATE_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AcademicYearCalendar/GetToCreateAcademicYearCalendar?idAcademicYear=${acaYear}&idFacultyProgramLink=${program}&idClass=${classId}`,
        tokenConfig()
      );
      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_CREATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const createAcademicYearCalendarPostAction =
  (calendar) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_YEAR_CALENDAR_CREATE_POST_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: calendar,
      });

      await axiosInstance.post(
        `${API_URL}/api/AcademicYearCalendar/PostAcademicYearCalendar`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_CREATE_POST_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_CREATE_POST_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const academicYearCalendarSearchAction =
  (acaYear, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_YEAR_CALENDAR_SEARCH_REQUEST });

      const { data } = await axiosInstance.get(
        // `${API_URL}/api/GetToSearchAcdemicYearCalendar/${acaYear}/${program}/${classId}/Search
        // `,
        `${API_URL}/api/AcademicYearCalendar/GetToSearchAcdemicYearCalendar?idAcademicYear=${acaYear}&idFacultyProgramLink=${program}&idClass=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACADEMIC_YEAR_CALENDAR_SEARCH_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleAcademicYearCalendarAction =
  (id, acaYear, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AcademicYearCalendar/GetAcademicYearCalendarById/${id}?idAcademicYear=${acaYear}&idFacultyProgramLink=${program}&level=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const updateSingleAcademicYearCalendarAction =
  (calendar) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: calendar,
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      await axiosInstance.put(
        `${API_URL}/api/AcademicYearCalendar/Put`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_YEAR_CALENDAR_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
