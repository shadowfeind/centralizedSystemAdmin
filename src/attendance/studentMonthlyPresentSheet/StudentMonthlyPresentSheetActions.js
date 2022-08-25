import axios from "axios";
import {
  API_URL,
  axiosInstance,
  tokenConfig,
  tokenHeader,
} from "../../constants";
import {
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_FAIL,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_REQUEST,
  GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_SUCCESS,
  GET_ENGLISH_DATE_FAIL,
  GET_ENGLISH_DATE_REQUEST,
  GET_ENGLISH_DATE_SUCCESS,
  GET_LIST_FOR_PRESENT_STUDENT_FAIL,
  GET_LIST_FOR_PRESENT_STUDENT_REQUEST,
  GET_LIST_FOR_PRESENT_STUDENT_SUCCESS,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_FAIL,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_REQUEST,
  GET_LIST_FOR_UPDATE_STUDENT_PRESENT_SUCCESS,
  GET_LIST_STUDENT_PRESENT_FAIL,
  GET_LIST_STUDENT_PRESENT_REQUEST,
  GET_LIST_STUDENT_PRESENT_SUCCESS,
  GET_SUBJECT_OPTIONS_FOR_SELECT_FAIL,
  GET_SUBJECT_OPTIONS_FOR_SELECT_REQUEST,
  GET_SUBJECT_OPTIONS_FOR_SELECT_SUCCESS,
  POST_LIST_STUDENT_PRESENT_FAIL,
  POST_LIST_STUDENT_PRESENT_REQUEST,
  POST_LIST_STUDENT_PRESENT_SUCCESS,
} from "./StudentMonthlyPresentSheetConstants";

export const getAllStudentPresentSheetDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/StudentPresentSheet/GetAllStudentPresentSheet`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_STUDEN_MONTHLY_PRESENT_SHEET_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSubjectOptionsForSelectAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SUBJECT_OPTIONS_FOR_SELECT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentPresentSheet/GetPopulateSubjectByLevel?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SUBJECT_OPTIONS_FOR_SELECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SUBJECT_OPTIONS_FOR_SELECT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getEnglishDateAction = (year, month) => async (dispatch) => {
  try {
    dispatch({ type: GET_ENGLISH_DATE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/StudentPresentSheet/GetEngDate?year=${year}&month=${month}`,
      tokenConfig()
    );

    dispatch({
      type: GET_ENGLISH_DATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ENGLISH_DATE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListStudentPresentAction =
  (
    year,
    program,
    classId,
    subject,
    section,
    shift,
    npYear,
    npMonth,
    currentDate
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_STUDENT_PRESENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentPresentSheet/GetListStudentPresentSheet?currentDate=${currentDate}&npYear=${npYear}&npMonth=${npMonth}&idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&idSubject=${subject}&section=${section}&idShift=${shift}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_STUDENT_PRESENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_STUDENT_PRESENT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getListForUpdateStudentPresentAction =
  (
    year,
    program,
    classId,
    subject,
    section,
    shift,
    npYear,
    npMonth,
    currentDate
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_FOR_UPDATE_STUDENT_PRESENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentPresentSheet/GetSingleToCreateStudentPresentSheet?currentDate=${currentDate}&npYear=${npYear}&npMonth=${npMonth}&idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&idSubject=${subject}&section=${section}&idShift=${shift}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_FOR_UPDATE_STUDENT_PRESENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_FOR_UPDATE_STUDENT_PRESENT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getListForPresentStudentAction =
  (currentDate, program, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_FOR_PRESENT_STUDENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentPresentSheet/GetPresentOrAbsent?currentDate=${currentDate}&idStudentFacultyLevel=${program}&IdSubject=${subject}`,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_FOR_PRESENT_STUDENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_FOR_PRESENT_STUDENT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postStudentPresentListAction =
  (attendance, searchFilterModel, SchoolShortName, subject) =>
  async (dispatch) => {
    try {
      dispatch({ type: POST_LIST_STUDENT_PRESENT_REQUEST });

      let absentStudent = attendance?.filter((x) => x.IsPresent !== true);
      let absentStudentFcm = [];
      absentStudent.forEach((x) => absentStudentFcm.push(x.FCMTokenValue));

      if (absentStudentFcm.length > 0) {
        const fcmBody = {
          registration_ids: [...absentStudentFcm],
          collapse_key: "type_a",
          notification: {
            body: `Absent in ${subject}`,
            title: SchoolShortName,
          },
        };
        const fbody = JSON.stringify(fcmBody);

        await axios.post(
          "https://fcm.googleapis.com/fcm/send",
          fbody,
          tokenHeader
        );
      }

      const jsonData = JSON.stringify({
        dbStudentClassAttendanceModelAttendanceLst: attendance,
        searchFilterModel,
      });

      console.log(jsonData);

      const { data } = await axiosInstance.post(
        `/api/StudentPresentSheet/PostStudentPresentSheet`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_LIST_STUDENT_PRESENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_LIST_STUDENT_PRESENT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
