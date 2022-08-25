import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_HOLIDAY_FAIL,
  GET_ALL_HOLIDAY_REQUEST,
  GET_ALL_HOLIDAY_SUCCESS,
  GET_SINGLE_HOLIDAY_FAIL,
  GET_SINGLE_HOLIDAY_REQUEST,
  GET_SINGLE_HOLIDAY_SUCCESS,
  HOLIDAY_CREATE_FAIL,
  HOLIDAY_CREATE_REQUEST,
  HOLIDAY_CREATE_SUCCESS,
  UPDATE_SINGLE_HOLIDAY_FAIL,
  UPDATE_SINGLE_HOLIDAY_REQUEST,
  UPDATE_SINGLE_HOLIDAY_SUCCESS,
} from "./HolidayConstants";

export const getAllHolidayAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HOLIDAY_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/Att_HRHoliday/GetAtt_HRHoliday`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_HOLIDAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_HOLIDAY_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const holidayCreateAction = (holiday) => async (dispatch) => {
  try {
    dispatch({ type: HOLIDAY_CREATE_REQUEST });

    const jsonData = JSON.stringify({ hrHolidayModel: holiday });

    const { data } = await axiosInstance.post(
      `${API_URL}/api/Att_HRHoliday/PostAtt_HRHoliday`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: HOLIDAY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HOLIDAY_CREATE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleHolidayAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_HOLIDAY_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/Att_HRHoliday/GetAtt_HRHolidayById/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_HOLIDAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_HOLIDAY_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSingleHoliadyAction = (holiday) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_HOLIDAY_REQUEST });

    const jsonData = JSON.stringify({ hrHolidayModel: holiday });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axiosInstance.put(
      `${API_URL}/api/Att_HRHoliday/PutAtt_HRHoliday`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: UPDATE_SINGLE_HOLIDAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_HOLIDAY_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
