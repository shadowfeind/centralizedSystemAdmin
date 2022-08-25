import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  ACADEMIC_YEAR_CREATE_FAIL,
  ACADEMIC_YEAR_CREATE_REQUEST,
  ACADEMIC_YEAR_CREATE_SUCCESS,
  GET_ACADEMIC_YEAR_CHECK_FAIL,
  GET_ACADEMIC_YEAR_CHECK_REQUEST,
  GET_ACADEMIC_YEAR_CHECK_SUCCESS,
  GET_ACADEMIC_YEAR_OPTION_FAIL,
  GET_ACADEMIC_YEAR_OPTION_REQUEST,
  GET_ACADEMIC_YEAR_OPTION_SUCCESS,
  GET_ALL_ACADEMIC_YEAR_FAIL,
  GET_ALL_ACADEMIC_YEAR_REQUEST,
  GET_ALL_ACADEMIC_YEAR_SUCCESS,
  GET_SINGLE_ACADEMIC_YEAR_FAIL,
  GET_SINGLE_ACADEMIC_YEAR_REQUEST,
  GET_SINGLE_ACADEMIC_YEAR_SUCCESS,
  UPDATE_SINGLE_ACADEMIC_YEAR_FAIL,
  UPDATE_SINGLE_ACADEMIC_YEAR_REQUEST,
  UPDATE_SINGLE_ACADEMIC_YEAR_SUCCESS,
} from "./AcademicYearConstant";

export const getAllAcademicYearAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACADEMIC_YEAR_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicYear/GetAcademicYear`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ACADEMIC_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACADEMIC_YEAR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const AcademicYearCreateAction =
  (academicYear, checkboxState) => async (dispatch) => {
    try {
      dispatch({ type: ACADEMIC_YEAR_CREATE_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: academicYear,
        postedChekboxLst: { CheckBoxListID: checkboxState },
      });

      console.log(jsonData);
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.post(
        `${API_URL}/api/AcademicYear/PostYear`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: ACADEMIC_YEAR_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACADEMIC_YEAR_CREATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getAcademicYearOptionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ACADEMIC_YEAR_OPTION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicYear/GetToCreateAcademicYear`,
      tokenConfig()
    );

    dispatch({ type: GET_ACADEMIC_YEAR_OPTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ACADEMIC_YEAR_OPTION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getAcademicYearCheckAction = (yearName) => async (dispatch) => {
  try {
    dispatch({ type: GET_ACADEMIC_YEAR_CHECK_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicYear/CheckAcademicYear?academicYearname=${yearName}`,
      tokenConfig()
    );

    dispatch({ type: GET_ACADEMIC_YEAR_CHECK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ACADEMIC_YEAR_CHECK_FAIL,
      payload: error.response.data.Message
        ? error.response.data.Message
        : error.message,
    });
  }
};

export const getSingleAcademicYearAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ACADEMIC_YEAR_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/AcademicYear/GetAcademicYearById/${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_ACADEMIC_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ACADEMIC_YEAR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

//no put api
export const updateSingleAcademicYearAction =
  (academicYear) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ACADEMIC_YEAR_REQUEST });

      const jsonData = JSON.stringify({ dbModel: academicYear });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await axiosInstance.put(
        `${API_URL}/api/AcademicYear/PutAcademicYear`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: UPDATE_SINGLE_ACADEMIC_YEAR_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ACADEMIC_YEAR_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
