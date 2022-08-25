import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_ASSIGN_ECA_FAIL,
  GET_ALL_ASSIGN_ECA_REQUEST,
  GET_ALL_ASSIGN_ECA_SUCCESS,
  GET_LIST_ASSIGN_ECA_FAIL,
  GET_LIST_ASSIGN_ECA_REQUEST,
  GET_LIST_ASSIGN_ECA_SUCCESS,
  GET_SINGLE_CREATE_ASSIGN_ECA_FAIL,
  GET_SINGLE_CREATE_ASSIGN_ECA_REQUEST,
  GET_SINGLE_CREATE_ASSIGN_ECA_SUCCESS,
  POST_ASSIGN_ECA_FAIL,
  POST_ASSIGN_ECA_REQUEST,
  POST_ASSIGN_ECA_SUCCESS,
} from "./AssignEcaConstants";

export const getALLAssignEcaAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ASSIGN_ECA_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AssignECA/GetAllAssignECA`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ASSIGN_ECA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ASSIGN_ECA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListAssignEcaAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_ASSIGN_ECA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AssignECA/GetListAssignECA?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}`,
        tokenConfig()
      );

      dispatch({ type: GET_LIST_ASSIGN_ECA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_LIST_ASSIGN_ECA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleCreateAssignEcaAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_CREATE_ASSIGN_ECA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AssignECA/GetSingleToCreateAssignECA?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}`,
        tokenConfig()
      );

      dispatch({ type: GET_SINGLE_CREATE_ASSIGN_ECA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_CREATE_ASSIGN_ECA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postAssignEcaAction =
  (eca, idYearFacultyProgramLink, level) => async (dispatch) => {
    try {
      dispatch({ type: POST_ASSIGN_ECA_REQUEST });

      const jsonData = JSON.stringify({
        ddlECA: eca,
        idYearFacultyProgramLink,
        level,
      });

      const { data } = await axiosInstance.post(
        `${API_URL}/api/AssignECA/PostAssignECA`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_ASSIGN_ECA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_ASSIGN_ECA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
