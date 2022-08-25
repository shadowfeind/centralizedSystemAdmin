import {
  GET_ALL_GENERATE_FAIL,
  GET_ALL_GENERATE_PUBLISH_FAIL,
  GET_ALL_GENERATE_PUBLISH_REQUEST,
  GET_ALL_GENERATE_PUBLISH_RESET,
  GET_ALL_GENERATE_PUBLISH_RESULT_FAIL,
  GET_ALL_GENERATE_PUBLISH_RESULT_REQUEST,
  GET_ALL_GENERATE_PUBLISH_RESULT_RESET,
  GET_ALL_GENERATE_PUBLISH_RESULT_SUCCESS,
  GET_ALL_GENERATE_PUBLISH_SUCCESS,
  GET_ALL_GENERATE_REQUEST,
  GET_ALL_GENERATE_RESET,
  GET_ALL_GENERATE_SUCCESS,
} from "./GeneratePublishResultConstants";

export const getAllGeneratePublishReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_GENERATE_PUBLISH_REQUEST:
      return { loading: true };
    case GET_ALL_GENERATE_PUBLISH_SUCCESS:
      return { loading: false, allGeneratePublish: action.payload };
    case GET_ALL_GENERATE_PUBLISH_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_GENERATE_PUBLISH_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllGenerateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_GENERATE_REQUEST:
      return { loading: true };
    case GET_ALL_GENERATE_SUCCESS:
      return { loading: false, allGenerate: action.payload };
    case GET_ALL_GENERATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_GENERATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllGeneratePublishResultReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_GENERATE_PUBLISH_RESULT_REQUEST:
      return { loading: true };
    case GET_ALL_GENERATE_PUBLISH_RESULT_SUCCESS:
      return { loading: false, allGeneratePublishResult: action.payload };
    case GET_ALL_GENERATE_PUBLISH_RESULT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_GENERATE_PUBLISH_RESULT_RESET:
      return {};
    default:
      return state;
  }
};
