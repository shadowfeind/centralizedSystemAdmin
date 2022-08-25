import {
  GET_ALL_ASSIGN_ECA_FAIL,
  GET_ALL_ASSIGN_ECA_REQUEST,
  GET_ALL_ASSIGN_ECA_RESET,
  GET_ALL_ASSIGN_ECA_SUCCESS,
  GET_LIST_ASSIGN_ECA_FAIL,
  GET_LIST_ASSIGN_ECA_REQUEST,
  GET_LIST_ASSIGN_ECA_RESET,
  GET_LIST_ASSIGN_ECA_SUCCESS,
  GET_SINGLE_CREATE_ASSIGN_ECA_FAIL,
  GET_SINGLE_CREATE_ASSIGN_ECA_REQUEST,
  GET_SINGLE_CREATE_ASSIGN_ECA_RESET,
  GET_SINGLE_CREATE_ASSIGN_ECA_SUCCESS,
  POST_ASSIGN_ECA_FAIL,
  POST_ASSIGN_ECA_REQUEST,
  POST_ASSIGN_ECA_RESET,
  POST_ASSIGN_ECA_SUCCESS,
} from "./AssignEcaConstants";

export const getAllAssignEcaReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ASSIGN_ECA_REQUEST:
      return { loading: true };
    case GET_ALL_ASSIGN_ECA_SUCCESS:
      return { loading: false, allAssignEca: action.payload };
    case GET_ALL_ASSIGN_ECA_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ASSIGN_ECA_RESET:
      return {};
    default:
      return state;
  }
};

export const getListAssignEcaReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_LIST_ASSIGN_ECA_REQUEST:
        return { loading: true };
      case GET_LIST_ASSIGN_ECA_SUCCESS:
        return { loading: false, listAssignEca: action.payload };
      case GET_LIST_ASSIGN_ECA_FAIL:
        return { loading: false, error: action.payload };
      case GET_LIST_ASSIGN_ECA_RESET:
        return {};
      default:
        return state;
    }
  };

  export const getSingleCreateAssignEcaReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SINGLE_CREATE_ASSIGN_ECA_REQUEST:
        return { loading: true };
      case GET_SINGLE_CREATE_ASSIGN_ECA_SUCCESS:
        return { loading: false, singleCreateAssignEca: action.payload };
      case GET_SINGLE_CREATE_ASSIGN_ECA_FAIL:
        return { loading: false, error: action.payload };
      case GET_SINGLE_CREATE_ASSIGN_ECA_RESET:
        return {};
      default:
        return state;
    }
  };

  export const postAssignEcaReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_ASSIGN_ECA_REQUEST:
        return { loading: true };
      case POST_ASSIGN_ECA_SUCCESS:
        return { loading: false, success: true };
      case POST_ASSIGN_ECA_FAIL:
        return { loading: false, error: action.payload };
      case POST_ASSIGN_ECA_RESET:
        return {};
      default:
        return state;
    }
  };
