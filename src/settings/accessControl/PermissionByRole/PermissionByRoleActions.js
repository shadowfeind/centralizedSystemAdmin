import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_INITIAL_ROLE_FOR_PERMISSION_FAIL,
  GET_INITIAL_ROLE_FOR_PERMISSION_REQUEST,
  GET_INITIAL_ROLE_FOR_PERMISSION_SUCCESS,
  GET_LIST_PERMISSION_BY_ROLE_FAIL,
  GET_LIST_PERMISSION_BY_ROLE_REQUEST,
  GET_LIST_PERMISSION_BY_ROLE_SUCCESS,
} from "./PermissionByRoleConstants";

export const getInitialRoleForPermissionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INITIAL_ROLE_FOR_PERMISSION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/PermissionByRole/GetAllPermissionByRole`,
      tokenConfig()
    );

    dispatch({
      type: GET_INITIAL_ROLE_FOR_PERMISSION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INITIAL_ROLE_FOR_PERMISSION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListPermissionByRoleAction =
  (companyId, id) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_PERMISSION_BY_ROLE_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/PermissionByRole/GetListPermissionByRole?/${companyId}/${id}`,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_PERMISSION_BY_ROLE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_PERMISSION_BY_ROLE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
