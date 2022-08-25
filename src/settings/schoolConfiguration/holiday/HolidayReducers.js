import {
  GET_ALL_HOLIDAY_FAIL,
  GET_ALL_HOLIDAY_REQUEST,
  GET_ALL_HOLIDAY_RESET,
  GET_ALL_HOLIDAY_SUCCESS,
  GET_SINGLE_HOLIDAY_FAIL,
  GET_SINGLE_HOLIDAY_REQUEST,
  GET_SINGLE_HOLIDAY_RESET,
  GET_SINGLE_HOLIDAY_SUCCESS,
  HOLIDAY_CREATE_FAIL,
  HOLIDAY_CREATE_REQUEST,
  HOLIDAY_CREATE_RESET,
  HOLIDAY_CREATE_SUCCESS,
  UPDATE_SINGLE_HOLIDAY_FAIL,
  UPDATE_SINGLE_HOLIDAY_REQUEST,
  UPDATE_SINGLE_HOLIDAY_RESET,
  UPDATE_SINGLE_HOLIDAY_SUCCESS,
} from "./HolidayConstants";

export const getAllHoliday = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_HOLIDAY_REQUEST:
      return { loading: true };
    case GET_ALL_HOLIDAY_SUCCESS:
      return { loading: false, holiday: action.payload };
    case GET_ALL_HOLIDAY_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_HOLIDAY_RESET:
      return {};
    default:
      return state;
  }
};

export const createHolidayReducer = (state = {}, action) => {
  switch (action.type) {
    case HOLIDAY_CREATE_REQUEST:
      return { loading: true };
    case HOLIDAY_CREATE_SUCCESS:
      return { loading: false, holiday: action.payload, success: true };
    case HOLIDAY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case HOLIDAY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleHolidayReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_HOLIDAY_REQUEST:
      return { loading: true };
    case GET_SINGLE_HOLIDAY_SUCCESS:
      return { loading: false, singleHoliday: action.payload };
    case GET_SINGLE_HOLIDAY_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_HOLIDAY_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleHolidayReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_HOLIDAY_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_HOLIDAY_SUCCESS:
      return { loading: false, updatedHoliday: action.payload, success: true };
    case UPDATE_SINGLE_HOLIDAY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_HOLIDAY_RESET:
      return {};
    default:
      return state;
  }
};
