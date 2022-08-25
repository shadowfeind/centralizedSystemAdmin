import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  DELETE_CLASS_SUBJECT_FAIL,
  DELETE_CLASS_SUBJECT_REQUEST,
  DELETE_CLASS_SUBJECT_SUCCESS,
  GET_ALL_CLASS_SUBJECT_FAIL,
  GET_ALL_CLASS_SUBJECT_REQUEST,
  GET_ALL_CLASS_SUBJECT_SUCCESS,
  GET_CLASS_SUBJECT_LIST_FAIL,
  GET_CLASS_SUBJECT_LIST_REQUEST,
  GET_CLASS_SUBJECT_LIST_SUCCESS,
  GET_SINGLE_CLASS_SUBJECT_FAIL,
  GET_SINGLE_CLASS_SUBJECT_REQUEST,
  GET_SINGLE_CLASS_SUBJECT_SUCCESS,
  GET_TO_CREATE_CLASS_SUBJECT_FAIL,
  GET_TO_CREATE_CLASS_SUBJECT_REQUEST,
  GET_TO_CREATE_CLASS_SUBJECT_SUCCESS,
  POST_TO_CREATE_CLASS_SUBJECT_FAIL,
  POST_TO_CREATE_CLASS_SUBJECT_REQUEST,
  POST_TO_CREATE_CLASS_SUBJECT_SUCCESS,
  UPDATE_SINGLE_CLASS_SUBJECT_FAIL,
  UPDATE_SINGLE_CLASS_SUBJECT_REQUEST,
  UPDATE_SINGLE_CLASS_SUBJECT_SUCCESS,
} from "./ClassSubjectConstants";

export const getALLClassSubjectAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CLASS_SUBJECT_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ClassSubject/GetAllClassSubject`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_CLASS_SUBJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CLASS_SUBJECT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getClassSubjectListAction = (classId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CLASS_SUBJECT_LIST_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ClassSubject/GetListClassSubject?idClass=${classId}`,
      tokenConfig()
    );

    dispatch({ type: GET_CLASS_SUBJECT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CLASS_SUBJECT_LIST_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleClassSubjectAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CLASS_SUBJECT_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ClassSubject/GetSingleToEditClassSubject/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_CLASS_SUBJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CLASS_SUBJECT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getToCreateClassSubjectAction = (classId) => async (dispatch) => {
  try {
    dispatch({ type: GET_TO_CREATE_CLASS_SUBJECT_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ClassSubject/GetSingleToCreateClassSubject?idClass=${classId}`,
      tokenConfig()
    );

    dispatch({ type: GET_TO_CREATE_CLASS_SUBJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TO_CREATE_CLASS_SUBJECT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSingleClassSubjectAction = (subject) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_CLASS_SUBJECT_REQUEST });

    const jsonData = JSON.stringify({
      dbModel: subject,
    });

    const { data } = await axiosInstance.put(
      `${API_URL}/api/ClassSubject/PutClassSubject`,
      jsonData,
      tokenConfig()
    );

    dispatch({
      type: UPDATE_SINGLE_CLASS_SUBJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_CLASS_SUBJECT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const createSingleClassSubjectAction =
  (idYearFacultyProgramLink, level, checkboxState) => async (dispatch) => {
    try {
      dispatch({ type: POST_TO_CREATE_CLASS_SUBJECT_REQUEST });

      const jsonData = JSON.stringify({
        idYearFacultyProgramLink,
        level,
        ddlSubjectModelLst: checkboxState,
        actionType: 0,
      });

      console.log(jsonData);
      const { data } = await axiosInstance.post(
        `${API_URL}/api/ClassSubject/PostAcademicFacultySubjectLinkA`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_TO_CREATE_CLASS_SUBJECT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_TO_CREATE_CLASS_SUBJECT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const deleteClassSubjectAction = (classSubject) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CLASS_SUBJECT_REQUEST });

    const jsonData = JSON.stringify({ dbModel: classSubject });
    console.log(jsonData);

    await axiosInstance.post(
      `/api/ClassSubject/DeleteClassSubject`,
      jsonData,
      tokenConfig()
    );
    dispatch({ type: DELETE_CLASS_SUBJECT_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_CLASS_SUBJECT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
