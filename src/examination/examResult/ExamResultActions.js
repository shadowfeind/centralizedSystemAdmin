import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_EVENT_FOR_EXAM_MARK_FAIL,
  GET_EVENT_FOR_EXAM_MARK_REQUEST,
  GET_EVENT_FOR_EXAM_MARK_SUCCESS,
  GET_EXAM_LEDGER_HEADER_FAIL,
  GET_EXAM_LEDGER_HEADER_REQUEST,
  GET_EXAM_LEDGER_HEADER_SUCCESS,
  GET_EXAM_RESULT_LIST_FAIL,
  GET_EXAM_RESULT_LIST_REQUEST,
  GET_EXAM_RESULT_LIST_SUCCESS,
  GET_INITIAL_EXAM_RESULT_DATA_FAIL,
  GET_INITIAL_EXAM_RESULT_DATA_REQUEST,
  GET_INITIAL_EXAM_RESULT_DATA_SUCCESS,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_FAIL,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_REQUEST,
  GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_SUCCESS,
  PRINT_EXAM_RESULT_COUNT_FAIL,
  PRINT_EXAM_RESULT_COUNT_REQUEST,
  PRINT_EXAM_RESULT_COUNT_SUCCESS,
  PRINT_EXAM_RESULT_FAIL,
  PRINT_EXAM_RESULT_REQUEST,
  PRINT_EXAM_RESULT_SUCCESS,
  PRINT_FINAL_RESULT_FAIL,
  PRINT_FINAL_RESULT_REQUEST,
  PRINT_FINAL_RESULT_SUCCESS,
} from "./ExamResultConstants";

export const getInitialExamResultDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INITIAL_EXAM_RESULT_DATA_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ExamResult/GetAllExamResult
        `,
      tokenConfig()
    );

    dispatch({
      type: GET_INITIAL_EXAM_RESULT_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INITIAL_EXAM_RESULT_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getEventForExamMarkAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_EVENT_FOR_EXAM_MARK_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ExamResult/GetAcademicYearCalendar?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_EVENT_FOR_EXAM_MARK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EVENT_FOR_EXAM_MARK_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getStudentOptionsForExamMarkAction =
  (year, program, classId, section, shift) => async (dispatch) => {
    try {
      dispatch({ type: GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/ExamResult/GetStudent?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}`,
        tokenConfig()
      );

      dispatch({
        type: GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_INITIAL_EXAM_RESULT_STUDENT_OPTIONS_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getExamResultListAction =
  (year, program, classId, section, shift, event, studentId, date, npYear) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_EXAM_RESULT_LIST_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ExamResult/GetListExamResult?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idStudent=${studentId}&examDate=${date}&npYear=${npYear}`,
        tokenConfig()
      );

      dispatch({
        type: GET_EXAM_RESULT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EXAM_RESULT_LIST_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getExamLedgerHeaderAction =
  (year, program, classId, section, shift, event, studentId, date, npYear) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_EXAM_LEDGER_HEADER_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ExamResult/GetListAnnualResultLedger?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idStudent=${studentId}&examDate=${date}&npYear=${npYear}`,
        tokenConfig()
      );

      dispatch({
        type: GET_EXAM_LEDGER_HEADER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EXAM_LEDGER_HEADER_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const printExamResultAction =
  (year, program, classId, section, shift, event, studentId, date, npYear) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRINT_EXAM_RESULT_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ExamResult/GetPrintBulk?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idStudent=${studentId}&examDate=${date}&npYear=${npYear}`,
        tokenConfig()
      );

      dispatch({
        type: PRINT_EXAM_RESULT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRINT_EXAM_RESULT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const printExamResultCountAction =
  (year, program, classId, section, shift, event, studentId, npYear) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRINT_EXAM_RESULT_COUNT_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ExamResult/GetPrintCount?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idStudent=${studentId}&npYear=${npYear}`,
        tokenConfig()
      );

      dispatch({
        type: PRINT_EXAM_RESULT_COUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRINT_EXAM_RESULT_COUNT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const printFinalResultAction =
  (year, program, classId, section, shift, event, studentId, date, npYear) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRINT_FINAL_RESULT_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ExamResult/GetPrintFinalResult?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idStudent=${studentId}&examDate=${date}&npYear=${npYear}`,
        tokenConfig()
      );

      dispatch({
        type: PRINT_FINAL_RESULT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRINT_FINAL_RESULT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
