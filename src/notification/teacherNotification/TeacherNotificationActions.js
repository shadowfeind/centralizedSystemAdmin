import axios from "axios";
import {
  API_URL,
  axiosInstance,
  tokenConfig,
  tokenHeader,
} from "../../constants";
import {
  GET_ALL_TEACHER_NOTIFICATION_FAIL,
  GET_ALL_TEACHER_NOTIFICATION_REQUEST,
  GET_ALL_TEACHER_NOTIFICATION_SUCCESS,
  GET_LIST_TEACHER_NOTIFICATION_FAIL,
  GET_LIST_TEACHER_NOTIFICATION_REQUEST,
  GET_LIST_TEACHER_NOTIFICATION_SUCCESS,
  GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_FAIL,
  GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_REQUEST,
  GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_SUCCESS,
  POST_TEACHER_NOTIFICATION_FAIL,
  POST_TEACHER_NOTIFICATION_REQUEST,
  POST_TEACHER_NOTIFICATION_SUCCESS,
} from "./TeacherNotificationConstants";

export const getAllTeacherNotificationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TEACHER_NOTIFICATION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/TeacherNotification/GetAllTeacherNotification`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_TEACHER_NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TEACHER_NOTIFICATION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListTeacherNotificationAction = (date) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_TEACHER_NOTIFICATION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/TeacherNotification/GetListTeacherNotification?createdDate=${date}`,
      tokenConfig()
    );

    dispatch({
      type: GET_LIST_TEACHER_NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_TEACHER_NOTIFICATION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateTeacherNotificationAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/TeacherNotification/GetSingleToCreateTeacherNotification`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_CREATE_TEACHER_NOTIFICATION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postTeacherNotificationAction =
  (teacherNotification, fcmTokenList, SchoolShortName) => async (dispatch) => {
    try {
      dispatch({ type: POST_TEACHER_NOTIFICATION_REQUEST });

      const jsonData = JSON.stringify({ dbModel: teacherNotification });

      const { data } = await axiosInstance.post(
        `${API_URL}/api/TeacherNotification/PostTeacherNotification`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_TEACHER_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_TEACHER_NOTIFICATION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
    const fcmBody = {
      registration_ids: fcmTokenList,
      collapse_key: "type_a",
      notification: {
        body: teacherNotification.MessageDescription,
        title: `${SchoolShortName} (${teacherNotification.MessageHeading})`,
      },
    };

    const fbody = JSON.stringify(fcmBody);

    await axios.post("https://fcm.googleapis.com/fcm/send", fbody, tokenHeader);
  };
