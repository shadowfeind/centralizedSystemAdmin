import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  CHECK_ACADEMIC_YEAR_FOR_STUDENT_FAIL,
  CHECK_ACADEMIC_YEAR_FOR_STUDENT_REQUEST,
  CHECK_ACADEMIC_YEAR_FOR_STUDENT_SUCCESS,
  CHECK_REGISTRATION_FOR_STUDENT_FAIL,
  CHECK_REGISTRATION_FOR_STUDENT_REQUEST,
  CHECK_REGISTRATION_FOR_STUDENT_SUCCESS,
  CHECK_ROLLNO_FOR_STUDENT_FAIL,
  CHECK_ROLLNO_FOR_STUDENT_REQUEST,
  CHECK_ROLLNO_FOR_STUDENT_SUCCESS,
  CREATE_SINGLE_STUDENT_REGISTRATION_FAIL,
  CREATE_SINGLE_STUDENT_REGISTRATION_REQUEST,
  CREATE_SINGLE_STUDENT_REGISTRATION_SUCCESS,
  GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_FAIL,
  GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS,
  GET_INITIAL_STUDENT_REGISTRATION_DATA_FAIL,
  GET_INITIAL_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_INITIAL_STUDENT_REGISTRATION_DATA_SUCCESS,
  GET_SINGLE_STUDENT_REGISTRATION_DATA_FAIL,
  GET_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS,
  GET_STUDENT_REGISTRATION_DATA_FAIL,
  GET_STUDENT_REGISTRATION_DATA_REQUEST,
  GET_STUDENT_REGISTRATION_DATA_SUCCESS,
  SINGLE_STUDENT_REGISTRATION_CREATE_FAIL,
  SINGLE_STUDENT_REGISTRATION_CREATE_REQUEST,
  SINGLE_STUDENT_REGISTRATION_CREATE_SUCCESS,
  SINGLE_STUDENT_REGISTRATION_EDIT_FAIL,
  SINGLE_STUDENT_REGISTRATION_EDIT_REQUEST,
  SINGLE_STUDENT_REGISTRATION_EDIT_SUCCESS,
} from "./StudentRegistrationConstants";

export const getInitialStudentRegistrationDataAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_INITIAL_STUDENT_REGISTRATION_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentRegistration/GetAllStudentRegistration
        `,
        tokenConfig()
      );

      dispatch({
        type: GET_INITIAL_STUDENT_REGISTRATION_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_INITIAL_STUDENT_REGISTRATION_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getStudentRegistrationDataAction =
  (year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_STUDENT_REGISTRATION_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentRegistration/GetListStudentRegistration?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_STUDENT_REGISTRATION_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_STUDENT_REGISTRATION_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleStudentRegistrationDataAction =
  (id, year, program, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentRegistration/GetSingleToEditStudentRegistration/${id}?idAcademicYear=${year}&idFacultyProgramLink=${program}&idClass=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_STUDENT_REGISTRATION_DATA_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const singleStudentRegistrationCreateAction = () => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_STUDENT_REGISTRATION_CREATE_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/StudentRegistration/GetSingleToCreate`,
      tokenConfig()
    );

    dispatch({
      type: SINGLE_STUDENT_REGISTRATION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_STUDENT_REGISTRATION_CREATE_FAIL,

      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const singleStudentRegistrationEditAction =
  (studentReg, image, year, program, classId, searchFilterModel) =>
  async (dispatch) => {
    try {
      dispatch({ type: SINGLE_STUDENT_REGISTRATION_EDIT_REQUEST });

      if (image) {
        let formData = new FormData();
        formData.append("ImageUploaded", image);
        const { data } = await axiosInstance.put(
          `${API_URL}/api/StudentRegistrationImage/Put`,
          formData,
          tokenConfig()
        );
        if (data) {
          const newData = { ...studentReg, photoName: data };
          const jsonData = JSON.stringify({
            dbModel: newData,
            idAcademicYear: year,
            idFacultyProgramLink: program,
            IDLevel: classId,
            searchFilterModel: searchFilterModel,
          });
          await axiosInstance.put(
            `${API_URL}/api/StudentRegistration/Put`,
            jsonData,
            tokenConfig()
          );
        }
      } else {
        const jsonData = JSON.stringify({
          dbModel: studentReg,
          idAcademicYear: year,
          idFacultyProgramLink: program,
          IDLevel: classId,
          searchFilterModel: searchFilterModel,
        });
        console.log(jsonData);
        await axiosInstance.put(
          `${API_URL}/api/StudentRegistration/Put`,
          jsonData,
          tokenConfig()
        );
      }
      dispatch({
        type: SINGLE_STUDENT_REGISTRATION_EDIT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: SINGLE_STUDENT_REGISTRATION_EDIT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getCreateSingleStudentRegistrationDataAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentRegistration/GetSingleToCreate`,
        tokenConfig()
      );

      dispatch({
        type: GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CREATE_SINGLE_STUDENT_REGISTRATION_DATA_FAIL,

        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const createSingleStudentRegistrationAction =
  (studentReg, image) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SINGLE_STUDENT_REGISTRATION_REQUEST });

      let formData = new FormData();
      formData.append("ImageUploaded", image);

      if (image) {
        const { data } = await axiosInstance.put(
          `${API_URL}/api/StudentRegistrationImage/Put`,
          formData,
          tokenConfig()
        );

        const newData = { ...studentReg, photoName: data };
        const jsonData = JSON.stringify({
          dbModel: newData,
          idAcademicYear: studentReg.idAcademicYear,
        });
        console.log(jsonData);

        await axiosInstance.post(
          `${API_URL}/api/StudentRegistration/Post`,
          jsonData,
          tokenConfig()
        );
      } else {
        const newData = { ...studentReg };
        const jsonData = JSON.stringify({
          dbModel: newData,
          idAcademicYear: studentReg.idAcademicYear,
        });
        console.log(jsonData);

        await axiosInstance.post(
          `${API_URL}/api/StudentRegistration/Post`,
          jsonData,
          tokenConfig()
        );
      }

      dispatch({
        type: CREATE_SINGLE_STUDENT_REGISTRATION_SUCCESS,
        payload: image,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: CREATE_SINGLE_STUDENT_REGISTRATION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const checkRegistrationForStudentAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHECK_REGISTRATION_FOR_STUDENT_REQUEST });

    const { data } = await axiosInstance.get(
      `${API_URL}/api/StudentRegistration/CheckRegistrationNo?registrationKey=${id}`,
      tokenConfig()
    );

    dispatch({
      type: CHECK_REGISTRATION_FOR_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHECK_REGISTRATION_FOR_STUDENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const checkRollNoForStudentAction =
  (year, program, classId, section, rollNo) => async (dispatch) => {
    console.log(year, program, classId, section, rollNo);
    try {
      dispatch({ type: CHECK_ROLLNO_FOR_STUDENT_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentRegistration/CheckRollNo?idAcademicYear=${year}&idFacultyProgramLink=${program}&idLevel=${classId}&section=${section}&rollNo=${rollNo}`,
        tokenConfig()
      );

      dispatch({
        type: CHECK_ROLLNO_FOR_STUDENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHECK_ROLLNO_FOR_STUDENT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const checkAcademicYearForStudentAction =
  (year, program) => async (dispatch) => {
    console.log(year, program);
    try {
      dispatch({ type: CHECK_ACADEMIC_YEAR_FOR_STUDENT_REQUEST });

      const { data } = await axiosInstance.get(
        `${API_URL}/api/StudentRegistration/ShowAddRegistrationButton?idAcademicYear=${year}&idFacultyProgramLink=${program}`,
        tokenConfig()
      );

      dispatch({
        type: CHECK_ACADEMIC_YEAR_FOR_STUDENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHECK_ACADEMIC_YEAR_FOR_STUDENT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
