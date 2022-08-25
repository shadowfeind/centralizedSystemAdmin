import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_MOBILE_USER_FAIL,
  GET_ALL_MOBILE_USER_REQUEST,
  GET_ALL_MOBILE_USER_SUCCESS,
  GET_LIST_MOBILE_USER_FAIL,
  GET_LIST_MOBILE_USER_REQUEST,
  GET_LIST_MOBILE_USER_SUCCESS,
  GET_SINGLE_EDIT_MOBILE_USER_FAIL,
  GET_SINGLE_EDIT_MOBILE_USER_REQUEST,
  GET_SINGLE_EDIT_MOBILE_USER_SUCCESS,
  PUT_MOBILE_USER_FAIL,
  PUT_MOBILE_USER_REQUEST,
  PUT_MOBILE_USER_SUCCESS,
} from "./MobileUsersConstants";

export const getAllMobileUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_MOBILE_USER_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/FCMTokenUser/GetAllFCMTokenUser`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_MOBILE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_MOBILE_USER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListMobileUserAction = (company) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_MOBILE_USER_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/FCMTokenUser/GetListFCMTokenUser`,
      tokenConfig()
    );

    dispatch({
      type: GET_LIST_MOBILE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_MOBILE_USER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEditMobileUserAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EDIT_MOBILE_USER_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/FCMTokenUser/GetSingleToEditFCMTokenUser/${id}`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_EDIT_MOBILE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EDIT_MOBILE_USER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const putMobileUserAction = (mobileUser) => async (dispatch) => {
  try {
    dispatch({ type: PUT_MOBILE_USER_REQUEST });

    const jsonData = JSON.stringify({ dbModel: mobileUser });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axiosInstance.put(
      `${API_URL}/api/FCMTokenUser/Put`,
      jsonData,
      tokenConfig()
    );

    dispatch({
      type: PUT_MOBILE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PUT_MOBILE_USER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
