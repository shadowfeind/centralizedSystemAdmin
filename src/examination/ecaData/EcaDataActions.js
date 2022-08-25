import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_ECA_DATA_FAIL,
  GET_ALL_ECA_DATA_REQUEST,
  GET_ALL_ECA_DATA_SUCCESS,
  GET_BULK_EDIT_ECA_DATA_FAIL,
  GET_BULK_EDIT_ECA_DATA_REQUEST,
  GET_BULK_EDIT_ECA_DATA_SUCCESS,
  GET_LIST_ECA_DATA_FAIL,
  GET_LIST_ECA_DATA_REQUEST,
  GET_LIST_ECA_DATA_SUCCESS,
  POST_BULK_ECA_DATA_FAIL,
  POST_BULK_ECA_DATA_REQUEST,
  POST_BULK_ECA_DATA_SUCCESS,
} from "./EcaDataConstants";

export const getAllEcaDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ECA_DATA_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ECAData/GetAllECAData`,
      tokenConfig()
    );
    dispatch({
      type: GET_ALL_ECA_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ECA_DATA_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getBulkEditEcaDataAction =
  (year, program, classId, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_EDIT_ECA_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ECAData/GetBulkToCreateAssignECAData?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_BULK_EDIT_ECA_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_EDIT_ECA_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getListEcaDataAction =
  (year, program, classId, section, shift, event) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_ECA_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/ECAData/GetListECAData?idAcademicYear=${year}&idFacultyProgramLink=${program}&level=${classId}&section=${section}&idShift=${shift}&idAcademicYearCalendar=${event}&searchKey=1`,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_ECA_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_ECA_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postBulkEditEcaAction =
  (students, search, ecaData) => async (dispatch) => {
    try {
      dispatch({ type: POST_BULK_ECA_DATA_REQUEST });

      console.log("ecaData", ecaData);

      let newEcaData = [...ecaData];
      newEcaData?.forEach((x) => delete x.$id);

      let finalEca = [...newEcaData];

      // console.log("newEcaData", newEcaData);

      const jsonData = JSON.stringify({
        dbModelLst: students,
        searchFilterModel: search,
        ddlAcademicFacultyECASubModel: finalEca,
      });

      const newJson = jsonData;

      console.log("this is the one", newJson);

      await axiosInstance.post(
        `${API_URL}/api/ECAData/PostECAData`,
        newJson,
        tokenConfig()
      );

      dispatch({ type: POST_BULK_ECA_DATA_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_BULK_ECA_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
