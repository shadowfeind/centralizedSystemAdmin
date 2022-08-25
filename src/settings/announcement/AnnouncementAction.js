import axios from "axios";
import {
  API_URL,
  axiosInstance,
  tokenConfig,
  tokenHeader,
} from "../../constants";
import {
  GET_ALL_ANNOUNCEMENT_REQUEST,
  GET_ALL_ANNOUNCEMENT_SUCCESS,
  GET_ALL_ANNOUNCEMENT_FAIL,
  ANNOUNCEMENT_CREATE_REQUEST,
  ANNOUNCEMENT_CREATE_SUCCESS,
  ANNOUNCEMENT_CREATE_FAIL,
  GET_SINGLE_ANNOUNCEMENT_REQUEST,
  GET_SINGLE_ANNOUNCEMENT_SUCCESS,
  GET_SINGLE_ANNOUNCEMENT_FAIL,
  UPDATE_SINGLE_ANNOUNCEMENT_REQUEST,
  UPDATE_SINGLE_ANNOUNCEMENT_SUCCESS,
  UPDATE_SINGLE_ANNOUNCEMENT_FAIL,
  ANNOUNCEMENT_FCM_REQUEST,
  ANNOUNCEMENT_FCM_SUCCESS,
  ANNOUNCEMENT_FCM_FAIL,
  GET_LIST_ANNOUNCEMENT_REQUEST,
  GET_LIST_ANNOUNCEMENT_SUCCESS,
  GET_LIST_ANNOUNCEMENT_FAIL,
} from "./AnnouncementConstants";

export const getAllAnnouncementAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ANNOUNCEMENT_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/Announcement/GetAllAnnouncement
      `,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ANNOUNCEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ANNOUNCEMENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListAnnouncementAction = (date) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_ANNOUNCEMENT_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/Announcement/GetListAnnouncement?createdDate=${date}`,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_ANNOUNCEMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_ANNOUNCEMENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getFCMForAnnouncementAction = () => async (dispatch) => {
  try {
    dispatch({ type: ANNOUNCEMENT_FCM_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/Announcement/GetSingleCreateAnnouncement`,
      tokenConfig()
    );

    dispatch({ type: ANNOUNCEMENT_FCM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_FCM_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const announcementCreateAction =
  (announcementCreate, fcmTokenList, schoolName) => async (dispatch) => {
    try {
      dispatch({ type: ANNOUNCEMENT_CREATE_REQUEST });

      const jsonData = JSON.stringify({ dbModel: announcementCreate });

      const { data } = await axiosInstance.post(
        `${API_URL}/api/Announcement/Post`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: ANNOUNCEMENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ANNOUNCEMENT_CREATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }

    const fcmBody = {
      registration_ids: fcmTokenList,
      collapse_key: "type_a",
      notification: {
        body: announcementCreate.NewsDescription,
        title: `${schoolName} (${announcementCreate.NewsHeading?.toUpperCase()})`,
      },
    };

    const fbody = JSON.stringify(fcmBody);

    await axios.post("https://fcm.googleapis.com/fcm/send", fbody, tokenHeader);
  };

export const getSingleAnnouncementAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ANNOUNCEMENT_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/Announcement/GetSingleEditAnnouncement/1?searchKey=1`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_ANNOUNCEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ANNOUNCEMENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const updateSingleAnnouncementAction =
  (announcementSingle) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SINGLE_ANNOUNCEMENT_REQUEST });

      const jsonData = JSON.stringify({ dbModel: announcementSingle });

      const { data } = await axiosInstance.put(
        `${API_URL}/api/Announcement/Put`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: UPDATE_SINGLE_ANNOUNCEMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SINGLE_ANNOUNCEMENT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
