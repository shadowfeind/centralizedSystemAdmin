export const getAllAssignStudentSubjectReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_ASSIGN_STUDENT_SUBJECT_REQUEST:
        return { loading: true };
      case GET_ALL_ASSIGN_STUDENT_SUBJECT_SUCCESS:
        return { loading: false, allAssignStudentSubjects: action.payload };
      case GET_ALL_ASSIGN_STUDENT_SUBJECT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };