import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  CREATE_SINGLE_TEACHER_FAC_SUB_FAIL,
  CREATE_SINGLE_TEACHER_FAC_SUB_REQUEST,
  CREATE_SINGLE_TEACHER_FAC_SUB_SUCCESS,
  CREATE_TEACHER_FAC_SUB_INITIAL_DATA_FAIL,
  CREATE_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST,
  CREATE_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS,
  DELETE_TEACHER_FAC_SUB_FAIL,
  DELETE_TEACHER_FAC_SUB_REQUEST,
  DELETE_TEACHER_FAC_SUB_SUCCESS,
  GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_FAIL,
  GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST,
  GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS,
  GET_ALL_TEACHER_FAC_SUB_LIST_DATA_FAIL,
  GET_ALL_TEACHER_FAC_SUB_LIST_DATA_REQUEST,
  GET_ALL_TEACHER_FAC_SUB_LIST_DATA_SUCCESS,
  GET_SINGLE_TEACHER_FAC_SUB_DATA_FAIL,
  GET_SINGLE_TEACHER_FAC_SUB_DATA_REQUEST,
  GET_SINGLE_TEACHER_FAC_SUB_DATA_SUCCESS,
  SINGLE_TEACHER_FAC_SUB_EDIT_FAIL,
  SINGLE_TEACHER_FAC_SUB_EDIT_REQUEST,
  SINGLE_TEACHER_FAC_SUB_EDIT_SUCCESS,
} from "./TeacherFacultySubjectConstants";

export const getAllTeacherFacSubInitialDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/HRTeacherFacultySubjectMappingHeader/GetAllHRTeacherFacultySubjectMappingHeader`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TEACHER_FAC_SUB_INITIAL_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getAllTeacherFacSubListDataAction =
  (year, program, classId, section, shift) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_TEACHER_FAC_SUB_LIST_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/HRTeacherFacultySubjectMappingHeader/GetListHRTeacherFacultySubjectMappingHeader?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_TEACHER_FAC_SUB_LIST_DATA_SUCCESS,
        payload: data,
        query: { year, program, classId, section, shift },
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_TEACHER_FAC_SUB_LIST_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleTeacherFacSubDataAction =
  (id, year, program, classId, section, shift, teacherId) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TEACHER_FAC_SUB_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/HRTeacherFacultySubjectMappingHeader/GetSingleToEditTeacherFacultySubjectMappingHeader/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idTeacher=${teacherId}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TEACHER_FAC_SUB_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TEACHER_FAC_SUB_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const singleTeacherFacSubEditAction = (teacher) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_TEACHER_FAC_SUB_EDIT_REQUEST });

    const jsonData = JSON.stringify({
      dbModel: teacher,
    });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    await axiosInstance.put(
      `/api/HRTeacherFacultySubjectMappingHeader/PutTeacherSubject`,
      jsonData,
      tokenConfig()
    );

    dispatch({
      type: SINGLE_TEACHER_FAC_SUB_EDIT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_TEACHER_FAC_SUB_EDIT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const createTeacherFacSubInitDataAction =
  (year, program, classId, section, shift) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/HRTeacherFacultySubjectMappingHeader/GetSingleToCreateTeacherFacultySubjectMappingHeader?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: CREATE_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_TEACHER_FAC_SUB_INITIAL_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const createSingleTeacherFacSubAction =
  (teacher, searchFilterModel) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SINGLE_TEACHER_FAC_SUB_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: {
          ...teacher,
        },
        searchFilterModel,
      });

      await axiosInstance.post(
        `/api/HRTeacherFacultySubjectMappingHeader/Post`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: CREATE_SINGLE_TEACHER_FAC_SUB_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: CREATE_SINGLE_TEACHER_FAC_SUB_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const deleteTeacherFacSubAction = (teacher) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TEACHER_FAC_SUB_REQUEST });

    const jsonData = JSON.stringify({
      dbModel: teacher,
    });

    await axiosInstance.post(
      `/api/HRTeacherFacultySubjectMappingHeader/DeleteTeacherSubject`,
      jsonData,
      tokenConfig()
    );

    dispatch({
      type: DELETE_TEACHER_FAC_SUB_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TEACHER_FAC_SUB_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
