import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  DELETE_EMPLOYEE_TYPE_FAIL,
  DELETE_EMPLOYEE_TYPE_REQUEST,
  DELETE_EMPLOYEE_TYPE_SUCCESS,
  EMPLOYEE_TYPE_CREATE_FAIL,
  EMPLOYEE_TYPE_CREATE_REQUEST,
  EMPLOYEE_TYPE_CREATE_SUCCESS,
  GET_ALL_EMPLOYEE_TYPE_FAIL,
  GET_ALL_EMPLOYEE_TYPE_REQUEST,
  GET_ALL_EMPLOYEE_TYPE_SUCCESS,
  GET_SINGLE_EMPLOYEE_TYPE_FAIL,
  GET_SINGLE_EMPLOYEE_TYPE_REQUEST,
  GET_SINGLE_EMPLOYEE_TYPE_SUCCESS,
  UPDATE_SINGLE_EMPLOYEE_TYPE_FAIL,
  UPDATE_SINGLE_EMPLOYEE_TYPE_REQUEST,
  UPDATE_SINGLE_EMPLOYEE_TYPE_SUCCESS,
} from "./EmployeeTypeConstant";

export const getAllEmployeeTypeAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_TYPE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/HREmployeeType/GetHREmployeeType`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_EMPLOYEE_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_TYPE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const employeeTypeCreateAction = (employeeType) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_TYPE_CREATE_REQUEST });

    const jsonData = JSON.stringify({ hrEmployeeTypeModel: employeeType });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axiosInstance.post(
      `${API_URL}/api/HREmployeeType/PostHREmployeeType`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: EMPLOYEE_TYPE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_TYPE_CREATE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEmployeeTypeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EMPLOYEE_TYPE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/HREmployeeType/GetHREmployeeTypeById/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_EMPLOYEE_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_TYPE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSingleEmployeeTypeAction =
  (employeeType) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_EMPLOYEE_TYPE_REQUEST });

      const jsonData = JSON.stringify({ hrEmployeeTypeModel: employeeType });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        `${API_URL}/api/HREmployeeType/PutHREmployeeType`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: UPDATE_SINGLE_EMPLOYEE_TYPE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_EMPLOYEE_TYPE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const deleteEmployeeTypeAction = (employeeType) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EMPLOYEE_TYPE_REQUEST });

    const jsonData = JSON.stringify({ hrEmployeeTypeModel: employeeType });

    await axiosInstance.post(
      `${API_URL}/api/HREmployeeType/DeleteEmployeeType`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: DELETE_EMPLOYEE_TYPE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_TYPE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
