import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_HR_VALUE_FAIL,
  GET_ALL_HR_VALUE_REQUEST,
  GET_ALL_HR_VALUE_SUCCESS,
  GET_LIST_HR_VALUE_FAIL,
  GET_LIST_HR_VALUE_REQUEST,
  GET_LIST_HR_VALUE_SUCCESS,
  GET_SINGLE_TO_CREATE_HR_VALUE_FAIL,
  GET_SINGLE_TO_CREATE_HR_VALUE_REQUEST,
  GET_SINGLE_TO_CREATE_HR_VALUE_SUCCESS,
  GET_SINGLE_TO_EDIT_HR_VALUE_FAIL,
  GET_SINGLE_TO_EDIT_HR_VALUE_REQUEST,
  GET_SINGLE_TO_EDIT_HR_VALUE_SUCCESS,
  POST_HR_VALUE_FAIL,
  POST_HR_VALUE_REQUEST,
  POST_HR_VALUE_SUCCESS,
  PUT_HR_VALUE_FAIL,
  PUT_HR_VALUE_REQUEST,
  PUT_HR_VALUE_SUCCESS,
} from "./HrValueConstants";

export const getALLHrValueAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HR_VALUE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/HRValue/GetAllHRValue`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_HR_VALUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_HR_VALUE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListHrValueAction = (company) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_HR_VALUE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/HRValue/GetListHRValue?company=${company}&searchKey=1`,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_HR_VALUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_HR_VALUE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateHrValueAction = (company) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_CREATE_HR_VALUE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/HRValue/GetSingleToCreateHRValue?company=${company}&searchKey=1`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_TO_CREATE_HR_VALUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_CREATE_HR_VALUE_FAIL,
      payload: error.response.data.Message
        ? error.response.data.Message
        : error.message,
    });
  }
};

export const getSingleEditHrValueAction = (id, company) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_EDIT_HR_VALUE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/HRValue/GetSingleToEditHRValue/${id}?company=${company}&searchKey=1`,
      tokenConfig()
    );

    dispatch({ type: GET_SINGLE_TO_EDIT_HR_VALUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_EDIT_HR_VALUE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const postCreateHrValueAction =
  (dbData, image, image1, image2) => async (dispatch) => {
    try {
      dispatch({ type: POST_HR_VALUE_REQUEST });
      let headerBanner;
      let schoolLookup;
      let principleSignature;

      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);

        const { data: headerBannerData } = await axiosInstance.post(
          `${API_URL}/api/HRValue/FileUploadHeaderBanner
        `,
          formData,
          tokenConfig()
        );
        headerBanner = headerBannerData || "";
      }

      if (image1) {
        let formData1 = new FormData();
        formData1.append("ImageUploaded1", image1);

        const { data: schoolLookupData } = await axiosInstance.post(
          `${API_URL}/api/HRValue/FileUploadSchoolLogo
        `,
          formData1,
          tokenConfig()
        );
        schoolLookup = schoolLookupData || "";
      }

      if (image2) {
        let formData2 = new FormData();
        formData2.append("ImageUploaded2", image2);

        const { data: principleSignatureData } = await axiosInstance.post(
          `${API_URL}/api/HRValue/FileUploadPrincipleSignature
        `,
          formData2,
          tokenConfig()
        );

        principleSignature = principleSignatureData || "";
      }

      if ((headerBanner, schoolLookup, principleSignature)) {
        const newData = {
          ...dbData,
          HeaderBanner: headerBanner,
          SchoolLogo: schoolLookup,
          PrincipleSignature: principleSignature,
        };

        const jsonData = JSON.stringify({ dbModel: newData });
        console.log("with image", jsonData);
        await axiosInstance.post(
          `${API_URL}/api/HRValue/PostHRValue`,
          jsonData,
          tokenConfig()
        );
      } else {
        const jsonData = JSON.stringify({ dbModel: dbData });
        console.log("without image", jsonData);
        await axiosInstance.post(
          `${API_URL}/api/HRValue/PostHRValue`,
          jsonData,
          tokenConfig()
        );
      }
      dispatch({
        type: POST_HR_VALUE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: POST_HR_VALUE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const putEditHrValueAction =
  (dbData, image, image1, image2) => async (dispatch) => {
    try {
      dispatch({ type: PUT_HR_VALUE_REQUEST });

      let headerBanner;
      let schoolLookup;
      let principleSignature;

      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);

        const { data: headerBannerData } = await axiosInstance.post(
          `${API_URL}/api/HRValue/FileUploadHeaderBanner
        `,
          formData,
          tokenConfig()
        );

        headerBanner = headerBannerData;
      }

      if (image1) {
        let formData1 = new FormData();
        formData1.append("ImageUploaded1", image1);

        const { data: schoolLookupData } = await axiosInstance.post(
          `${API_URL}/api/HRValue/FileUploadSchoolLogo
        `,
          formData1,
          tokenConfig()
        );
        schoolLookup = schoolLookupData;
      }

      if (image2) {
        let formData2 = new FormData();
        formData2.append("ImageUploaded2", image2);

        const { data: principleSignatureData } = await axiosInstance.post(
          `${API_URL}/api/HRValue/FileUploadPrincipleSignature
        `,
          formData2,
          tokenConfig()
        );

        principleSignature = principleSignatureData;
      }

      let newData = {
        ...dbData,
      };
      if (headerBanner) {
        newData.HeaderBanner = headerBanner;
      }
      if (schoolLookup) {
        newData.SchoolLogo = schoolLookup;
      }
      if (principleSignature) {
        newData.PrincipleSignature = principleSignature;
      }

      const jsonData = JSON.stringify({ dbModel: newData });
      console.log(jsonData);
      await axiosInstance.put(
        `${API_URL}/api/HRValue/PutHRValue`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: PUT_HR_VALUE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PUT_HR_VALUE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
