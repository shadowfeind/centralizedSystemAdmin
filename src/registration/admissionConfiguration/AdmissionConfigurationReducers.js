import {
  CREATE_SINGLE_ADMISSION_CONFIG_FAIL,
  CREATE_SINGLE_ADMISSION_CONFIG_REQUEST,
  CREATE_SINGLE_ADMISSION_CONFIG_RESET,
  CREATE_SINGLE_ADMISSION_CONFIG_SUCCESS,
  GET_ADMISSION_CONFIG_INITIAL_DATA_FAIL,
  GET_ADMISSION_CONFIG_INITIAL_DATA_REQUEST,
  GET_ADMISSION_CONFIG_INITIAL_DATA_RESET,
  GET_ADMISSION_CONFIG_INITIAL_DATA_SUCCESS,
  GET_ADMISSION_CONFIG_LIST_DATA_FAIL,
  GET_ADMISSION_CONFIG_LIST_DATA_REQUEST,
  GET_ADMISSION_CONFIG_LIST_DATA_RESET,
  GET_ADMISSION_CONFIG_LIST_DATA_SUCCESS,
  GET_CREATE_SINGLE_ADMISSION_CONFIG_FAIL,
  GET_CREATE_SINGLE_ADMISSION_CONFIG_REQUEST,
  GET_CREATE_SINGLE_ADMISSION_CONFIG_RESET,
  GET_CREATE_SINGLE_ADMISSION_CONFIG_SUCCESS,
  GET_SINGLE_ADMISSION_CONFIG_FAIL,
  GET_SINGLE_ADMISSION_CONFIG_REQUEST,
  GET_SINGLE_ADMISSION_CONFIG_RESET,
  GET_SINGLE_ADMISSION_CONFIG_SUCCESS,
  UPDATE_SINGLE_ADMISSION_CONFIG_FAIL,
  UPDATE_SINGLE_ADMISSION_CONFIG_REQUEST,
  UPDATE_SINGLE_ADMISSION_CONFIG_RESET,
  UPDATE_SINGLE_ADMISSION_CONFIG_SUCCESS,
} from "./AdmissionConfigurationConstants";

export const getAdmissionConfigInitialDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ADMISSION_CONFIG_INITIAL_DATA_REQUEST:
      return { loading: true };
    case GET_ADMISSION_CONFIG_INITIAL_DATA_SUCCESS:
      return { loading: false, getAdmissionConfigInitialData: action.payload };
    case GET_ADMISSION_CONFIG_INITIAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_ADMISSION_CONFIG_INITIAL_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getAdmissionConfigListDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ADMISSION_CONFIG_LIST_DATA_REQUEST:
      return { loading: true };
    case GET_ADMISSION_CONFIG_LIST_DATA_SUCCESS:
      return { loading: false, getAdmissionConfigListData: action.payload };
    case GET_ADMISSION_CONFIG_LIST_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_ADMISSION_CONFIG_LIST_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleAdmissionConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ADMISSION_CONFIG_REQUEST:
      return { loading: true };
    case GET_SINGLE_ADMISSION_CONFIG_SUCCESS:
      return { loading: false, singleAdmissionConfig: action.payload };
    case GET_SINGLE_ADMISSION_CONFIG_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_ADMISSION_CONFIG_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleAdmissionConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ADMISSION_CONFIG_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_ADMISSION_CONFIG_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_SINGLE_ADMISSION_CONFIG_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_ADMISSION_CONFIG_RESET:
      return {};
    default:
      return state;
  }
};

export const getCreateSingleAdmissionConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CREATE_SINGLE_ADMISSION_CONFIG_REQUEST:
      return { loading: true };
    case GET_CREATE_SINGLE_ADMISSION_CONFIG_SUCCESS:
      return {
        loading: false,
        createSingleAdmissionConfigData: action.payload,
      };
    case GET_CREATE_SINGLE_ADMISSION_CONFIG_FAIL:
      return { loading: false, error: action.payload };
    case GET_CREATE_SINGLE_ADMISSION_CONFIG_RESET:
      return {};
    default:
      return state;
  }
};

export const createSingleAdmissionConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SINGLE_ADMISSION_CONFIG_REQUEST:
      return { loading: true };
    case CREATE_SINGLE_ADMISSION_CONFIG_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_SINGLE_ADMISSION_CONFIG_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_SINGLE_ADMISSION_CONFIG_RESET:
      return {};
    default:
      return state;
  }
};
