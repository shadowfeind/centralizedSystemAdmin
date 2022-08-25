import axios from "axios";
import {
  API_URL,
  axiosInstance,
  tokenConfig,
  tokenHeader,
} from "../../constants";
import {
  GET_ALL_SMS_ANNOUNCEMENT_FAIL,
  GET_ALL_SMS_ANNOUNCEMENT_REQUEST,
  GET_ALL_SMS_ANNOUNCEMENT_SUCCESS,
  GET_LIST_SMS_ANNOUNCEMENT_FAIL,
  GET_LIST_SMS_ANNOUNCEMENT_REQUEST,
  GET_LIST_SMS_ANNOUNCEMENT_SUCCESS,
  GET_SINGLE_SMS_ANNOUNCEMENT_FAIL,
  GET_SINGLE_SMS_ANNOUNCEMENT_REQUEST,
  GET_SINGLE_SMS_ANNOUNCEMENT_SUCCESS,
  SMS_ANNOUNCEMENT_CREATE_FAIL,
  SMS_ANNOUNCEMENT_CREATE_REQUEST,
  SMS_ANNOUNCEMENT_CREATE_SUCCESS,
  SMS_ANNOUNCEMENT_FCM_FAIL,
  SMS_ANNOUNCEMENT_FCM_REQUEST,
  SMS_ANNOUNCEMENT_FCM_SUCCESS,
  UPDATE_SINGLE_SMS_ANNOUNCEMENT_FAIL,
  UPDATE_SINGLE_SMS_ANNOUNCEMENT_REQUEST,
  UPDATE_SINGLE_SMS_ANNOUNCEMENT_SUCCESS,
} from "./SmsAllNotificationConstants";

export const getAllSmsAnnouncementAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SMS_ANNOUNCEMENT_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/SMSAllNotification/GetAllAnnouncement
        `,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_SMS_ANNOUNCEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SMS_ANNOUNCEMENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListSmsAnnouncementAction = (date) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_SMS_ANNOUNCEMENT_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/SMSAllNotification/GetListAnnouncement?createdDate=${date}`,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_SMS_ANNOUNCEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_SMS_ANNOUNCEMENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getFCMForSmsAnnouncementAction = () => async (dispatch) => {
  try {
    dispatch({ type: SMS_ANNOUNCEMENT_FCM_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/SMSAllNotification/GetSingleCreateAnnouncement`,
      tokenConfig()
    );

    dispatch({ type: SMS_ANNOUNCEMENT_FCM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SMS_ANNOUNCEMENT_FCM_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const announcementSmsCreateAction =
  (announcementCreate, fcmTokenList, schoolName) => async (dispatch) => {
    try {
      dispatch({ type: SMS_ANNOUNCEMENT_CREATE_REQUEST });

      // const fcmBody = {
      //   registration_ids: fcmTokenList,
      //   collapse_key: "type_a",
      //   notification: {
      //     body: announcementCreate.NewsHeading,
      //     title: schoolName,
      //   },
      // };

      // const fbody = JSON.stringify(fcmBody);

      // await axios.post(
      //   "https://fcm.googleapis.com/fcm/send",
      //   fbody,
      //   tokenHeader
      // );

      const jsonData = JSON.stringify({ dbModel: announcementCreate });

      const { data } = await axiosInstance.post(
        `${API_URL}/api/SMSAllNotification/Post`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: SMS_ANNOUNCEMENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SMS_ANNOUNCEMENT_CREATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleSmsAnnouncementAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_SMS_ANNOUNCEMENT_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/SMSAllNotification/GetSingleEditAnnouncement/1?searchKey=1`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_SMS_ANNOUNCEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_SMS_ANNOUNCEMENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSingleSmsAnnouncementAction =
  (announcementSingle) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_SMS_ANNOUNCEMENT_REQUEST });

      const jsonData = JSON.stringify({ dbModel: announcementSingle });

      const { data } = await axiosInstance.put(
        `${API_URL}/api/SMSAllNotification/Put`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: UPDATE_SINGLE_SMS_ANNOUNCEMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_SMS_ANNOUNCEMENT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
