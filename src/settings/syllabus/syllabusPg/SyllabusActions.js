
import { API_URL, axiosInstance, tokenConfig } from "../../../constants";
import {
  GET_ALL_SYLLABUS_FAIL,
  GET_ALL_SYLLABUS_REQUEST,
  GET_ALL_SYLLABUS_SUCCESS,
  GET_LIST_SYLLABUS_FAIL,
  GET_LIST_SYLLABUS_REQUEST,
  GET_LIST_SYLLABUS_SUCCESS,
  GET_SINGLE_TO_EDIT_SYLLABUS_FAIL,
  GET_SINGLE_TO_EDIT_SYLLABUS_REQUEST,
  GET_SINGLE_TO_EDIT_SYLLABUS_SUCCESS,
  GET_SUBJECT_SYLLABUS_FAIL,
  GET_SUBJECT_SYLLABUS_REQUEST,
  GET_SUBJECT_SYLLABUS_SUCCESS,
  PUT_SYLLABUS_FAIL,
  PUT_SYLLABUS_REQUEST,
  PUT_SYLLABUS_SUCCESS,
} from "./SyllabusConstants";

export const getAllSyllabusAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SYLLABUS_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/Syllabuse/GetAllSyllabus`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_SYLLABUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SYLLABUS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getListSyllabusAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_SYLLABUS_REQUEST});

    const { data } = await axiosInstance.get(
      `${API_URL}/api/Syllabuse/GetListSyllabus/${id}?searchKey=1`,
      tokenConfig()
    );

    dispatch({
      type: GET_LIST_SYLLABUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_SYLLABUS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleEditAction = (id, company) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_EDIT_SYLLABUS_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/Syllabuse/GetSingleEditSyllabus/${id}?company=${company}&searchKey=1`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_EDIT_SYLLABUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_EDIT_SYLLABUS_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const putSyllabusAction =
  (singleToEditSyllabus, image) => async (dispatch) => {
    try {
      dispatch({ type: PUT_SYLLABUS_REQUEST });

      let formData = new FormData();
      formData.append("ImageUploaded", image);

      const { data } = await axiosInstance.post(
        `${API_URL}/api/Syllabuse/FileUpload`,
        formData,
        tokenConfig()
      );

      if (data) {
        const newData = { ...singleToEditSyllabus, DocumentName: data };
        const jsonData = JSON.stringify({
          dbModel: newData,
        });
        console.log(jsonData);

        await axiosInstance.put(
          `${API_URL}/api/Syllabuse/PutSyllabus`,
          jsonData,
          tokenConfig()
        );
      }

      dispatch({
        type: PUT_SYLLABUS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PUT_SYLLABUS_FAIL,
        payload: error.message ? error.message : error.Message,
      });
    }
  };
