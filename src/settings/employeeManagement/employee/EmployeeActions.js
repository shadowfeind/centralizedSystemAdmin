import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  GET_ALL_EMPLOYEE_CREATE_FAIL,
  GET_ALL_EMPLOYEE_CREATE_REQUEST,
  GET_ALL_EMPLOYEE_CREATE_SUCCESS,
  GET_ALL_EMPLOYEE_FAIL,
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_FAIL,
  GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_REQUEST,
  GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_SUCCESS,
  GET_SINGLE_EMPLOYEE_FAIL,
  GET_SINGLE_EMPLOYEE_REQUEST,
  GET_SINGLE_EMPLOYEE_SUCCESS,
  RESETPASSWORD_FOR_SINGLE_EMPLOYEE_FAIL,
  RESETPASSWORD_FOR_SINGLE_EMPLOYEE_REQUEST,
  RESETPASSWORD_FOR_SINGLE_EMPLOYEE_SUCCESS,
  UPDATE_SINGLE_EMPLOYEE_FAIL,
  UPDATE_SINGLE_EMPLOYEE_REQUEST,
  UPDATE_SINGLE_EMPLOYEE_SUCCESS,
} from "./EmployeeConstants";

export const getAllEmployeeAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/HREmployee/GetHREmployee`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getAllEmployeeCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_CREATE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/HREmployee/GetToCreateHREmployee?company=0&idBranch=0&idDepartment=0&idFilterUser=0&searchKey=0`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_EMPLOYEE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_CREATE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const employeeCreateAction = (employee) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_CREATE_REQUEST });

    const jsonData = JSON.stringify({ hrEmployeeModel: employee });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axiosInstance.post(
      `${API_URL}/api/HREmployee/PostHREmployee`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: EMPLOYEE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_CREATE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEmployeeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EMPLOYEE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/HREmployee/GetHREmployeeById/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EMPLOYEE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSingleEmployeeAction = (employee) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_EMPLOYEE_REQUEST });

    const jsonData = JSON.stringify({ hrEmployeeModel: employee });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axiosInstance.put(
      `${API_URL}/api/HREmployee/PutHRPosition`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: UPDATE_SINGLE_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_EMPLOYEE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEmployeePasswordresetDataAction =
  (id, company, branch, department) => async (dispatch) => {
    try {
      dispatch({ type: GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/GetResetPassword/${company}/${branch}/${department}/0/0/reset?id=${id}`,
        tokenConfig()
      );

      dispatch({
        type: GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_RESETPASSWORD_DATA_SINGLE_EMPLOYEE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const resetSingleEmployeePasswordAction =
  (employee) => async (dispatch) => {
    try {
      dispatch({ type: RESETPASSWORD_FOR_SINGLE_EMPLOYEE_REQUEST });

      const jsonData = JSON.stringify({ hrEmployeeModel: employee });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        `${API_URL}/api/HREmployee/PutResetPassword`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: RESETPASSWORD_FOR_SINGLE_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESETPASSWORD_FOR_SINGLE_EMPLOYEE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
