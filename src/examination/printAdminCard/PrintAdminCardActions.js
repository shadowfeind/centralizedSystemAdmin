import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_FAIL,
  GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_REQUEST,
  GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_SUCCESS,
  GET_INITIAL_ADMIT_CARD_DATA_FAIL,
  GET_INITIAL_ADMIT_CARD_DATA_REQUEST,
  GET_INITIAL_ADMIT_CARD_DATA_SUCCESS,
  PRINT_STUDENTS_ADMIT_CARD_FAIL,
  PRINT_STUDENTS_ADMIT_CARD_REQUEST,
  PRINT_STUDENTS_ADMIT_CARD_SUCCESS,
  SEARCH_STUDENTS_FOR_ADMIT_CARD_FAIL,
  SEARCH_STUDENTS_FOR_ADMIT_CARD_REQUEST,
  SEARCH_STUDENTS_FOR_ADMIT_CARD_SUCCESS,
} from "./PrintAdminCardConstants";

export const getInitialStudentRegistrationDataAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_INITIAL_ADMIT_CARD_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ExamAdmitCard/GetAllExamAdmitCard
        `,
        tokenConfig()
      );

      dispatch({
        type: GET_INITIAL_ADMIT_CARD_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_INITIAL_ADMIT_CARD_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getActiveStudentsForAdmitCardDataAction =
  (year, program, classId, section, shift) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ExamAdmitCard/GetActiveStudentsOnly?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}
        `,
        tokenConfig()
      );

      dispatch({
        type: GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_STUDENTS_FOR_ADMIT_CARD_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const searchStudentsForAdmitCardDataAction =
  (year, program, classId, section, shift, event, id) => async (dispatch) => {
    try {
      dispatch({ type: SEARCH_STUDENTS_FOR_ADMIT_CARD_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ExamAdmitCard/GetListExamAdmitCard?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idStudent=${id}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: SEARCH_STUDENTS_FOR_ADMIT_CARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_STUDENTS_FOR_ADMIT_CARD_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const printStudentsAdmitCardDataAction =
  (year, program, classId, section, shift, event, id, date) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRINT_STUDENTS_ADMIT_CARD_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ExamAdmitCard/GetBulkToPrintExamAdmitCard?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idStudent=${id}&examDate=2022/02/02`,
        tokenConfig()
      );

      dispatch({
        type: PRINT_STUDENTS_ADMIT_CARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRINT_STUDENTS_ADMIT_CARD_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
