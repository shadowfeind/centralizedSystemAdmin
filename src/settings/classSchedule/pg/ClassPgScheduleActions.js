import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_PG_CLASS_SCHEDULE_FAIL,
  GET_ALL_PG_CLASS_SCHEDULE_REQUEST,
  GET_ALL_PG_CLASS_SCHEDULE_SUCCESS,
  GET_EDIT_CLASS_SCHEDULE_FAIL,
  GET_EDIT_CLASS_SCHEDULE_REQUEST,
  GET_EDIT_CLASS_SCHEDULE_SUCCESS,
  GET_LIST_CLASS_SCHEDULE_FAIL,
  GET_LIST_CLASS_SCHEDULE_REQUEST,
  GET_LIST_CLASS_SCHEDULE_SUCCESS,
  PUT_CLASS_SCHEDULE_FAIL,
  PUT_CLASS_SCHEDULE_REQUEST,
  PUT_CLASS_SCHEDULE_SUCCESS,
} from "./ClassPgScheduleConstants";

export const getAllPgClassScheuleAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PG_CLASS_SCHEDULE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ClassSchedulePG/GetAllClassSchedulePG`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_PG_CLASS_SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PG_CLASS_SCHEDULE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListClassScheuleAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_CLASS_SCHEDULE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ClassSchedulePG/GetListClassSchedulePG/${id}?searchKey=1`,
      tokenConfig()
    );

    dispatch({
      type: GET_LIST_CLASS_SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_CLASS_SCHEDULE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getEditClassScheuleAction = (id, company) => async (dispatch) => {
  try {
    dispatch({ type: GET_EDIT_CLASS_SCHEDULE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/ClassSchedulePG/GetSingleEditClassSchedulePG/${id}?company=${company}&searchKey=1`,
      tokenConfig()
    );

    dispatch({
      type: GET_EDIT_CLASS_SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EDIT_CLASS_SCHEDULE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const putClassScheduleAction =
  (schedule, image, searchFilterModel) => async (dispatch) => {
    try {
      dispatch({ type: PUT_CLASS_SCHEDULE_REQUEST });

      let formData = new FormData();
      formData.append("ImageUploaded", image);

      const { data } = await axiosInstance.post(
        `${API_URL}/api/ClassSchedulePG/FileUpload`,
        formData,
        tokenConfig()
      );

      if (data) {
        const newData = { ...schedule, DocumentName: data };
        const jsonData = JSON.stringify({
          dbModel: newData,
          searchFilterModel,
        });
        console.log(jsonData);

        await axiosInstance.put(
          `${API_URL}/api/ClassSchedulePG/PutClassSchedulePG`,
          jsonData,
          tokenConfig()
        );
      }

      dispatch({
        type: PUT_CLASS_SCHEDULE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PUT_CLASS_SCHEDULE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
