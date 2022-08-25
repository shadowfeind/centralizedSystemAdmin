import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_BULK_LEVEL_TEST_DATA_FAIL,
  GET_BULK_LEVEL_TEST_DATA_REQUEST,
  GET_BULK_LEVEL_TEST_DATA_SUCCESS,
  GET_INITIAL_LEVEL_TEST_DATA_FAIL,
  GET_INITIAL_LEVEL_TEST_DATA_REQUEST,
  GET_INITIAL_LEVEL_TEST_DATA_SUCCESS,
  POST_BULK_LEVEL_TEST_DATA_FAIL,
  POST_BULK_LEVEL_TEST_DATA_REQUEST,
  POST_BULK_LEVEL_TEST_DATA_SUCCESS,
} from "./LevelTestConstants";

export const getInitialLevelTestDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INITIAL_LEVEL_TEST_DATA_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/LevelTest/GetAllLevelTest
        `,
      tokenConfig()
    );

    dispatch({
      type: GET_INITIAL_LEVEL_TEST_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INITIAL_LEVEL_TEST_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getBulkLevelTestDataAction =
  (year, program, classId, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_LEVEL_TEST_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/LevelTest/GetBulkLevelTest?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_BULK_LEVEL_TEST_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_LEVEL_TEST_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postBulkLevelTestAction =
  (students, search) => async (dispatch) => {
    try {
      dispatch({ type: POST_BULK_LEVEL_TEST_DATA_REQUEST });

      const jsonData = JSON.stringify({
        dbModelLst: students,
        searchFilterModel: search,
      });

      console.log(jsonData);

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      await axiosInstance.post(
        `${API_URL}/api/LevelTest/PostLevelTest`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_BULK_LEVEL_TEST_DATA_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_BULK_LEVEL_TEST_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
