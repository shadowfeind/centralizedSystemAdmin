import { GET_ALL_FAMILYMEMBER_FAIL, 
  GET_ALL_FAMILYMEMBER_REQUEST, 
  GET_ALL_FAMILYMEMBER_RESET, 
  GET_ALL_FAMILYMEMBER_SUCCESS,
  CREATE_SINGLE_FAMILYMEMBER_REQUEST,
  CREATE_SINGLE_FAMILYMEMBER_SUCCESS,
  CREATE_SINGLE_FAMILYMEMBER_FAIL,
  CREATE_SINGLE_FAMILYMEMBER_RESET,
  GET_ALL_FAMILYMEMBER_CREATE_REQUEST,
  GET_ALL_FAMILYMEMBER_CREATE_SUCCESS,
  GET_ALL_FAMILYMEMBER_CREATE_FAIL,
  GET_ALL_FAMILYMEMBER_CREATE_RESET,
  FAMILYMEMBER_CREATE_REQUEST,
  FAMILYMEMBER_CREATE_SUCCESS,
  FAMILYMEMBER_CREATE_FAIL,
  FAMILYMEMBER_CREATE_RESET,
  GET_SINGLE_FAMILYMEMBER_REQUEST,
  GET_SINGLE_FAMILYMEMBER_SUCCESS,
  GET_SINGLE_FAMILYMEMBER_FAIL,
  GET_SINGLE_FAMILYMEMBER_RESET,
  UPDATE_SINGLE_FAMILYMEMBER_REQUEST,
  UPDATE_SINGLE_FAMILYMEMBER_SUCCESS,
  UPDATE_SINGLE_FAMILYMEMBER_FAIL,
  UPDATE_SINGLE_FAMILYMEMBER_RESET,
  GET_FAMILY_MEMBER_LIST_REQUEST,
  GET_FAMILY_MEMBER_LIST_SUCCESS,
  GET_FAMILY_MEMBER_LIST_FAIL,
  GET_FAMILY_MEMBER_LIST_RESET,  
} from "./FamilyMemberConstants";

export const getAllFamilyMember = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_FAMILYMEMBER_REQUEST:
      return { loading: true };
    case GET_ALL_FAMILYMEMBER_SUCCESS:
      return { loading: false, getAllFamilyMember: action.payload };
    case GET_ALL_FAMILYMEMBER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_FAMILYMEMBER_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllFamilyMemberCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_FAMILYMEMBER_CREATE_REQUEST:
      return { loading: true };
    case GET_ALL_FAMILYMEMBER_CREATE_SUCCESS:
      return { loading: false, familyMemberCreate: action.payload };
    case GET_ALL_FAMILYMEMBER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_FAMILYMEMBER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getListFamilyMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FAMILY_MEMBER_LIST_REQUEST:
      return { loading: true };
    case GET_FAMILY_MEMBER_LIST_SUCCESS:
      return { loading: false, listFamilyMember: action.payload };
    case GET_FAMILY_MEMBER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case GET_FAMILY_MEMBER_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleFamilyMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_FAMILYMEMBER_REQUEST:
      return { loading: true };
    case GET_SINGLE_FAMILYMEMBER_SUCCESS:
      return { loading: false, SingleFamilyMember: action.payload, success: true };
    case GET_SINGLE_FAMILYMEMBER_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_FAMILYMEMBER_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSingleFamilyMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_FAMILYMEMBER_REQUEST:
      return { loading: true };
    case UPDATE_SINGLE_FAMILYMEMBER_SUCCESS:
      return { loading: false, updatedFamilyMember: action.payload };
    case UPDATE_SINGLE_FAMILYMEMBER_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SINGLE_FAMILYMEMBER_RESET:
      return {};
    default:
      return state;
  }
};


export const createFamilyMemberReducer = (state = {}, action) => {
switch (action.type) {
  case FAMILYMEMBER_CREATE_REQUEST:
    return { loading: true };
  case FAMILYMEMBER_CREATE_SUCCESS:
    return { loading: false, createFamilyMember: action.payload, success: true };
  case FAMILYMEMBER_CREATE_FAIL:
    return { loading: false, error: action.payload };
  case FAMILYMEMBER_CREATE_RESET:
    return {};
  default:
    return state;
}
};

