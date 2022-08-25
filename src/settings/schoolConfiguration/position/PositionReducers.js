import {
  DELETE_POSITION_FAIL,
  DELETE_POSITION_REQUEST,
  DELETE_POSITION_RESET,
  DELETE_POSITION_SUCCESS,
  GET_ALL_POSITION_FAIL,
  GET_ALL_POSITION_REQUEST,
  GET_ALL_POSITION_RESET,
  GET_ALL_POSITION_SUCCESS,
  GET_SINGLE_POSITION_FAIL,
  GET_SINGLE_POSITION_REQUEST,
  GET_SINGLE_POSITION_RESET,
  GET_SINGLE_POSITION_SUCCESS,
  POSITION_CREATE_FAIL,
  POSITION_CREATE_REQUEST,
  POSITION_CREATE_RESET,
  POSITION_CREATE_SUCCESS,
  UPDATE_SINGLE_POSITION_FAIL,
  UPDATE_SINGLE_POSITION_REQUEST,
  UPDATE_SINGLE_POSITION_RESET,
  UPDATE_SINGLE_POSITION_SUCCESS,
} from "./PositionConstatns";

export const getAllPosition = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POSITION_REQUEST:
      return { loading: true };
    case GET_ALL_POSITION_SUCCESS:
      return { loading: false, position: action.payload };
    case GET_ALL_POSITION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_POSITION_RESET:
      return {};
    default:
      return state;
  }
};

export const createPositionReducer = (state = {}, action) => {
  switch (action.type) {
    case POSITION_CREATE_REQUEST:
      return { loading: true };
    case POSITION_CREATE_SUCCESS:
      return { loading: false, position: action.payload, success: true };
    case POSITION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POSITION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSinglePositionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_POSITION_REQUEST:
      return { loading: true };
    case GET_SINGLE_POSITION_SUCCESS:
      return { loading: false, position: action.payload };
    case GET_SINGLE_POSITION_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_POSITION_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSinglePositionReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_POSITION_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_POSITION_SUCCESS:
      return { loading: false, updatedPosition: action.payload, success: true };
    case UPDATE_SINGLE_POSITION_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_POSITION_RESET:
      return {};
    default:
      return state;
  }
};

export const deletePositionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POSITION_REQUEST:
      return { loading: true };
    case DELETE_POSITION_SUCCESS:
      return { loading: false, success: true };
    case DELETE_POSITION_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_POSITION_RESET:
      return {};
    default:
      return state;
  }
};

