import {
  POST_BULK_LEVEL_TEST_DATA_FAIL,
  POST_BULK_LEVEL_TEST_DATA_REQUEST,
  POST_BULK_LEVEL_TEST_DATA_RESET,
  POST_BULK_LEVEL_TEST_DATA_SUCCESS,
  GET_BULK_LEVEL_TEST_DATA_FAIL,
  GET_BULK_LEVEL_TEST_DATA_REQUEST,
  GET_BULK_LEVEL_TEST_DATA_RESET,
  GET_BULK_LEVEL_TEST_DATA_SUCCESS,
  GET_INITIAL_LEVEL_TEST_DATA_FAIL,
  GET_INITIAL_LEVEL_TEST_DATA_REQUEST,
  GET_INITIAL_LEVEL_TEST_DATA_SUCCESS,
} from "./LevelTestConstants";

export const getInitialLevelTestDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INITIAL_LEVEL_TEST_DATA_REQUEST:
      return { loading: true };
    case GET_INITIAL_LEVEL_TEST_DATA_SUCCESS:
      return { loading: false, levelTestInitialDatas: action.payload };
    case GET_INITIAL_LEVEL_TEST_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBulkLevelTestDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BULK_LEVEL_TEST_DATA_REQUEST:
      return { loading: true };
    case GET_BULK_LEVEL_TEST_DATA_SUCCESS:
      return { loading: false, bulkDatas: action.payload };
    case GET_BULK_LEVEL_TEST_DATA_FAIL:
      return { loading: false, error: action.payload };
    case GET_BULK_LEVEL_TEST_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const postBulkLevelTestDataReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_BULK_LEVEL_TEST_DATA_REQUEST:
      return { loading: true };
    case POST_BULK_LEVEL_TEST_DATA_SUCCESS:
      return { loading: false, success: true };
    case POST_BULK_LEVEL_TEST_DATA_FAIL:
      return { loading: false, error: action.payload };
    case POST_BULK_LEVEL_TEST_DATA_RESET:
      return {};
    default:
      return state;
  }
};
