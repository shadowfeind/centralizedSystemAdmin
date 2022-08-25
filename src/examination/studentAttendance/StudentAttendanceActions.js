import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_STUDEN_ATTENDANCE_FAIL,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_FAIL,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_REQUEST,
  GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_SUCCESS,
  GET_ALL_STUDEN_ATTENDANCE_REQUEST,
  GET_ALL_STUDEN_ATTENDANCE_SUCCESS,
  GET_BULK_STUDENT_ATTENDANCE_FAIL,
  GET_BULK_STUDENT_ATTENDANCE_REQUEST,
  GET_BULK_STUDENT_ATTENDANCE_SUCCESS,
  GET_GENERATED_STUDENT_ATTENDANCE_FAIL,
  GET_GENERATED_STUDENT_ATTENDANCE_REQUEST,
  GET_GENERATED_STUDENT_ATTENDANCE_SUCCESS,
  POST_BULK_STUDENT_ATTENDANCE_FAIL,
  POST_BULK_STUDENT_ATTENDANCE_REQUEST,
  POST_BULK_STUDENT_ATTENDANCE_SUCCESS,
} from "./StudentAttendanceConstants";

export const getAllStudentAttendanceInitialDataAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentAttendance/GetAllStudentAttendance
      `,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_STUDEN_ATTENDANCE_INITIAL_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getAllStudentAttendanceAction =
  (year, program, classId, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_STUDEN_ATTENDANCE_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentAttendance/GetListStudentAttendance?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_STUDEN_ATTENDANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_STUDEN_ATTENDANCE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getBulkStudentAttendanceAction =
  (year, program, classId, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_STUDENT_ATTENDANCE_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentAttendance/GetBulkAttendance?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}`,
        tokenConfig()
      );

      dispatch({
        type: GET_BULK_STUDENT_ATTENDANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_STUDENT_ATTENDANCE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postBulkStudentAttendanceAction =
  (students, search, workingDays) => async (dispatch) => {
    try {
      dispatch({ type: POST_BULK_STUDENT_ATTENDANCE_REQUEST });

      const jsonData = JSON.stringify({
        dbModelPresentAbsentLst: students,
        searchFilterModel: search,
        WorkingDayTotal: workingDays,
      });

      // console.log(jsonData);

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      await axiosInstance.post(
        `${API_URL}/api/StudentAttendance/PostStudentAttendance`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_BULK_STUDENT_ATTENDANCE_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_BULK_STUDENT_ATTENDANCE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getGeneratedStudentAttendanceAction =
  (year, program, classId, section, shift, event, workingDays, start, end) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_GENERATED_STUDENT_ATTENDANCE_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentAttendance/GenerateAttendance?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&workingDaysTotal=${workingDays}&startDate=${start}&endDate=${end}`,
        tokenConfig()
      );

      dispatch({
        type: GET_GENERATED_STUDENT_ATTENDANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_GENERATED_STUDENT_ATTENDANCE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
