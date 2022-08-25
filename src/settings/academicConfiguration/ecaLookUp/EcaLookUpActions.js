import { API_URL, axiosInstance, tokenConfig } from "../../../constants";

import {
  GET_ALL_ECA_LOOK_UP_FAIL,
  GET_ALL_ECA_LOOK_UP_REQUEST,
  GET_ALL_ECA_LOOK_UP_SUCCESS,
  GET_DETAIL_ECA_LOOK_UP_FAIL,
  GET_DETAIL_ECA_LOOK_UP_REQUEST,
  GET_DETAIL_ECA_LOOK_UP_SUCCESS,
  GET_LIST_ECA_LOOK_UP_FAIL,
  GET_LIST_ECA_LOOK_UP_REQUEST,
  GET_LIST_ECA_LOOK_UP_SUCCESS,
  GET_SINGLE_CREATE_ECA_LOOK_UP_FAIL,
  GET_SINGLE_CREATE_ECA_LOOK_UP_REQUEST,
  GET_SINGLE_CREATE_ECA_LOOK_UP_SUCCESS,
  GET_SINGLE_EDIT_ECA_LOOK_UP_FAIL,
  GET_SINGLE_EDIT_ECA_LOOK_UP_REQUEST,
  GET_SINGLE_EDIT_ECA_LOOK_UP_SUCCESS,
  POST_ECA_LOOK_UP_FAIL,
  POST_ECA_LOOK_UP_REQUEST,
  POST_ECA_LOOK_UP_SUCCESS,
  PUT_ECA_LOOK_UP_FAIL,
  PUT_ECA_LOOK_UP_REQUEST,
  PUT_ECA_LOOK_UP_SUCCESS,
} from "./EcaLookUpConstants";

export const getAllEcaLookUpAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ECA_LOOK_UP_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ECA/GetAllECA`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ECA_LOOK_UP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ECA_LOOK_UP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListEcaLookUpAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_ECA_LOOK_UP_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ECA/GetListECA?company=2`,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_ECA_LOOK_UP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_ECA_LOOK_UP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEditEcaLookUpAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EDIT_ECA_LOOK_UP_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ECA/GetSingleToEditECA/${id}?company=2`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_EDIT_ECA_LOOK_UP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EDIT_ECA_LOOK_UP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateEcaLookUpAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CREATE_ECA_LOOK_UP_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ECA/GetSingleToCreateECA?company=2`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_CREATE_ECA_LOOK_UP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CREATE_ECA_LOOK_UP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getDetailEcaLookUpAction = (company) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL_ECA_LOOK_UP_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ECA/GetSingleDetialECA?company=${company}`,
      tokenConfig()
    );

    dispatch({ type: GET_DETAIL_ECA_LOOK_UP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_DETAIL_ECA_LOOK_UP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const putEcaLookUpAction = (eca) => async (dispatch) => {
  try {
    dispatch({ type: PUT_ECA_LOOK_UP_REQUEST });

    const jsonData = JSON.stringify({
      dbModel: eca,
    });

    const { data } = await axiosInstance.put(
      `${API_URL}/api/ECA/PutECA`,
      jsonData,
      tokenConfig()
    );

    dispatch({
      type: PUT_ECA_LOOK_UP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PUT_ECA_LOOK_UP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const postEcaLookUpAction = (eca) => async (dispatch) => {
  try {
    dispatch({ type: POST_ECA_LOOK_UP_REQUEST });

    const jsonData = JSON.stringify({
      dbModel: eca,
    });

    const { data } = await axiosInstance.post(
      `${API_URL}/api/ECA/PostECA`,
      jsonData,
      tokenConfig()
    );

    dispatch({
      type: POST_ECA_LOOK_UP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_ECA_LOOK_UP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
