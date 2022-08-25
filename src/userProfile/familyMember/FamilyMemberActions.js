import axios from "axios";
import { API_URL,tokenConfig } from "../../constants";
import {
  CREATE_SINGLE_FAMILYMEMBER_FAIL,
  CREATE_SINGLE_FAMILYMEMBER_REQUEST,
  CREATE_SINGLE_FAMILYMEMBER_SUCCESS,
  FAMILYMEMBER_CREATE_FAIL,
  FAMILYMEMBER_CREATE_REQUEST,
  FAMILYMEMBER_CREATE_SUCCESS,
  GET_ALL_FAMILYMEMBER_CREATE_FAIL,
  GET_ALL_FAMILYMEMBER_CREATE_REQUEST,
  GET_ALL_FAMILYMEMBER_CREATE_SUCCESS,
  GET_ALL_FAMILYMEMBER_FAIL,
  GET_ALL_FAMILYMEMBER_REQUEST,
  GET_ALL_FAMILYMEMBER_SUCCESS,
  GET_FAMILY_MEMBER_LIST_FAIL,
  GET_FAMILY_MEMBER_LIST_REQUEST,
  GET_FAMILY_MEMBER_LIST_SUCCESS,
  GET_SINGLE_FAMILYMEMBER_FAIL,
  GET_SINGLE_FAMILYMEMBER_REQUEST,
  GET_SINGLE_FAMILYMEMBER_SUCCESS,
  UPDATE_SINGLE_FAMILYMEMBER_FAIL,
  UPDATE_SINGLE_FAMILYMEMBER_REQUEST,
  UPDATE_SINGLE_FAMILYMEMBER_SUCCESS,
} from "./FamilyMemberConstants";

export const getAllFamilyMemberAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FAMILYMEMBER_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_FamilyMember/GetAllPIDFamilyMember`,tokenConfig
    );

    dispatch({ type: GET_ALL_FAMILYMEMBER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_FAMILYMEMBER_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getAllFamilyMemberCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FAMILYMEMBER_CREATE_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_FamilyMember/GetSingleCreatePIDFamilyMember`,
      tokenConfig
    );

    dispatch({ type: GET_ALL_FAMILYMEMBER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_FAMILYMEMBER_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const updateSingleFamilyMemberAction = (familyMember) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_FAMILYMEMBER_REQUEST });

    const jsonData = JSON.stringify({ dbModel: familyMember });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.put(
      `${API_URL}/api/PID_FamilyMember/Put`,
      jsonData,
      tokenConfig
    );

    dispatch({ type: UPDATE_SINGLE_FAMILYMEMBER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_FAMILYMEMBER_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getSingleFamilyMemberAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_FAMILYMEMBER_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_FamilyMember/GetSingleEditPIDFamilyMember/${id}
        `,tokenConfig
    );

    dispatch({ type: GET_SINGLE_FAMILYMEMBER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_FAMILYMEMBER_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const familyMemberCreateAction = (familyMemberCreate) => async (dispatch) => {
  try {
    dispatch({ type: FAMILYMEMBER_CREATE_REQUEST });

    const jsonData = JSON.stringify({ dbModel: familyMemberCreate });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.post(
      `${API_URL}/api/PID_FamilyMember/Post`,
      jsonData,
      tokenConfig
    );
    // console.log(jsonData);

    dispatch({ type: FAMILYMEMBER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FAMILYMEMBER_CREATE_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};

export const getListFamilyMemberAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_FAMILY_MEMBER_LIST_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/PID_FamilyMember/GetListPIDFamilyMember/${id}
        `,tokenConfig
    );

    dispatch({ type: GET_FAMILY_MEMBER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAMILY_MEMBER_LIST_FAIL,
      payload: error.message ? error.message : error.Message,
    });
  }
};