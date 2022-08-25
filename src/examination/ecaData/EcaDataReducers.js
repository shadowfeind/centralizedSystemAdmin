import {
  GET_ALL_ECA_DATA_FAIL,
  GET_ALL_ECA_DATA_REQUEST,
  GET_ALL_ECA_DATA_RESET,
  GET_ALL_ECA_DATA_SUCCESS,
  GET_BULK_EDIT_ECA_DATA_FAIL,
  GET_BULK_EDIT_ECA_DATA_REQUEST,
  GET_BULK_EDIT_ECA_DATA_RESET,
  GET_BULK_EDIT_ECA_DATA_SUCCESS,
  GET_LIST_ECA_DATA_FAIL,
  GET_LIST_ECA_DATA_REQUEST,
  GET_LIST_ECA_DATA_RESET,
  GET_LIST_ECA_DATA_SUCCESS,
  POST_BULK_ECA_DATA_FAIL,
  POST_BULK_ECA_DATA_REQUEST,
  POST_BULK_ECA_DATA_RESET,
  POST_BULK_ECA_DATA_SUCCESS,
} from "./EcaDataConstants";

export const getAllEcaDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ECA_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_ECA_DATA_SUCCESS:
      return { loading: false, allEcaData: action.payload };
    case GET_ALL_ECA_DATA_FAIL:
      return { loading: false, error: action.payload };
      case GET_ALL_ECA_DATA_RESET:
          return{};
    default:
      return state;
  }
};

export const getBulkEditEcaDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BULK_EDIT_ECA_DATA_REQUEST:
      return { loading: true };
    case GET_BULK_EDIT_ECA_DATA_SUCCESS:
      return { loading: false, bulkEditData: action.payload };
    case GET_BULK_EDIT_ECA_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_BULK_EDIT_ECA_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getListEcaDataReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_LIST_ECA_DATA_REQUEST:
        return { loading: true };
      case GET_LIST_ECA_DATA_SUCCESS:
        return { loading: false, listEcaData: action.payload };
      case GET_LIST_ECA_DATA_FAIL:
        return { loading: false, error: action.payload };
      case GET_LIST_ECA_DATA_RESET:
        return {};
      default:
        return state;
    }
  };

  export const postBulkEditEcaDataReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_BULK_ECA_DATA_REQUEST:
        return { loading: true };
      case POST_BULK_ECA_DATA_SUCCESS:
        return { loading: false, success: true };
      case POST_BULK_ECA_DATA_FAIL:
        return { loading: false, error: action.payload };
      case POST_BULK_ECA_DATA_RESET:
        return {};
      default:
        return state;
    }
  };
  
  
