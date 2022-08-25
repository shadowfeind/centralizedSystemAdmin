import {
  API_URL,
  axiosInstance,
  tokenConfig,
  tokenHeader,
} from "../../constants";
import {
  GET_ALL_SMS_TEACHER_NOTIFICATION_FAIL,
  GET_ALL_SMS_TEACHER_NOTIFICATION_REQUEST,
  GET_ALL_SMS_TEACHER_NOTIFICATION_SUCCESS,
  GET_LIST_SMS_TEACHER_NOTIFICATION_FAIL,
  GET_LIST_SMS_TEACHER_NOTIFICATION_REQUEST,
  GET_LIST_SMS_TEACHER_NOTIFICATION_SUCCESS,
  GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_FAIL,
  GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_REQUEST,
  GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_SUCCESS,
  POST_SMS_TEACHER_NOTIFICATION_FAIL,
  POST_SMS_TEACHER_NOTIFICATION_REQUEST,
  POST_SMS_TEACHER_NOTIFICATION_SUCCESS,
} from "./SmsTeacherNotificationConstants";

export const getAllSmsTeacherNotificationAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SMS_TEACHER_NOTIFICATION_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/SMSTeacherNotification/GetAllTeacherNotification`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_SMS_TEACHER_NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SMS_TEACHER_NOTIFICATION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListSmsTeacherNotificationAction =
  (date) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_SMS_TEACHER_NOTIFICATION_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/SMSTeacherNotification/GetListTeacherNotification?createdDate=${date}`,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_SMS_TEACHER_NOTIFICATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_SMS_TEACHER_NOTIFICATION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleCreateSmsTeacherNotificationAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/SMSTeacherNotification/GetSingleToCreateTeacherNotification`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_CREATE_SMS_TEACHER_NOTIFICATION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postSmsTeacherNotificationAction =
  (teacherNotification, fcmTokenList, SchoolShortName) => async (dispatch) => {
    try {
      dispatch({ type: POST_SMS_TEACHER_NOTIFICATION_REQUEST });

      // const fcmBody = {
      //   registration_ids: fcmTokenList,
      //   collapse_key: "type_a",
      //   notification: {
      //     body: teacherNotification.MessageHeading,
      //     title: SchoolShortName,
      //   },
      // };

      // const fbody = JSON.stringify(fcmBody);

      // await axios.post(
      //   "https://fcm.googleapis.com/fcm/send",
      //   fbody,
      //   tokenHeader
      // );

      const jsonData = JSON.stringify({ dbModel: teacherNotification });

      console.log(jsonData);

      const { data } = await axiosInstance.post(
        `${API_URL}/api/SMSTeacherNotification/PostTeacherNotification`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_SMS_TEACHER_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_SMS_TEACHER_NOTIFICATION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
