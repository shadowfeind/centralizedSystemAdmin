import {
  API_URL,
  axiosInstance,
  tokenConfig,
  tokenHeader,
} from "../../constants";
import {
  GET_NOTIFICATION_EMPLOYEELIST_SEARCH_FAIL,
  GET_NOTIFICATION_EMPLOYEELIST_SEARCH_REQUEST,
  GET_NOTIFICATION_EMPLOYEELIST_SEARCH_SUCCESS,
  GET_NOTIFICATION_FCM_TOKEN_FAIL,
  GET_NOTIFICATION_FCM_TOKEN_REQUEST,
  GET_NOTIFICATION_FCM_TOKEN_SUCCESS,
  POST_NOTIFICATION_FCM_TOKEN_FAIL,
  POST_NOTIFICATION_FCM_TOKEN_REQUEST,
  POST_NOTIFICATION_FCM_TOKEN_SUCCESS,
} from "./IndividualNotificationConstants";

export const getNotificationEmployeeListAction =
  (employee) => async (dispatch) => {
    try {
      dispatch({ type: GET_NOTIFICATION_EMPLOYEELIST_SEARCH_REQUEST });

      const { data } = await axiosInstance.post(
        `${API_URL}/api/IndividualNotification/GetEmployeeList?searchkey=${employee}`,
        {},
        tokenConfig()
      );

      dispatch({
        type: GET_NOTIFICATION_EMPLOYEELIST_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_NOTIFICATION_EMPLOYEELIST_SEARCH_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getFcmTokenNotificationAction = (employee) => async (dispatch) => {
  try {
    dispatch({ type: GET_NOTIFICATION_FCM_TOKEN_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/IndividualNotification/GetIndividualFCMToken?idHREmployee=${employee}`,
      tokenConfig()
    );

    dispatch({
      type: GET_NOTIFICATION_FCM_TOKEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_NOTIFICATION_FCM_TOKEN_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const postFcmAction =
  (announcementCreate, fcmTokenList, schoolName) => async (dispatch) => {
    try {
      dispatch({ type: POST_NOTIFICATION_FCM_TOKEN_REQUEST });

      const fcmBody = {
        registration_ids: fcmTokenList,
        collapse_key: "type_a",
        notification: {
          body: announcementCreate.NewsHeading,
          title: schoolName,
        },
      };

      const fbody = JSON.stringify(fcmBody);

      await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        fbody,
        tokenHeader
      );

      dispatch({ type: POST_NOTIFICATION_FCM_TOKEN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_NOTIFICATION_FCM_TOKEN_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
