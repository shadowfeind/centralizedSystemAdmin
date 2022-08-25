import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  COUNTER_CONFIG_CREATE_FAIL,
  COUNTER_CONFIG_CREATE_REQUEST,
  COUNTER_CONFIG_CREATE_SUCCESS,
  COUNTER_CONFIG_EDIT_FAIL,
  COUNTER_CONFIG_EDIT_REQUEST,
  COUNTER_CONFIG_EDIT_SUCCESS,
  GET_COUNTER_CONFIG_INITIAL_DATA_FAIL,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_FAIL,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_REQUEST,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_SUCCESS,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_FAIL,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_REQUEST,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_SUCCESS,
  GET_COUNTER_CONFIG_INITIAL_DATA_REQUEST,
  GET_COUNTER_CONFIG_INITIAL_DATA_SUCCESS,
  GET_COUNTER_CONFIG_LIST_FAIL,
  GET_COUNTER_CONFIG_LIST_REQUEST,
  GET_COUNTER_CONFIG_LIST_SUCCESS,
} from "./CounterConfigurationConstants";

export const getCounterConfigInitialDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COUNTER_CONFIG_INITIAL_DATA_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AdmCounter/GetAllCounterConfiguration`,
      tokenConfig()
    );

    dispatch({ type: GET_COUNTER_CONFIG_INITIAL_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COUNTER_CONFIG_INITIAL_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getCounterConfigInitialDataForCreateAction =
  (year, program) => async (dispatch) => {
    try {
      dispatch({ type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AdmCounter/SingleGetToCreateCounterConfiguration?idAcademicYear=${year}&idFacultyProgramLink=${program}`,
        tokenConfig()
      );

      dispatch({
        type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const counterConfigCreateAction =
  (counterConfig) => async (dispatch) => {
    try {
      dispatch({ type: COUNTER_CONFIG_CREATE_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: counterConfig,
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      console.log(jsonData);
      const { data } = await axiosInstance.post(
        `${API_URL}/api/AdmCounter/Post`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: COUNTER_CONFIG_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COUNTER_CONFIG_CREATE_FAIL,
        payload: error.response.data.Message
          ? error.response.data.Message
          : error.message,
      });
    }
  };

export const getCounterConfigListAction =
  (year, program) => async (dispatch) => {
    try {
      dispatch({ type: GET_COUNTER_CONFIG_LIST_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AdmCounter/GetListCounterConfiguration?idAcademicYear=${year}&idFacultyProgramLink=${program}`,
        tokenConfig()
      );

      dispatch({
        type: GET_COUNTER_CONFIG_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_COUNTER_CONFIG_LIST_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getCounterConfigInitialDataForEditAction =
  (id, year, program) => async (dispatch) => {
    try {
      dispatch({ type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/AdmCounter/SingleGetToEditCounterConfiguration/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}`,
        tokenConfig()
      );

      dispatch({
        type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const counterConfigEditAction = (counterConfig) => async (dispatch) => {
  try {
    dispatch({ type: COUNTER_CONFIG_EDIT_REQUEST });

    const jsonData = JSON.stringify({
      dbModel: counterConfig,
    });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axiosInstance.put(
      `${API_URL}/api/AdmCounter/Put`,
      jsonData,
      tokenConfig()
    );

    dispatch({
      type: COUNTER_CONFIG_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNTER_CONFIG_EDIT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
