import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_SCHOOL_SETTINGS_FAIL,
  GET_ALL_SCHOOL_SETTINGS_REQUEST,
  GET_ALL_SCHOOL_SETTINGS_SUCCESS,
  GET_SINGLE_SCHOOL_SETTINGS_FAIL,
  GET_SINGLE_SCHOOL_SETTINGS_REQUEST,
  GET_SINGLE_SCHOOL_SETTINGS_SUCCESS,
  SCHOOL_SETTINGS_CREATE_FAIL,
  SCHOOL_SETTINGS_CREATE_REQUEST,
  SCHOOL_SETTINGS_CREATE_SUCCESS,
  UPDATE_SINGLE_SCHOOL_SETTINGS_FAIL,
  UPDATE_SINGLE_SCHOOL_SETTINGS_REQUEST,
  UPDATE_SINGLE_SCHOOL_SETTINGS_SUCCESS,
} from "./SchoolSettingsConstants";

export const getAllSchoolSettingsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SCHOOL_SETTINGS_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ReactHRCompany/GetHRCompany`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_SCHOOL_SETTINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SCHOOL_SETTINGS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const schoolSettingCreateAction = (position) => async (dispatch) => {
  try {
    dispatch({ type: SCHOOL_SETTINGS_CREATE_REQUEST });

    const jsonData = JSON.stringify({ dbModel: position });

    const { data } = await axiosInstance.post(
      `${API_URL}/api/ReactHRCompany/PostHRCompany`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: SCHOOL_SETTINGS_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SCHOOL_SETTINGS_CREATE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleSchoolSettingAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_SCHOOL_SETTINGS_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ReactHRCompany/GetHRCompany/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_SCHOOL_SETTINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_SCHOOL_SETTINGS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSingleScholSettingAction =
  (position) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_SCHOOL_SETTINGS_REQUEST });

      const jsonData = JSON.stringify({ dbModel: position });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        `${API_URL}/api/ReactHRCompany/PutHRCompany`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: UPDATE_SINGLE_SCHOOL_SETTINGS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_SCHOOL_SETTINGS_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
