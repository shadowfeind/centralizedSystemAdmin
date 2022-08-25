import {
  COUNTER_CONFIG_CREATE_FAIL,
  COUNTER_CONFIG_CREATE_REQUEST,
  COUNTER_CONFIG_CREATE_RESET,
  COUNTER_CONFIG_CREATE_SUCCESS,
  GET_COUNTER_CONFIG_INITIAL_DATA_FAIL,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_FAIL,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_REQUEST,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_RESET,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_SUCCESS,
  GET_COUNTER_CONFIG_INITIAL_DATA_REQUEST,
  GET_COUNTER_CONFIG_INITIAL_DATA_RESET,
  GET_COUNTER_CONFIG_INITIAL_DATA_SUCCESS,
  GET_COUNTER_CONFIG_LIST_REQUEST,
  GET_COUNTER_CONFIG_LIST_SUCCESS,
  GET_COUNTER_CONFIG_LIST_FAIL,
  GET_COUNTER_CONFIG_LIST_RESET,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_REQUEST,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_SUCCESS,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_FAIL,
  GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_RESET,
  COUNTER_CONFIG_EDIT_REQUEST,
  COUNTER_CONFIG_EDIT_SUCCESS,
  COUNTER_CONFIG_EDIT_FAIL,
  COUNTER_CONFIG_EDIT_RESET,
} from "./CounterConfigurationConstants";

export const getCounterConfigInitialDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COUNTER_CONFIG_INITIAL_DATA_REQUEST:
      return { loading: true };
    case GET_COUNTER_CONFIG_INITIAL_DATA_SUCCESS:
      return { loading: false, getAcademicConfigInitialData: action.payload };
    case GET_COUNTER_CONFIG_INITIAL_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_COUNTER_CONFIG_INITIAL_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const getCounterConfigInitialDataForCreateReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_REQUEST:
      return { loading: true };
    case GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_SUCCESS:
      return {
        loading: false,
        getAcademicConfigInitialDataForCreate: action.payload,
      };
    case GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_COUNTER_CONFIG_INITIAL_DATA_FOR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const counterConfigCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COUNTER_CONFIG_CREATE_REQUEST:
      return { loading: true };
    case COUNTER_CONFIG_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case COUNTER_CONFIG_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COUNTER_CONFIG_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getCounterConfigListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COUNTER_CONFIG_LIST_REQUEST:
      return { loading: true };
    case GET_COUNTER_CONFIG_LIST_SUCCESS:
      return {
        loading: false,
        counterConfigList: action.payload,
      };
    case GET_COUNTER_CONFIG_LIST_FAIL:
      return { loading: false, error: action.payload };
    case GET_COUNTER_CONFIG_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const getCounterConfigInitialDataForEditReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_REQUEST:
      return { loading: true };
    case GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_SUCCESS:
      return {
        loading: false,
        getAcademicConfigInitialDataForEdit: action.payload,
      };
    case GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case GET_COUNTER_CONFIG_INITIAL_DATA_FOR_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const CounterConfigEditReducer = (state = {}, action) => {
  switch (action.type) {
    case COUNTER_CONFIG_EDIT_REQUEST:
      return { loading: true };
    case COUNTER_CONFIG_EDIT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case COUNTER_CONFIG_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case COUNTER_CONFIG_EDIT_RESET:
      return {};
    default:
      return state;
  }
};
