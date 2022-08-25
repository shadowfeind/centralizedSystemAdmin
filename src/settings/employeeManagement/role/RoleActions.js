import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  DELETE_ROLE_FAIL,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  GET_ALL_ROLE_FAIL,
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_SUCCESS,
  GET_SINGLE_ROLE_FAIL,
  GET_SINGLE_ROLE_REQUEST,
  GET_SINGLE_ROLE_SUCCESS,
  ROLE_CREATE_FAIL,
  ROLE_CREATE_REQUEST,
  ROLE_CREATE_SUCCESS,
  UPDATE_SINGLE_ROLE_FAIL,
  UPDATE_SINGLE_ROLE_REQUEST,
  UPDATE_SINGLE_ROLE_SUCCESS,
} from "./RoleConstant";

export const getAllRolesAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ROLE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/HRRole/GetHRRole`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ROLE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const roleCreateAction = (role) => async (dispatch) => {
  try {
    dispatch({ type: ROLE_CREATE_REQUEST });

    const jsonData = JSON.stringify({ hrRoleModel: role });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axiosInstance.post(
      `${API_URL}/api/HRRole/PostHRPosition`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: ROLE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ROLE_CREATE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleRoleAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ROLE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/HRRole/GetHRRoleById/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ROLE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSingleRoleAction = (role) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_ROLE_REQUEST });

    const jsonData = JSON.stringify({ hrRoleModel: role });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axiosInstance.put(
      `${API_URL}/api/HRRole/PutHRPosition`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: UPDATE_SINGLE_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_ROLE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const deleteRoleAction = (role) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROLE_REQUEST });

    const jsonData = JSON.stringify({ hrRoleModel: role });

    await axiosInstance.post(
      `${API_URL}/api/HRRole/DeleteHRPosition`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: DELETE_ROLE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_ROLE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
