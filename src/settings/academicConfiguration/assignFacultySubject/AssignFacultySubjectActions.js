import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  ASSIGN_FACULTY_SUBJECT_EDIT_FAIL,
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_FAIL,
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_REQUEST,
  ASSIGN_FACULTY_SUBJECT_EDIT_POST_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_EDIT_REQUEST,
  ASSIGN_FACULTY_SUBJECT_EDIT_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_GENERATE_FAIL,
  ASSIGN_FACULTY_SUBJECT_GENERATE_REQUEST,
  ASSIGN_FACULTY_SUBJECT_GENERATE_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_GET_FAIL,
  ASSIGN_FACULTY_SUBJECT_GET_REQUEST,
  ASSIGN_FACULTY_SUBJECT_GET_SUCCESS,
  ASSIGN_FACULTY_SUBJECT_POST_FAIL,
  ASSIGN_FACULTY_SUBJECT_POST_REQUEST,
  ASSIGN_FACULTY_SUBJECT_POST_SUCCESS,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_FAIL,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_REQUEST,
  GET_ALL_ASSIGN_FACULTY_SUBJECT_SUCCESS,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_FAIL,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_REQUEST,
  GET_LIST_ASSIGN_FACULTY_SUBJECT_SUCCESS,
  GET_SINGLE_ASSIGN_FACULTY_SUBJECT_FAIL,
  GET_SINGLE_ASSIGN_FACULTY_SUBJECT_REQUEST,
  GET_SINGLE_ASSIGN_FACULTY_SUBJECT_SUCCESS,
} from "./AssignFacultySubjectConstants";

export const getALLAssignFacultySubject = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ASSIGN_FACULTY_SUBJECT_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcaFacultySubjectLink/GetAcademicFacultySubjectLink`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ASSIGN_FACULTY_SUBJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ASSIGN_FACULTY_SUBJECT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListAssignFacultySubject =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_ASSIGN_FACULTY_SUBJECT_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AcaFacultySubjectLink/GetListAcademicFacultySubjectLink?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_ASSIGN_FACULTY_SUBJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_ASSIGN_FACULTY_SUBJECT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleAssignFacultySubjectAction =
  (id, year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_ASSIGN_FACULTY_SUBJECT_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AcaFacultySubjectLink/GetSingleEditAcademicFacultySubjectLinkByParams/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_ASSIGN_FACULTY_SUBJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_ASSIGN_FACULTY_SUBJECT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getAssignFacultySubjectOptionAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_GET_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AcaFacultySubjectLink/GetAcademicFacultySubjectLinkToCreate?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}`,
        tokenConfig()
      );
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_GET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_GET_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const AcademicFacultyCreateAction =
  (idYearFacultyProgramLink, level, checkboxState) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_POST_REQUEST });

      const jsonData = JSON.stringify({
        idYearFacultyProgramLink,
        level,
        ddlSubjectModelLst: checkboxState,
        actionType: 0,
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.post(
        `${API_URL}/api/AcaFacultySubjectLink/PostAcademicFacultySubjectLinkA`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: ASSIGN_FACULTY_SUBJECT_POST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_POST_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getAssignFacultySubjectEditAction =
  (id, year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_EDIT_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AcaFacultySubjectLink/GetSingleEditAcademicFacultySubjectLinkByParams/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}`,
        tokenConfig()
      );

      dispatch({ type: ASSIGN_FACULTY_SUBJECT_EDIT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_EDIT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const academicFacultySubjectPostEditAction =
  (dbModel, values, idYearFacultyProgramLink, level) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_EDIT_POST_REQUEST });

      const jsonData = JSON.stringify({
        idYearFacultyProgramLink,
        level,
        model: values,
        dbModel,
      });

      const { data } = await axiosInstance.put(
        `${API_URL}/api/AcaFacultySubjectLink/Put`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_EDIT_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_EDIT_POST_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getAssignFacultySubjectGenerateAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_FACULTY_SUBJECT_GENERATE_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AcaFacultySubjectLink/GetGenerateBulkSubject?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_GENERATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ASSIGN_FACULTY_SUBJECT_GENERATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
