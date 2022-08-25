import {
  GET_ALL_ECA_LOOK_UP_FAIL,
  GET_ALL_ECA_LOOK_UP_REQUEST,
  GET_ALL_ECA_LOOK_UP_RESET,
  GET_ALL_ECA_LOOK_UP_SUCCESS,
  GET_DETAIL_ECA_LOOK_UP_FAIL,
  GET_DETAIL_ECA_LOOK_UP_REQUEST,
  GET_DETAIL_ECA_LOOK_UP_RESET,
  GET_DETAIL_ECA_LOOK_UP_SUCCESS,
  GET_LIST_ECA_LOOK_UP_FAIL,
  GET_LIST_ECA_LOOK_UP_REQUEST,
  GET_LIST_ECA_LOOK_UP_RESET,
  GET_LIST_ECA_LOOK_UP_SUCCESS,
  GET_SINGLE_CREATE_ECA_LOOK_UP_FAIL,
  GET_SINGLE_CREATE_ECA_LOOK_UP_REQUEST,
  GET_SINGLE_CREATE_ECA_LOOK_UP_RESET,
  GET_SINGLE_CREATE_ECA_LOOK_UP_SUCCESS,
  GET_SINGLE_EDIT_ECA_LOOK_UP_FAIL,
  GET_SINGLE_EDIT_ECA_LOOK_UP_REQUEST,
  GET_SINGLE_EDIT_ECA_LOOK_UP_RESET,
  GET_SINGLE_EDIT_ECA_LOOK_UP_SUCCESS,
  POST_ECA_LOOK_UP_FAIL,
  POST_ECA_LOOK_UP_REQUEST,
  POST_ECA_LOOK_UP_RESET,
  POST_ECA_LOOK_UP_SUCCESS,
  PUT_ECA_LOOK_UP_FAIL,
  PUT_ECA_LOOK_UP_REQUEST,
  PUT_ECA_LOOK_UP_RESET,
  PUT_ECA_LOOK_UP_SUCCESS,
} from "./EcaLookUpConstants";

export const getAllEcaLookUpReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ECA_LOOK_UP_REQUEST:
      return { loading: true };
    case GET_ALL_ECA_LOOK_UP_SUCCESS:
      return { loading: false, allEcaLookUp: action.payload };
    case GET_ALL_ECA_LOOK_UP_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ECA_LOOK_UP_RESET:
      return {};
    default:
      return state;
  }
};

export const getListEcaLookUpReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_ECA_LOOK_UP_REQUEST:
      return { loading: true };
    case GET_LIST_ECA_LOOK_UP_SUCCESS:
      return { loading: false, listEcaLookUp: action.payload };
    case GET_LIST_ECA_LOOK_UP_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_ECA_LOOK_UP_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditEcaLookUpReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EDIT_ECA_LOOK_UP_REQUEST:
      return { loading: true };
    case GET_SINGLE_EDIT_ECA_LOOK_UP_SUCCESS:
      return { loading: false, singleEditEcaLookUp: action.payload };
    case GET_SINGLE_EDIT_ECA_LOOK_UP_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_EDIT_ECA_LOOK_UP_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleCreateEcaLookUpReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_CREATE_ECA_LOOK_UP_REQUEST:
      return { loading: true };
    case GET_SINGLE_CREATE_ECA_LOOK_UP_SUCCESS:
      return { loading: false, singleCreateEcaLookUp: action.payload };
    case GET_SINGLE_CREATE_ECA_LOOK_UP_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_CREATE_ECA_LOOK_UP_RESET:
      return {};
    default:
      return state;
  }
};

export const getDetailEcaLookUpReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_DETAIL_ECA_LOOK_UP_REQUEST:
        return { loading: true };
      case GET_DETAIL_ECA_LOOK_UP_SUCCESS:
        return { loading: false, detailEcaLookUp: action.payload };
      case GET_DETAIL_ECA_LOOK_UP_FAIL:
        return { loading: false, error: action.payload };
      case GET_DETAIL_ECA_LOOK_UP_RESET:
        return {};
      default:
        return state;
    }
  };
  


export const postEcaLookUpReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_ECA_LOOK_UP_REQUEST:
        return { loading: true };
      case POST_ECA_LOOK_UP_SUCCESS:
        return { loading: false, success: true };
      case POST_ECA_LOOK_UP_FAIL:
        return { loading: false, error: action.payload };
      case POST_ECA_LOOK_UP_RESET:
        return {};
      default:
        return state;
    }
  };

  export const putEcaLookUpReducer = (state = {}, action) => {
    switch (action.type) {
      case PUT_ECA_LOOK_UP_REQUEST:
        return { loading: true };
      case PUT_ECA_LOOK_UP_SUCCESS:
        return { loading: false, success: true };
      case PUT_ECA_LOOK_UP_FAIL:
        return { loading: false, error: action.payload };
      case PUT_ECA_LOOK_UP_RESET:
        return {};
      default:
        return state;
    }
  };