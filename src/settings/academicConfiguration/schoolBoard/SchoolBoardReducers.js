import {
  GET_ALL_SCHOOL_BOARD_FAIL,
  GET_ALL_SCHOOL_BOARD_REQUEST,
  GET_ALL_SCHOOL_BOARD_RESET,
  GET_ALL_SCHOOL_BOARD_SUCCESS,
  GET_SINGLE_SCHOOL_BOARD_FAIL,
  GET_SINGLE_SCHOOL_BOARD_REQUEST,
  GET_SINGLE_SCHOOL_BOARD_RESET,
  GET_SINGLE_SCHOOL_BOARD_SUCCESS,
  SCHOOL_BOARD_CREATE_FAIL,
  SCHOOL_BOARD_CREATE_REQUEST,
  SCHOOL_BOARD_CREATE_RESET,
  SCHOOL_BOARD_CREATE_SUCCESS,
  UPDATE_SINGLE_SCHOOL_BOARD_FAIL,
  UPDATE_SINGLE_SCHOOL_BOARD_REQUEST,
  UPDATE_SINGLE_SCHOOL_BOARD_RESET,
  UPDATE_SINGLE_SCHOOL_BOARD_SUCCESS,
} from "./SchoolBoardConstants";

export const getAllSchoolBoard = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SCHOOL_BOARD_REQUEST:
      return { loading: true };
    case GET_ALL_SCHOOL_BOARD_SUCCESS:
      return { loading: false, schoolBoard: action.payload };
    case GET_ALL_SCHOOL_BOARD_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_SCHOOL_BOARD_RESET:
      return {};
    default:
      return state;
  }
};

export const createSchoolBoardReducer = (state = {}, action) => {
  switch (action.type) {
    case SCHOOL_BOARD_CREATE_REQUEST:
      return { loading: true };
    case SCHOOL_BOARD_CREATE_SUCCESS:
      return { loading: false, schoolBoard: action.payload, success: true };
    case SCHOOL_BOARD_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SCHOOL_BOARD_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleSchoolBoardReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_SCHOOL_BOARD_REQUEST:
      return { loading: true };
    case GET_SINGLE_SCHOOL_BOARD_SUCCESS:
      return { loading: false, singleSchoolBoard: action.payload };
    case GET_SINGLE_SCHOOL_BOARD_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_SCHOOL_BOARD_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleSchoolBoardReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_SCHOOL_BOARD_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_SCHOOL_BOARD_SUCCESS:
      return {
        loading: false,
        updateSchoolBoard: action.payload,
        success: true,
      };
    case UPDATE_SINGLE_SCHOOL_BOARD_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_SCHOOL_BOARD_RESET:
      return {};
    default:
      return state;
  }
};
