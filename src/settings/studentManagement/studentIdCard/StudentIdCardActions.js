import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_FAIL,
  GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_REQUEST,
  GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_SUCCESS,
  GET_INITIAL_STUDENT_ID_CARD_DATA_FAIL,
  GET_INITIAL_STUDENT_ID_CARD_DATA_REQUEST,
  GET_INITIAL_STUDENT_ID_CARD_DATA_SUCCESS,
  GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_FAIL,
  GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_REQUEST,
  GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_SUCCESS,
} from "./StudentIdCardConstants";

export const getInitialStudentIdCardDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INITIAL_STUDENT_ID_CARD_DATA_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/StudentIdCard/GetAllStudentIdCard
        `,
      tokenConfig()
    );

    dispatch({
      type: GET_INITIAL_STUDENT_ID_CARD_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INITIAL_STUDENT_ID_CARD_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getActiveStudentsForStudentIdCardDataAction =
  (year, program, classId, shift, id, section, date) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentIdCard/GetListStudentIdCard?IdAcademicYear=${year}&IdFacultyProgramLink=${program}&level=${classId}&idShift=${shift}&idStudent=${id}&section=${section}&ValidityDate=${date}`,
        tokenConfig()
      );

      dispatch({
        type: GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_STUDENTS_FOR_STUDENT_ID_CARD_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getPrintBulkStudentsForStudentIdCardDataAction =
  (year, program, classId, shift, id, section, date) => async (dispatch) => {
    try {
      dispatch({ type: GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentIdCard/GetPrintBulk?IdAcademicYear=${year}&IdFacultyProgramLink=${program}&level=${classId}&idShift=${shift}&idStudent=${id}&section=${section}&ValidityDate=${date}`,
        tokenConfig()
      );

      dispatch({
        type: GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_PRINT_BULK_STUDENTS_FOR_STUDENT_ID_CARD_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
