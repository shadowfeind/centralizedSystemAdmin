import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  CREATE_SINGLE_ADMISSION_CONFIG_FAIL,
  CREATE_SINGLE_ADMISSION_CONFIG_REQUEST,
  CREATE_SINGLE_ADMISSION_CONFIG_SUCCESS,
  GET_ADMISSION_CONFIG_INITIAL_DATA_FAIL,
  GET_ADMISSION_CONFIG_INITIAL_DATA_REQUEST,
  GET_ADMISSION_CONFIG_INITIAL_DATA_SUCCESS,
  GET_ADMISSION_CONFIG_LIST_DATA_FAIL,
  GET_ADMISSION_CONFIG_LIST_DATA_REQUEST,
  GET_ADMISSION_CONFIG_LIST_DATA_SUCCESS,
  GET_CREATE_SINGLE_ADMISSION_CONFIG_FAIL,
  GET_CREATE_SINGLE_ADMISSION_CONFIG_REQUEST,
  GET_CREATE_SINGLE_ADMISSION_CONFIG_SUCCESS,
  GET_SINGLE_ADMISSION_CONFIG_FAIL,
  GET_SINGLE_ADMISSION_CONFIG_REQUEST,
  GET_SINGLE_ADMISSION_CONFIG_SUCCESS,
  UPDATE_SINGLE_ADMISSION_CONFIG_FAIL,
  UPDATE_SINGLE_ADMISSION_CONFIG_REQUEST,
  UPDATE_SINGLE_ADMISSION_CONFIG_SUCCESS,
} from "./AdmissionConfigurationConstants";

export const getAdmissionConfigInitialDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMISSION_CONFIG_INITIAL_DATA_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AdmFacultyConfiguration/GetAllAdmFacultyConfiguration`,
      tokenConfig()
    );

    dispatch({
      type: GET_ADMISSION_CONFIG_INITIAL_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMISSION_CONFIG_INITIAL_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getAdmissionConfigListDataAction =
  (year, program) => async (dispatch) => {
    try {
      dispatch({ type: GET_ADMISSION_CONFIG_LIST_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AdmFacultyConfiguration/GetListAdmFacultyConfiguration?idAcademicYear=${year}&idFacultyProgramLink=${program}`,
        tokenConfig()
      );

      dispatch({
        type: GET_ADMISSION_CONFIG_LIST_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ADMISSION_CONFIG_LIST_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleAdmissionConfigAction =
  (id, year, program) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_ADMISSION_CONFIG_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AdmFacultyConfiguration/SingleGetToEditAdmFacultyConfiguration/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_ADMISSION_CONFIG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_ADMISSION_CONFIG_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const updateSingleAdmissionConfigAction =
  (admConfig) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ADMISSION_CONFIG_REQUEST });
      const jsonData = JSON.stringify({ dbModel: admConfig });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        `${API_URL}/api/AdmFacultyConfiguration/Put?actionType=0`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: UPDATE_SINGLE_ADMISSION_CONFIG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ADMISSION_CONFIG_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getCreateSingleAdmissionConfigAction =
  (year, program) => async (dispatch) => {
    try {
      dispatch({ type: GET_CREATE_SINGLE_ADMISSION_CONFIG_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AdmFacultyConfiguration/SingleGetToCreateAdmFacultyConfiguration?idAcademicYear=${year}&idFacultyProgramLink=${program}`,
        tokenConfig()
      );

      dispatch({
        type: GET_CREATE_SINGLE_ADMISSION_CONFIG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CREATE_SINGLE_ADMISSION_CONFIG_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const createSingleAdmissionConfigAction =
  (admConfig) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SINGLE_ADMISSION_CONFIG_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: admConfig,
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.post(
        `${API_URL}/api/AdmFacultyConfiguration/Post`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: CREATE_SINGLE_ADMISSION_CONFIG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_SINGLE_ADMISSION_CONFIG_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
