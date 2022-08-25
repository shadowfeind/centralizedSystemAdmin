import axios from "axios";
import { API_URL, axiosInstance, tokenConfig, tokenHeader } from "../constants";
import {
  DELETE_LEAVE_REQUESTS_FAIL,
  DELETE_LEAVE_REQUESTS_REQUEST,
  DELETE_LEAVE_REQUESTS_SUCCESS,
  DOWNLOAD_DOC_LEAVE_REQUESTS_FAIL,
  DOWNLOAD_DOC_LEAVE_REQUESTS_REQUEST,
  DOWNLOAD_DOC_LEAVE_REQUESTS_SUCCESS,
  GET_ALL_LEAVE_REQUESTS_FAIL,
  GET_ALL_LEAVE_REQUESTS_REQUEST,
  GET_ALL_LEAVE_REQUESTS_SUCCESS,
  GET_HEADER_BANNER_FAIL,
  GET_HEADER_BANNER_REQUEST,
  GET_HEADER_BANNER_SUCCESS,
  GET_HEADER_CONTENT_FAIL,
  GET_HEADER_CONTENT_REQUEST,
  GET_HEADER_CONTENT_SUCCESS,
  GET_LIST_LEAVE_REQUESTS_FAIL,
  GET_LIST_LEAVE_REQUESTS_REQUEST,
  GET_LIST_LEAVE_REQUESTS_SUCCESS,
  GET_PRINCIPLE_SIGNATURE_FAIL,
  GET_PRINCIPLE_SIGNATURE_REQUEST,
  GET_PRINCIPLE_SIGNATURE_SUCCESS,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_FAIL,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_REQUEST,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_SUCCESS,
  GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_FAIL,
  GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_REQUEST,
  GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_SUCCESS,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_FAIL,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_REQUEST,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_SUCCESS,
  GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_FAIL,
  GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_REQUEST,
  GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_SUCCESS,
  POST_LEAVE_REQUESTS_FAIL,
  POST_LEAVE_REQUESTS_REQUEST,
  POST_LEAVE_REQUESTS_SUCCESS,
  PUT_LEAVE_REQUESTS_FAIL,
  PUT_LEAVE_REQUESTS_REQUEST,
  PUT_LEAVE_REQUESTS_SUCCESS,
  GET_DASHBOARD_TOP_CONTENT_FAIL,
  GET_DASHBOARD_TOP_CONTENT_REQUEST,
  GET_DASHBOARD_TOP_CONTENT_RESET,
  GET_DASHBOARD_TOP_CONTENT_SUCCESS,
} from "./DashboardConstants";

export const getHeaderContentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HEADER_CONTENT_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Home/GetHeaderContent`,
      tokenConfig()
    );

    dispatch({ type: GET_HEADER_CONTENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_HEADER_CONTENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getHeaderBannerAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HEADER_BANNER_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Home/GetHeaderBanner
      `,
      tokenConfig()
    );

    dispatch({ type: GET_HEADER_BANNER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_HEADER_BANNER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getDashboardTopContentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DASHBOARD_TOP_CONTENT_REQUEST });

    const { data: activeTeacher } = await axiosInstance.get(
      `/api/Home/GetTotalActiveStaff
      `,
      tokenConfig()
    );

    const { data: activeStudent } = await axiosInstance.get(
      `/api/Home/GetTotalActiveStudent
      `,
      tokenConfig()
    );

    const { data: activeSubject } = await axiosInstance.get(
      `/api/Home/GetTotalActiveSubject
      `,
      tokenConfig()
    );

    const { data: activeMobileUsers } = await axiosInstance.get(
      `/api/Home/GetTotalNoOfMobileUsers
      `,
      tokenConfig()
    );

    dispatch({
      type: GET_DASHBOARD_TOP_CONTENT_SUCCESS,
      payload: {
        activeTeacher,
        activeStudent,
        activeSubject,
        activeMobileUsers,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_DASHBOARD_TOP_CONTENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getPrincipleSignatureAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRINCIPLE_SIGNATURE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Home/GetPrincipleSignature
      `,
      tokenConfig()
    );

    dispatch({
      type: GET_PRINCIPLE_SIGNATURE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRINCIPLE_SIGNATURE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getAllLeaveRequestAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_LEAVE_REQUESTS_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/LeaveRequest/GetAllLeaveRequest
      `,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_LEAVE_REQUESTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_LEAVE_REQUESTS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListLeaveRequestAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_LEAVE_REQUESTS_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/LeaveRequest/GetListLeaveRequest
      `,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_LEAVE_REQUESTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_LEAVE_REQUESTS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateLeaveRequestAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/LeaveRequest/GetSingleToCreateLeaveRequest
      `,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEditLeaveRequestAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/LeaveRequest/GetSingleToEditLeaveRequest/${id}
      `,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const postLeaveRequestAction =
  (leaveRequestPost, image, SchoolShortName) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_LEAVE_REQUESTS_REQUEST });
      const {
        getHeaderContent: { headerContent },
      } = getState();

      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);

        const { data } = await axiosInstance.post(
          `/api/LeaveRequest/FileUpload`,
          formData,
          tokenConfig()
        );
        if (data) {
          const newData = { ...leaveRequestPost, DocumentName: data };
          const jsonData = JSON.stringify({ dbModel: newData });

          await axiosInstance.post(
            `/api/LeaveRequest/PostLeaveRequest`,
            jsonData,
            tokenConfig()
          );
        }
      } else {
        const newData = { ...leaveRequestPost };
        const jsonData = JSON.stringify({ dbModel: newData });

        await axiosInstance.post(
          `/api/LeaveRequest/PostLeaveRequest`,
          jsonData,
          tokenConfig()
        );
      }

      dispatch({ type: POST_LEAVE_REQUESTS_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_LEAVE_REQUESTS_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
    const { data } = await axiosInstance.get(
      `/api/LeaveRequest/GetFCMToken/${leaveRequestPost.ReceiverID}`,
      tokenConfig()
    );
    if (data) {
      const fcmBody = {
        registration_ids: [data.Message],
        collapse_key: "type_a",
        notification: {
          body: leaveRequestPost.LeaveDecription?.slice(0, 25),
          title: SchoolShortName,
        },
      };
      const fbody = JSON.stringify(fcmBody);

      await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        fbody,
        tokenHeader
      );
    }
  };

export const putApproveRequestAction =
  (leaveRequest, image, SchoolShortName) => async (dispatch) => {
    try {
      dispatch({ type: PUT_LEAVE_REQUESTS_REQUEST });

      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);

        const { data } = await axiosInstance.post(
          `/api/LeaveRequest/FileUpload`,
          formData,
          tokenConfig()
        );
        if (data) {
          const newData = { ...leaveRequest, DocumentName: data };
          const jsonData = JSON.stringify({ dbModel: newData });

          await axiosInstance.put(
            `/api/LeaveRequest/PutLeaveRequest`,
            jsonData,
            tokenConfig()
          );
        }
      } else {
        const newData = { ...leaveRequest };
        const jsonData = JSON.stringify({ dbModel: newData });

        await axiosInstance.put(
          `/api/LeaveRequest/PutLeaveRequest`,
          jsonData,
          tokenConfig()
        );
      }
      dispatch({ type: PUT_LEAVE_REQUESTS_SUCCESS });
    } catch (error) {
      dispatch({
        type: PUT_LEAVE_REQUESTS_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
    const { data } = await axiosInstance.get(
      `/api/LeaveRequest/GetFCMToken/${leaveRequest.SenderID}`,
      tokenConfig()
    );
    if (data) {
      const fcmBody = {
        registration_ids: [data.Message],
        collapse_key: "type_a",
        notification: {
          body: `Your leave request has been ${leaveRequest.Status}`,
          title: SchoolShortName,
        },
      };
      const fbody = JSON.stringify(fcmBody);

      await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        fbody,
        tokenHeader
      );
    }
  };

export const putLeaveRequestAction =
  (leaveRequest, image) => async (dispatch) => {
    try {
      dispatch({ type: PUT_LEAVE_REQUESTS_REQUEST });

      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);

        const { data } = await axiosInstance.post(
          `/api/LeaveRequest/FileUpload`,
          formData,
          tokenConfig()
        );
        if (data) {
          const newData = { ...leaveRequest, DocumentName: data };
          const jsonData = JSON.stringify({ dbModel: newData });

          await axiosInstance.put(
            `/api/LeaveRequest/PutLeaveRequest`,
            jsonData,
            tokenConfig()
          );
        }
      } else {
        const newData = { ...leaveRequest };
        const jsonData = JSON.stringify({ dbModel: newData });

        await axiosInstance.put(
          `/api/LeaveRequest/PutLeaveRequest`,
          jsonData,
          tokenConfig()
        );
      }
      dispatch({ type: PUT_LEAVE_REQUESTS_SUCCESS });
    } catch (error) {
      dispatch({
        type: PUT_LEAVE_REQUESTS_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleDeleteLeaveRequestAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/LeaveRequest/GetSingleToDeleteLeaveRequest/${id}
        `,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const deleteLeaveRequestAction = (leaveRequest) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LEAVE_REQUESTS_REQUEST });

    const jsonData = JSON.stringify({ dbModel: leaveRequest });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axiosInstance.post(
      `/api/LeaveRequest/DeleteLeaveRequest`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: DELETE_LEAVE_REQUESTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_LEAVE_REQUESTS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEditSentLeaveRequestAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/LeaveRequest/GetSingleToEditSentLeaveRequest/${id}
        `,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_EDIT_SENT_LEAVE_REQUESTS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const downloadLeaveRequestAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD_DOC_LEAVE_REQUESTS_REQUEST });

    const File = `${API_URL}/api/LeaveRequest/DownloadDoc/${id}`;

    window.open(File, "_blank");

    dispatch({ type: DOWNLOAD_DOC_LEAVE_REQUESTS_SUCCESS, payload: File });
  } catch (error) {
    dispatch({
      type: DOWNLOAD_DOC_LEAVE_REQUESTS_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
