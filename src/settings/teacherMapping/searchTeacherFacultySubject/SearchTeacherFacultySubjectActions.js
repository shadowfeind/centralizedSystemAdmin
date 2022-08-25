import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_FAIL,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_FAIL,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_REQUEST,
  GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_SUCCESS,
  GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_FAIL,
  GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_REQUEST,
  GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_SUCCESS,
  PUT_SEARCH_TEACHER_FAC_SUB_DATA_FAIL,
  PUT_SEARCH_TEACHER_FAC_SUB_DATA_REQUEST,
  PUT_SEARCH_TEACHER_FAC_SUB_DATA_SUCCESS,
} from "./SearchTeacherFacultySubjectConstants";

export const getAllSearchTeacherFacSubInitialDataAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/SearchTeacherFacultySubject/GetAllSearchTeacherFacultySubject?searchKey=1`,
        tokenConfig()
      );
      dispatch({
        type: GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SEARCH_TEACHER_FAC_SUB_INITIAL_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getAllSearchTeacherFacSubListDataAction =
  (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/SearchTeacherFacultySubject/GetListSearchTeacherFacultySubject?idTeacher=${id}`,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SEARCH_TEACHER_FAC_SUB_LIST_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const getSingleEditSearchTeacherFacSubListDataAction =
  (id, year, classId, section, shift, idTeacher) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_REQUEST,
      });

      const { data } = await axiosInstance.get(
        `/api/SearchTeacherFacultySubject/GetSingleToEditTeacherSubject/${id}?idYearFacultyLink=${year}&level=${classId}&section=${section}&idShift=${shift}&idTeacher=${idTeacher}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_EDIT_SEARCH_TEACHER_FAC_SUB_LIST_DATA_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };

export const putSearchTeacherFacSubAction = (teacher) => async (dispatch) => {
  try {
    dispatch({ type: PUT_SEARCH_TEACHER_FAC_SUB_DATA_REQUEST });

    const jsonData = JSON.stringify({
      dbModel: teacher,
    });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    await axiosInstance.put(
      `/api/SearchTeacherFacultySubject/PutSearchTeacherSubject`,
      jsonData,
      tokenConfig()
    );

    dispatch({
      type: PUT_SEARCH_TEACHER_FAC_SUB_DATA_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PUT_SEARCH_TEACHER_FAC_SUB_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
