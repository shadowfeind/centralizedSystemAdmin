import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_FAIL,
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_REQUEST,
  GET_ALL_EXAM_APPROVAL_SEARCHDATA_SUCCESS,
  GET_ALL_SCHOOL_VALUE_FAIL,
  GET_ALL_SCHOOL_VALUE_REQUEST,
  GET_ALL_SCHOOL_VALUE_SUCCESS,
  GET_BULK_EXAM_APPROVAL_BLANK_PAGE_FAIL,
  GET_BULK_EXAM_APPROVAL_BLANK_PAGE_REQUEST,
  GET_BULK_EXAM_APPROVAL_BLANK_PAGE_SUCCESS,
  GET_BULK_EXAM_APPROVAL_FAIL,
  GET_BULK_EXAM_APPROVAL_REQUEST,
  GET_BULK_EXAM_APPROVAL_SUCCESS,
  GET_EXAM_APPROVAL_SCHEULE_HEADER_FAIL,
  GET_EXAM_APPROVAL_SCHEULE_HEADER_REQUEST,
  GET_EXAM_APPROVAL_SCHEULE_HEADER_SUCCESS,
  GET_INITIAL_EXAM_APPORVAL_DATA_FAIL,
  GET_INITIAL_EXAM_APPORVAL_DATA_REQUEST,
  GET_INITIAL_EXAM_APPORVAL_DATA_SUCCESS,
  POST_BULK_EXAM_APPROVAL_FAIL,
  POST_BULK_EXAM_APPROVAL_REQUEST,
  POST_BULK_EXAM_APPROVAL_SUCCESS,
} from "./ExamMarkApprovalConstants";

export const getInitialExamApprovalDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INITIAL_EXAM_APPORVAL_DATA_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ApproveAcademicStudentExamData/GetAllExamMarkApproval
      `,
      tokenConfig()
    );

    dispatch({
      type: GET_INITIAL_EXAM_APPORVAL_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INITIAL_EXAM_APPORVAL_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getExamApprovalScheduleHeaderAction =
  (year, program, classId, section, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_EXAM_APPROVAL_SCHEULE_HEADER_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ApproveAcademicStudentExamData/GetActiveExamScheduleListForExamMarkEntry?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idAcademicYearCalendar=${event}&roleID=2`,
        tokenConfig()
      );

      dispatch({
        type: GET_EXAM_APPROVAL_SCHEULE_HEADER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_EXAM_APPROVAL_SCHEULE_HEADER_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getExamApprovalSearchDataAction =
  (year, program, classId, section, shift, event, schedule) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_EXAM_APPROVAL_SEARCHDATA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ApproveAcademicStudentExamData/GetListExamMarkApproval?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idAcademicExamSchedule=${schedule}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_EXAM_APPROVAL_SEARCHDATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_EXAM_APPROVAL_SEARCHDATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getBulkExamApprovalSearchDataAction =
  (year, program, classId, section, shift, event, schedule) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_EXAM_APPROVAL_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ApproveAcademicStudentExamData/GetBulkMarkApproval?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idAcademicExamSchedule=${schedule}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_BULK_EXAM_APPROVAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_EXAM_APPROVAL_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getBulkExamApprovalBlankDataAction =
  (year, program, classId, section, shift, event, schedule) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_EXAM_APPROVAL_BLANK_PAGE_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ApproveAcademicStudentExamData/GetPrintBulkForBlankMarkEntry?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&idAcademicExamSchedule=${schedule}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_BULK_EXAM_APPROVAL_BLANK_PAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_EXAM_APPROVAL_BLANK_PAGE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postBulkExamMarkApprovalAction =
  (students, search) => async (dispatch) => {
    try {
      dispatch({ type: POST_BULK_EXAM_APPROVAL_REQUEST });

      const jsonData = JSON.stringify({
        dbModelLsts: students,
        searchFilterModel: search,
      });

      console.log(jsonData);

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      await axiosInstance.post(
        `${API_URL}/api/ApproveAcademicStudentExamData/PostApproveAcademicStudentExamData`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_BULK_EXAM_APPROVAL_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_BULK_EXAM_APPROVAL_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getAllSchoolValueAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SCHOOL_VALUE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/Home/GetSchoolValue
        `,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_SCHOOL_VALUE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SCHOOL_VALUE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
