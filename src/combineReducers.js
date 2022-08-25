import { combineReducers } from "redux";
import {
  createSchoolSettingsReducer,
  getAllSchoolSettings,
  getSingleSchoolSettingsReducer,
  updateSingleSchoolSettingsReducer,
} from "./settings/schoolConfiguration/schoolSettings/SchoolSettingsReducers";
import {
  createPositionReducer,
  deletePositionReducer,
  getAllPosition,
  getSinglePositionReducer,
  updateSinglePositionReducer,
} from "./settings/schoolConfiguration/position/PositionReducers";
import {
  createEmployeeTypeReducer,
  deleteEmployeeTypeReducer,
  getAllEmployeeType,
  getSingleEmployeeTypeReducer,
  updateSingleEmployeeTypeReducer,
} from "./settings/schoolConfiguration/employeeType/EmployeeTypeReducers";
import {
  createEmployeeCategoryRoleReducer,
  deleteEmployeeCategoryRoleReducer,
  getAllEmployeeCategoryRole,
  getSingleEmployeeCategoryRoleReducer,
  updateSingleEmployeeCategoryRoleReducer,
} from "./settings/schoolConfiguration/employeeCategoryRole/EmployeeCategoryRoleReduces";
import {
  createHolidayReducer,
  getAllHoliday,
  getSingleHolidayReducer,
  updateSingleHolidayReducer,
} from "./settings/schoolConfiguration/holiday/HolidayReducers";
import {
  createEmployeeReducer,
  getAllEmployee,
  getAllEmployeeCreateReducer,
  getResetPasswordDataSingleEmployeeReducer,
  getSingleEmployeeReducer,
  resetPasswordForSingleEmployeeReducer,
  updateSingleEmployeeReducer,
} from "./settings/employeeManagement/employee/EmployeeReducers";
import {
  createRoleReducer,
  deleteRoleReducer,
  getAllRoles,
  getSingleRoleReducer,
  updateSingleRoleReducer,
} from "./settings/employeeManagement/role/RoleReducers";
import {
  createAcademicClassReducer,
  getAllAcademicClass,
  getSingleAcademicClassReducer,
  updateSingleAcademicClassReducer,
} from "./settings/academicConfiguration/academicClass/AcademicClassReducers";
import {
  createAcademicSectionReducer,
  getAllAcademicSection,
  getSingleAcademicSectionReducer,
  updateSingleAcademicSectionReducer,
} from "./settings/academicConfiguration/academicSection/AcademicSectionReducers";
import {
  createSchoolBoardReducer,
  getAllSchoolBoard,
  getSingleSchoolBoardReducer,
  updateSingleSchoolBoardReducer,
} from "./settings/academicConfiguration/schoolBoard/SchoolBoardReducers";
import {
  createAcademicProgramReducer,
  getAcademicProgramOptionReducer,
  getAllAcademicProgram,
  getSingleAcademicProgramReducer,
  updateSingleAcademicProgramReducer,
} from "./settings/academicConfiguration/academicProgram/AcademicProgramReducers";
import {
  createAcademicFacultyReducer,
  getAcademicFacultyOptionReducer,
  getAllAcademicFaculty,
  getSingleAcademicFacultyReducer,
  updateSingleAcademicFacultyReducer,
} from "./settings/academicConfiguration/academicFaculty/AcademicFacultyReducers";
import {
  createAcademicYearReducer,
  getAcademicYearCheckReducer,
  getAcademicYearOptionReducer,
  getAllAcademicYear,
  getSingleAcademicYearReducer,
  updateSingleAcademicYearReducer,
} from "./settings/academicConfiguration/academicYear/AcademicYearReducers";
import {
  createAcademicYearCalendarReducer,
  getAllAcademicYearCalendar,
  getAcademicYearCalendarProgramReducer,
  getSingleAcademicYearCalendarReducer,
  updateSingleAcademicYearCalendarReducer,
  createAcademicYearCalendarPostReducer,
  academicYearCalendarSearchReducer,
} from "./settings/academicConfiguration/academicYearCalendar/AcademicYearCalendarReducers";
import {
  createAcademicSubjectReducer,
  getAllAcademicSubject,
  getSingleAcademicSubjectReducer,
  updateSingleAcademicSubjectReducer,
} from "./settings/academicConfiguration/academicSubject/AcademicSubjectReducers";
import {
  assignFacultySubjectEditPostReducer,
  assignFacultySubjectEditReducer,
  assignFacultySubjectGenerateReducer,
  assignFacultySubjectPostReducer,
  getAllAssignFacultySubjectReducer,
  getAssignFacultySubjectOptionReducer,
  getListAssignFacultySubjectReducer,
  getSingleassignFacultySubjectReducer,
} from "./settings/academicConfiguration/assignFacultySubject/AssignFacultySubjectReducers";
import {
  getAllStudentProfile,
  getListStudentProfileReducer,
  getSingleStudentProfileDetailsReducer,
  getSingleStudentProfileEditDataReducer,
  getSingleStudentProfilePasswordresetDataReducer,
  getUploadPhotoReducer,
  postUploadPhotoReducer,
  resetSingleStudentProfilePasswordReducer,
  updateSingleStudentProfileReducer,
} from "./settings/studentManagement/studentProfile/StudentProfileReducers";
import {
  getAllReassociateStudentsReducer,
  getReassociateStudentsLevelupPostReducer,
  getReassociateStudentsLevelupReducer,
  getReassociateStudentsListsReducer,
  getSingleEditReassociateStudentsReducer,
  putReassociateStudentsReducer,
} from "./settings/studentManagement/reassociateStudent/ReassociateStudentReducers";

//examination reducers link start
import {
  createAcademicGradingReducer,
  getAllAcademicGradingReducer,
  getSingleAcademicGradingforEditReducer,
  getSingleAcademicGradingReducer,
  updateSingleAcademicGradingReducer,
} from "./examination/academicGrading/AcademicGradingReducers";
import {
  createExamDivisionReducer,
  getAllExamDivisionReducer,
  getSingleExamDivisionEditReducer,
  getSingleExamDivisionReducer,
  updateSingleExamDivisionReducer,
} from "./examination/examDivision/ExamDivisionReducers";
import {
  getAllSchoolValueReducer,
  getBulkExamApprovalBlankDataReducer,
  getBulkExamApprovalSearchDataReducer,
  getExamApprovalScheduleHeaderReducer,
  getExamApprovalSearchDataReducer,
  getInitialExamApprovalDataReducer,
  postBulkExamApprovalReducer,
} from "./examination/examMarkApproval/ExamMarkApprovalReducers";
import {
  getAllAcademicStudentExamdataReducer,
  getEventReducer,
  getEventScheduleReducer,
  getExamEntryBulkReducer,
  getExamEntrySearchDataReducer,
} from "./examination/examMarkEntry/ExamMarkEntryReducers";
import {
  getEventForExamMarkReducer,
  getExamLedgerHeaderReducer,
  getExamResultListReducer,
  getInitialExamResultDataReducer,
  getInitialExamResultStudentOptionsReducer,
  printExamResultCountReducer,
  printExamResultReducer,
  printFinalResultReducer,
} from "./examination/examResult/ExamResultReducers";
import {
  deleteExamScheduleReducer,
  getAllExamScheduleInitialDataReducer,
  getEventForExamScheduleReducer,
  getExamScheduleListReducer,
  getSingleExamScheduleCreateReducer,
  getSingleExamScheduleEditReducer,
  getToGenerateExamScheduleCreateReducer,
  postGenerateExamScheduleCreateReducer,
  postSingleExamScheduleCreateReducer,
  singleExamScheduleEditReducer,
} from "./examination/examSchedule/ExamScheduleReducers";
import {
  getAllGeneratePublishReducer,
  getAllGeneratePublishResultReducer,
  getAllGenerateReducer,
} from "./examination/generatePublishResult/GeneratePublishResultReducers";
import {
  getBulkLevelTestDataReducer,
  getInitialLevelTestDataReducer,
  postBulkLevelTestDataReducer,
} from "./examination/levelTest/LevelTestReducers";
import {
  getActiveStudentsForAdmitCardDataReducer,
  getInitialAdmitCardDataReducer,
  printStudentsAdmitCardDataReducer,
  searchStudentsForAdmitCardDataReducer,
} from "./examination/printAdminCard/PrintAdminCardReducers";
import {
  getAllStudentAttendanceInitialDataReducer,
  getAllStudentAttendanceReducer,
  getBulkStudentAttendanceReducer,
  getGeneratedStudentAttendanceReducer,
  postBulkStudentAttendanceReducer,
} from "./examination/studentAttendance/StudentAttendanceReducers";
import {
  checkAcademicYearForStudentReducer,
  checkRegistrationForStudentReducer,
  checkRollNoForStudentReducer,
  createSingleStudentRegistrationReducer,
  getCreateSingleStudentRegistrationDataReducer,
  getInitialStudentRegistrationDataReducer,
  getSingleStudentRegistrationDataReducer,
  getStudentRegistrationDataReducer,
  singleStudentRegistrationCreateReducer,
  singleStudentRegistrationEditReducer,
} from "./registration/studentRegistration/StudentRegistrationReducers";
import { navLinkReducer } from "./routesConfig/Route";
import {
  counterConfigCreateReducer,
  CounterConfigEditReducer,
  getCounterConfigInitialDataForCreateReducer,
  getCounterConfigInitialDataForEditReducer,
  getCounterConfigInitialDataReducer,
  getCounterConfigListReducer,
} from "./registration/counterConfiguration/CounterConfigurationReducers";
import {
  createSingleAdmissionConfigReducer,
  getAdmissionConfigInitialDataReducer,
  getAdmissionConfigListDataReducer,
  getCreateSingleAdmissionConfigReducer,
  getSingleAdmissionConfigReducer,
  updateSingleAdmissionConfigReducer,
} from "./registration/admissionConfiguration/AdmissionConfigurationReducers";
import {
  getActiveStudentsForStudentIdCardDataReducer,
  getInitialStudentIdCardDataReducer,
  getPrintBulkStudentsForStudentIdCardDataReducer,
} from "./settings/studentManagement/studentIdCard/StudentIdCardReducers";
import {
  createSingleTeacherFacSubReducer,
  createTeacherFacSubInitDataReducer,
  deleteTeacherFacSubReducer,
  getAllTeacherFacSubInitialDataReducer,
  getAllTeacherFacSubListDataReducer,
  getSingleTeacherFacSubDataReducer,
  singleTeacherFacSubEditReducer,
} from "./settings/teacherMapping/teacherFacultySubject/TeacherFacultySubjectReducers";
import {
  getAllPersonalInformation,
  getEmployeeListSearchReducer,
  getSinglePersonalInformationReducer,
  getSinglePersonalInformationSearchReducer,
  updateSinglePersonalInformationReducer,
} from "./userProfile/personalinformation/PersonalInformationReducers";
import {
  getAllContactAddress,
  getAllContactAddressReducer,
  getSingleContactAddressReducer,
  updateSingleContactAddressReducer,
} from "./userProfile/contactAddress/ContactAddressReducers";
import {
  getAllContactNumber,
  getAllContactNumberReducer,
  getSingleContactNumberReducer,
  updateSingleContactNumberReducer,
} from "./userProfile/contactNumber/ContactNumberReducers";
import {
  createSingleEducationReducer,
  educationCreateReducer,
  getAllEducation,
  getAllEducationCreateReducer,
  getAllEducationReducer,
  getListEducationReducer,
} from "./userProfile/education/EducationReducers";
import {
  getAllEmail,
  getAllEmailReducer,
  getSingleEmailReducer,
  updateSingleEmailReducer,
} from "./userProfile/email/EmailReducers";
import {
  createFamilyMemberReducer,
  createSingleFamilyMemberReducer,
  familyMemberCreateReducer,
  getAllFamilyMember,
  getAllFamilyMemberCreateReducer,
  getAllFamilyMemberReducer,
  getListFamilyMemberReducer,
  getSingleFamilyMemberReducer,
  updateSingleFamilyMemberReducer,
} from "./userProfile/familyMember/FamilyMemberReducers";
import {
  getAllGuardian,
  getAllGuardianReducer,
  getSingleGuardianReducer,
  updateSingleGuardianReducer,
} from "./userProfile/gurdian/GuardianReducers";
import {
  createSingleHobbyReducer,
  getAllHobby,
  getAllHobbyCreateReducer,
  getAllHobbyReducer,
  hobbyCreateReducer,
} from "./userProfile/hobby/HobbyReducers";
import {
  createSingleJobHistoryReducer,
  getAllJobHistory,
  getAllJobHistoryCreateReducer,
  getAllJobHistoryReducer,
  jobHistoryCreateReducer,
} from "./userProfile/jobHistory/JobHistoryReducers";
import {
  createSingleSkillReducer,
  getAllSkill,
  getAllSkillCreateReducer,
  getAllSkillReducer,
  skillCreateReducer,
} from "./userProfile/skill/SkillReducers";
import {
  createSingleTrainingReducer,
  getAllTraining,
  getAllTrainingCreateReducer,
  getAllTrainingReducer,
  trainingCreateReducer,
} from "./userProfile/training/TrainingReducers";
import {
  getAllUploadPhotoReducer,
  uploadPhotoReducer,
} from "./userProfile/uploadPhoto/UploadPhotoReducers";
import {
  deleteClassSubjectReducer,
  getAllClassSubjectReducer,
  getClassSubjectListReducer,
  getSingleClassSubjectReducer,
  getToCreateClassSubjectReducer,
  postToCreateClassSubjectReducer,
  updateSingleClassSubjectReducer,
} from "./settings/academicConfiguration/classSubject/ClassSubjectReducers";
import {
  getInitialRoleForPermissionReducer,
  getlistPermissionByRoleReducer,
} from "./settings/accessControl/PermissionByRole/PermissionByRoleReducers";
import {
  getAllSearchTeacherFacSubInitialDataReducer,
  getAllSearchTeacherFacSubListDataReducer,
  getSingleEditSearchTeacherFacSubListDataReducer,
  putSearchTeacherFacSubtDataReducer,
} from "./settings/teacherMapping/searchTeacherFacultySubject/SearchTeacherFacultySubjectReducers";
import {
  getAllStudentMonthlyPresentSheetReducer,
  getEnglishDateReducer,
  getListForPresentStudentReducer,
  getListForUpdateStudentPresentReducer,
  getListStudentPresentReducer,
  getSubjectOptionsForSelectReducer,
  postListStudentPresentReducer,
} from "./attendance/studentMonthlyPresentSheet/StudentMonthlyPresentSheetReducers";
import {
  getAllTotalStudentAttendanceReducer,
  getListTotalStudentAttendanceReducer,
} from "./attendance/totalStudentAttendance/TotalStudentAttendanceReducers";
import {
  createAnnouncementReducer,
  getAllAnnouncement,
  getFCMForAnnouncementReducer,
  getListAnnouncement,
  getSingleAnnouncementReducer,
  updateSingleAnnouncementReducer,
} from "./settings/announcement/AnnouncementReducers";
import { getAllAssignStudentSubjectReducer } from "./settings/academicConfiguration/assignStudenSubject/AssignStudentSubjectReducers";
import {
  getAllPgClassScheduleReducer,
  getEditClassScheduleReducer,
  getListClassScheduleReducer,
  putClassScheduleReducer,
} from "./settings/classSchedule/pg/ClassPgScheduleReducers";
import {
  downloadOldQuestionsReducer,
  getAllOldQuestionsReducer,
  getListOldQuestionsReducer,
  getSingleCreateOldQuestionsReducer,
  getSingleEditOldQuestionsReducer,
  getSubjectOldQuestionsReducer,
  postFileUploadOldQuestionsReducer,
  postOldQuestionsReducer,
  putOldQuestionsReducer,
} from "./settings/oldQuestions/OldQuestionsReducers";
import {
  getAllSyllabusReducer,
  getListSyllabusReducer,
  getSingleToEditSyllabusReducer,
  getSubjectSyllabusReducer,
  putSyllabusReducer,
} from "./settings/syllabus/syllabusPg/SyllabusReducers";
import {
  deleteLeaveRequestReducer,
  downloadLeaveRequestReducer,
  getAllLeaveRequestReducer,
  getDashboardTopContentReducer,
  getHeaderBannerReducer,
  getHeaderContentReducer,
  getListLeaveRequestReducer,
  getPrincipleSignatureReducer,
  getSingleCreateLeaveRequestReducer,
  getSingleDeleteLeaveRequestReducer,
  getSingleEditLeaveRequestReducer,
  getSingleEditSentLeaveRequestReducer,
  postFileUploadLeaveRequestReducer,
  postLeaveRequestReducer,
  putLeaveRequestReducer,
} from "./dashboard/DashboardReducers";

import {
  getAllEcaLookUpReducer,
  getDetailEcaLookUpReducer,
  getListEcaLookUpReducer,
  getSingleCreateEcaLookUpReducer,
  getSingleEditEcaLookUpReducer,
  postEcaLookUpReducer,
  putEcaLookUpReducer,
} from "./settings/academicConfiguration/ecaLookUp/EcaLookUpReducers";
import {
  getAllAssignEcaReducer,
  getListAssignEcaReducer,
  getSingleCreateAssignEcaReducer,
  postAssignEcaReducer,
} from "./settings/academicConfiguration/assignEca/AssignEcaReducers";
import {
  getAllEcaDataReducer,
  getBulkEditEcaDataReducer,
  getListEcaDataReducer,
  postBulkEditEcaDataReducer,
} from "./examination/ecaData/EcaDataReducers";
import {
  getAllHrValueReducer,
  getListHrValueReducer,
  getSingleToCreateHrValueReducer,
  getSingleToEditHrValueReducer,
  postFileUploadHeaderBannerReducer,
  postFileUploadPrincipleSignatureReducer,
  postFileUploadSchoolLogoReducer,
  postHrValueReducer,
  putHrValueReducer,
} from "./settings/schoolConfiguration/hrValue/HrValueReducers";
import {
  getAllClassNotificationReducer,
  getBulkClassNotificationReducer,
  getListClassNotificationReducer,
  postClassNotificationReducer,
} from "./notification/classNotification/ClassNotificationReducers";
import {
  getAllTeacherNotificationReducer,
  getListTeacherNotificationReducer,
  getSingleCreateTeacherNotificationReducer,
  postTeacherNotificationReducer,
} from "./notification/teacherNotification/TeacherNotificationRedcuers";
import {
  getAllSmsAccessControlReducer,
  getListSmsAccessControlReducer,
  getSingleToCreateSmsAccessControlReducer,
  getSingleToEditSmsAccessControlReducer,
  postSmsAccessControlReducer,
  putSmsAccessControlReducer,
} from "./settings/accessControl/smsAccessControl/SmsAccessControlReducers";
import {
  getAllSuperAdminSmsAccessControlReducer,
  getListSuperAdminSmsAccessControlReducer,
  getSingleToCreateSuperAdminSmsAccessControlReducer,
  getSingleToEditSuperAdminSmsAccessControlReducer,
  postSuperAdminSmsAccessControlReducer,
  putSuperAdminSmsAccessControlReducer,
} from "./settings/accessControl/superAdminSmsAccessControl/SuperAdminReducers";
import {
  getAllSmsClassNotificationReducer,
  getBulkSmsClassNotificationReducer,
  getListSmsClassNotificationReducer,
  postSmsClassNotificationReducer,
} from "./smsNotification/smsClassNotification/SmsClassNotificationReducers";
import {
  getAllSmsTeacherNotificationReducer,
  getListSmsTeacherNotificationReducer,
  getSingleCreateSmsTeacherNotificationReducer,
  postSmsTeacherNotificationReducer,
} from "./smsNotification/smsTeacherNotification/SmsTeacherNotificationReducers";
import {
  createSmsAnnouncementReducer,
  getAllSmsAnnouncement,
  getFCMForSmsAnnouncementReducer,
  getListSmsAnnouncementReducer,
  getSingleSmsAnnouncementReducer,
  updateSingleSmsAnnouncementReducer,
} from "./smsNotification/smsAllNotification/SmsAllNotificationReducers";
import {
  getAllMobileUserReducer,
  getMobileUserListsReducer,
  getSingleMobileUserReducer,
  putMobileUserReducer,
} from "./settings/accessControl/mobileUsers/MobileUsersReducers";
import {
  getNotificationEmployeeListSearchReducer,
  getNotificationFcmTokenReducer,
  postNotificationFcmTokenReducer,
} from "./notification/individualNotification/IndividualNotificationReducers";

//examination reducers link end
export const reducers = combineReducers({
  //header
  navLink: navLinkReducer,
  getHeaderContent: getHeaderContentReducer,
  getDashboardTopContent: getDashboardTopContentReducer,
  getHeaderBanner: getHeaderBannerReducer,
  getPrincipleSignature: getPrincipleSignatureReducer,
  //header ends
  position: getAllPosition,
  createPosition: createPositionReducer,
  getSinglePosition: getSinglePositionReducer,
  updateSinglePosition: updateSinglePositionReducer,
  deletePosition: deletePositionReducer,
  employeeType: getAllEmployeeType,
  createEmployeeType: createEmployeeTypeReducer,
  getSingleEmployeeType: getSingleEmployeeTypeReducer,
  updateSingleEmployeeType: updateSingleEmployeeTypeReducer,
  deleteEmployeeType: deleteEmployeeTypeReducer,
  employeeCategoryRole: getAllEmployeeCategoryRole,
  createEmployeeCategoryRole: createEmployeeCategoryRoleReducer,
  getSingleEmployeeCategoryRole: getSingleEmployeeCategoryRoleReducer,
  deleteEmployeeCategoryRole: deleteEmployeeCategoryRoleReducer,
  updateSingleEmployeeCategoryRole: updateSingleEmployeeCategoryRoleReducer,
  holiday: getAllHoliday,
  createHoliday: createHolidayReducer,
  getSingleHoliday: getSingleHolidayReducer,
  updateSingleHoliday: updateSingleHolidayReducer,
  employee: getAllEmployee,
  getAllEmployeeCreate: getAllEmployeeCreateReducer,
  createEmployee: createEmployeeReducer,
  getSingleEmployee: getSingleEmployeeReducer,
  updateSingleEmployee: updateSingleEmployeeReducer,
  getResetPasswordDataSingleEmployee: getResetPasswordDataSingleEmployeeReducer,
  resetPasswordForSingleEmployee: resetPasswordForSingleEmployeeReducer,
  role: getAllRoles,
  createRole: createRoleReducer,
  getSingleRole: getSingleRoleReducer,
  updateSingleRole: updateSingleRoleReducer,
  deleteRole: deleteRoleReducer,
  academicClass: getAllAcademicClass,
  createAcademicClass: createAcademicClassReducer,
  getSingleAcademicClass: getSingleAcademicClassReducer,
  updateSingleAcademicClass: updateSingleAcademicClassReducer,
  academicSection: getAllAcademicSection,
  createAcademicSection: createAcademicSectionReducer,
  getSingleAcademicSection: getSingleAcademicSectionReducer,
  updateSingleAcademicSection: updateSingleAcademicSectionReducer,
  schoolBoard: getAllSchoolBoard,
  createSchoolBoard: createSchoolBoardReducer,
  getSingleSchoolBoard: getSingleSchoolBoardReducer,
  updateSingleSchoolBoard: updateSingleSchoolBoardReducer,
  academicProgram: getAllAcademicProgram,
  createAcademicProgram: createAcademicProgramReducer,
  getAcademicProgramOption: getAcademicProgramOptionReducer,
  getSingleAcademicProgram: getSingleAcademicProgramReducer,
  updateSingleAcademicProgram: updateSingleAcademicProgramReducer,
  academicFaculty: getAllAcademicFaculty,
  createAcademicFaculty: createAcademicFacultyReducer,
  getAcademicFacultyOption: getAcademicFacultyOptionReducer,
  getSingleAcademicFaculty: getSingleAcademicFacultyReducer,
  updateSingleAcademicFaculty: updateSingleAcademicFacultyReducer,
  academicYear: getAllAcademicYear,
  getAcademicYearCheck: getAcademicYearCheckReducer,
  createAcademicYear: createAcademicYearReducer,
  getAcademicYearOption: getAcademicYearOptionReducer,
  getSingleAcademicYear: getSingleAcademicYearReducer,
  updateSingleAcademicYear: updateSingleAcademicYearReducer,
  academicYearCalendar: getAllAcademicYearCalendar,
  createAcademicYearCalendar: createAcademicYearCalendarReducer,
  createAcademicYearCalendarPost: createAcademicYearCalendarPostReducer,
  academicYearCalendarSearch: academicYearCalendarSearchReducer,
  getSingleAcademicYearCalendar: getSingleAcademicYearCalendarReducer,
  updateSingleAcademicYearCalendar: updateSingleAcademicYearCalendarReducer,
  getAcademicYearCalendarProgram: getAcademicYearCalendarProgramReducer,
  academicSubject: getAllAcademicSubject,
  getSingleAcademicSubject: getSingleAcademicSubjectReducer,
  createAcademicSubject: createAcademicSubjectReducer,
  updateSingleAcademicSubject: updateSingleAcademicSubjectReducer,
  getAllAssignFacultySubject: getAllAssignFacultySubjectReducer,
  getAssignFacultySubjectOption: getAssignFacultySubjectOptionReducer,
  getListAssignFacultySubject: getListAssignFacultySubjectReducer,
  resetSingleStudentProfilePassword: resetSingleStudentProfilePasswordReducer,
  getSingleStudentProfileEditData: getSingleStudentProfileEditDataReducer,
  assignFacultySubjectPost: assignFacultySubjectPostReducer,
  getSingleassignFacultySubject: getSingleassignFacultySubjectReducer,
  assignFacultySubjectEdit: assignFacultySubjectEditReducer,
  assignFacultySubjectEditPost: assignFacultySubjectEditPostReducer,
  assignFacultySubjectGenerate: assignFacultySubjectGenerateReducer,
  studentProfile: getAllStudentProfile,
  getListStudentProfile: getListStudentProfileReducer,
  getSingleStudentProfileDetails: getSingleStudentProfileDetailsReducer,
  getSingleStudentProfilePasswordresetData:
    getSingleStudentProfilePasswordresetDataReducer,
  updateSingleStudentProfile: updateSingleStudentProfileReducer,
  getUploadPhoto: getUploadPhotoReducer,
  postUploadPhoto: postUploadPhotoReducer,
  getInitialStudentIdCardData: getInitialStudentIdCardDataReducer,
  getActiveStudentsForStudentIdCardData:
    getActiveStudentsForStudentIdCardDataReducer,
  getPrintBulkStudentsForStudentIdCardData:
    getPrintBulkStudentsForStudentIdCardDataReducer,
  getAllReassociateStudents: getAllReassociateStudentsReducer,
  getReassociateStudentsLists: getReassociateStudentsListsReducer,
  getReassociateStudentsLevelup: getReassociateStudentsLevelupReducer,
  getReassociateStudentsLevelupPost: getReassociateStudentsLevelupPostReducer,
  getSingleEditReassociateStudents: getSingleEditReassociateStudentsReducer,
  putReassociateStudents: putReassociateStudentsReducer,
  getAllSearchTeacherFacSubInitialData:
    getAllSearchTeacherFacSubInitialDataReducer,
  getSingleEditSearchTeacherFacSubListData:
    getSingleEditSearchTeacherFacSubListDataReducer,
  putSearchTeacherFacSubtData: putSearchTeacherFacSubtDataReducer,
  getAllSearchTeacherFacSubListData: getAllSearchTeacherFacSubListDataReducer,
  getAllTeacherFacSubInitialData: getAllTeacherFacSubInitialDataReducer,
  getAllTeacherFacSubListData: getAllTeacherFacSubListDataReducer,
  getSingleTeacherFacSubData: getSingleTeacherFacSubDataReducer,
  singleTeacherFacSubEdit: singleTeacherFacSubEditReducer,
  createTeacherFacSubInitData: createTeacherFacSubInitDataReducer,
  createSingleTeacherFacSub: createSingleTeacherFacSubReducer,
  deleteTeacherFacSub: deleteTeacherFacSubReducer,
  getAllClassSubject: getAllClassSubjectReducer,
  getClassSubjectList: getClassSubjectListReducer,
  getSingleClassSubject: getSingleClassSubjectReducer,
  updateSingleClassSubject: updateSingleClassSubjectReducer,
  getToCreateClassSubject: getToCreateClassSubjectReducer,
  postToCreateClassSubject: postToCreateClassSubjectReducer,
  deleteClassSubject: deleteClassSubjectReducer,
  getInitialRoleForPermission: getInitialRoleForPermissionReducer,
  getlistPermissionByRole: getlistPermissionByRoleReducer,
  //examination reducers start
  getAllAcademicStudentExamdata: getAllAcademicStudentExamdataReducer,
  getEvent: getEventReducer,
  getEventSchedule: getEventScheduleReducer,
  getExamEntrySearchData: getExamEntrySearchDataReducer,
  getExamEntryBulk: getExamEntryBulkReducer,
  getAllStudentAttendanceInitialData: getAllStudentAttendanceInitialDataReducer,
  getAllStudentAttendance: getAllStudentAttendanceReducer,
  getBulkStudentAttendance: getBulkStudentAttendanceReducer,
  postBulkStudentAttendance: postBulkStudentAttendanceReducer,
  getGeneratedStudentAttendance: getGeneratedStudentAttendanceReducer,
  getInitialExamApprovalData: getInitialExamApprovalDataReducer,
  getExamApprovalScheduleHeader: getExamApprovalScheduleHeaderReducer,
  getExamApprovalSearchData: getExamApprovalSearchDataReducer,
  getBulkExamApprovalBlankData: getBulkExamApprovalBlankDataReducer,
  postBulkExamApproval: postBulkExamApprovalReducer,
  getAllSchoolValue: getAllSchoolValueReducer,
  getBulkExamApprovalSearchData: getBulkExamApprovalSearchDataReducer,
  getInitialLevelTestData: getInitialLevelTestDataReducer,
  getBulkLevelTestData: getBulkLevelTestDataReducer,
  postBulkLevelTestData: postBulkLevelTestDataReducer,
  getInitialAdmitCardData: getInitialAdmitCardDataReducer,
  getActiveStudentsForAdmitCardData: getActiveStudentsForAdmitCardDataReducer,
  searchStudentsForAdmitCardData: searchStudentsForAdmitCardDataReducer,
  printStudentsAdmitCardData: printStudentsAdmitCardDataReducer,
  getInitialExamResultData: getInitialExamResultDataReducer,
  getEventForExamMark: getEventForExamMarkReducer,
  getInitialExamResultStudentOptions: getInitialExamResultStudentOptionsReducer,
  getExamResultList: getExamResultListReducer,
  printExamResult: printExamResultReducer,
  getExamLedgerHeader: getExamLedgerHeaderReducer,
  printExamResultCount: printExamResultCountReducer,
  printFinalResult: printFinalResultReducer,
  academicGrading: getAllAcademicGradingReducer,
  getSingleAcademicGrading: getSingleAcademicGradingReducer,
  createAcademicGrading: createAcademicGradingReducer,
  getSingleAcademicGradingforEdit: getSingleAcademicGradingforEditReducer,
  updateSingleAcademicGrading: updateSingleAcademicGradingReducer,
  getAllGeneratePublish: getAllGeneratePublishReducer,
  getAllGenerate: getAllGenerateReducer,
  getAllGeneratePublishResult: getAllGeneratePublishResultReducer,
  getAllExamDivision: getAllExamDivisionReducer,
  getSingleExamDivision: getSingleExamDivisionReducer,
  createExamDivision: createExamDivisionReducer,
  getSingleExamDivisionEdit: getSingleExamDivisionEditReducer,
  updateSingleExamDivision: updateSingleExamDivisionReducer,
  getAllExamScheduleInitialData: getAllExamScheduleInitialDataReducer,
  getEventForExamSchedule: getEventForExamScheduleReducer,
  getExamScheduleList: getExamScheduleListReducer,
  getSingleExamScheduleCreate: getSingleExamScheduleCreateReducer,
  postSingleExamScheduleCreate: postSingleExamScheduleCreateReducer,
  getSingleExamScheduleEdit: getSingleExamScheduleEditReducer,
  singleExamScheduleEdit: singleExamScheduleEditReducer,
  deleteExamSchedule: deleteExamScheduleReducer,
  getToGenerateExamScheduleCreate: getToGenerateExamScheduleCreateReducer,
  postGenerateExamScheduleCreate: postGenerateExamScheduleCreateReducer,
  //examination reducers end
  //registration reducers starts
  getCounterConfigInitialData: getCounterConfigInitialDataReducer,
  getCounterConfigInitialDataForCreate:
    getCounterConfigInitialDataForCreateReducer,
  counterConfigCreate: counterConfigCreateReducer,
  getCounterConfigList: getCounterConfigListReducer,
  getCounterConfigInitialDataForEdit: getCounterConfigInitialDataForEditReducer,
  counterConfigEdit: CounterConfigEditReducer,
  getInitialStudentRegistrationData: getInitialStudentRegistrationDataReducer,
  getStudentRegistrationData: getStudentRegistrationDataReducer,
  getSingleStudentRegistrationData: getSingleStudentRegistrationDataReducer,
  singleStudentRegistrationCreate: singleStudentRegistrationCreateReducer,
  singleStudentRegistrationEdit: singleStudentRegistrationEditReducer,
  getCreateSingleStudentRegistrationData:
    getCreateSingleStudentRegistrationDataReducer,
  createSingleStudentRegistration: createSingleStudentRegistrationReducer,
  checkRegistrationForStudent: checkRegistrationForStudentReducer,
  checkRollNoForStudent: checkRollNoForStudentReducer,
  checkAcademicYearForStudent: checkAcademicYearForStudentReducer,
  getAdmissionConfigInitialData: getAdmissionConfigInitialDataReducer,
  getAdmissionConfigListData: getAdmissionConfigListDataReducer,
  getSingleAdmissionConfig: getSingleAdmissionConfigReducer,
  updateSingleAdmissionConfig: updateSingleAdmissionConfigReducer,
  getCreateSingleAdmissionConfig: getCreateSingleAdmissionConfigReducer,
  createSingleAdmissionConfig: createSingleAdmissionConfigReducer,
  //registration reducers ends
  //user profile reducers starts
  //PID PersonalInformation
  getAllPersonalInformation: getAllPersonalInformation,
  getSinglePersonalInformation: getSinglePersonalInformationReducer,
  getSinglePersonalInformationSearch: getSinglePersonalInformationSearchReducer,
  updateSinglePersonalInformation: updateSinglePersonalInformationReducer,
  getEmployeeListSearch: getEmployeeListSearchReducer,
  //PID ContactAddress
  getAllContactAddress: getAllContactAddress,
  getSingleContactAddress: getSingleContactAddressReducer,
  updateSingleContactAddress: updateSingleContactAddressReducer,
  //PiD Contactnumber
  getAllContactNumber: getAllContactNumber,
  getSingleContactNumber: getSingleContactNumberReducer,
  updateSingleContactNumber: updateSingleContactNumberReducer,
  //PID Education
  getAllEducation: getAllEducation,
  getAllEducationCreate: getAllEducationCreateReducer,
  createSingleEducation: createSingleEducationReducer,
  educationCreate: educationCreateReducer,
  getListEducation: getListEducationReducer,
  //PID Email
  getAllEmail: getAllEmail,
  getSingleEmail: getSingleEmailReducer,
  updateSingleEmail: updateSingleEmailReducer,
  //SchoolSetting reducer Start
  schoolSettings: getAllSchoolSettings,
  createSchoolSettings: createSchoolSettingsReducer,
  getSingleSchoolSettings: getSingleSchoolSettingsReducer,
  updateSingleSchoolSettings: updateSingleSchoolSettingsReducer,
  //Reducer Ends
  //PID FamilyMember
  getAllFamilyMember: getAllFamilyMember,
  getSingleFamilyMember: getSingleFamilyMemberReducer,
  updateSingleFamilyMember: updateSingleFamilyMemberReducer,
  createFamilyMember: createFamilyMemberReducer,
  getAllFamilyMemberCreate: getAllFamilyMemberCreateReducer,
  getListFamilyMember: getListFamilyMemberReducer,
  //PID Guardian
  getAllGuardian: getAllGuardian,
  getSingleGuardian: getSingleGuardianReducer,
  updateSingleGuardian: updateSingleGuardianReducer,
  //PID Hobby
  getAllHobby: getAllHobby,
  getAllHobbyCreate: getAllHobbyCreateReducer,
  createSingleHobby: createSingleHobbyReducer,
  hobbyCreate: hobbyCreateReducer,
  //PID JobHistory
  getAllJobHistory: getAllJobHistory,
  getAllJobHistoryCreate: getAllJobHistoryCreateReducer,
  createSingleJobHistory: createSingleJobHistoryReducer,
  jobHistoryCreate: jobHistoryCreateReducer,
  //PID Skill
  getAllSkill: getAllSkill,
  getAllSkillCreate: getAllSkillCreateReducer,
  createSingleSkill: createSingleSkillReducer,
  skillCreate: skillCreateReducer,
  //PID Training
  getAllTraining: getAllTraining,
  getAllTrainingCreate: getAllTrainingCreateReducer,
  createSingleTraining: createSingleTrainingReducer,
  trainingCreate: trainingCreateReducer,
  //PID uploadPhoto
  uploadPhoto: uploadPhotoReducer,
  getAllUploadPhoto: getAllUploadPhotoReducer,
  //user profile reducers ends
  //attendance reducers starts
  getAllStudentMonthlyPresentSheet: getAllStudentMonthlyPresentSheetReducer,
  getSubjectOptionsForSelect: getSubjectOptionsForSelectReducer,
  getEnglishDate: getEnglishDateReducer,
  getListStudentPresent: getListStudentPresentReducer,
  getListForUpdateStudentPresent: getListForUpdateStudentPresentReducer,
  getListForPresentStudent: getListForPresentStudentReducer,
  postListStudentPresent: postListStudentPresentReducer,
  getAllTotalStudentAttendance: getAllTotalStudentAttendanceReducer,
  getListTotalStudentAttendance: getListTotalStudentAttendanceReducer,
  //attendance reducers ends
  //announcement
  announcement: getAllAnnouncement,
  getListAnnouncement: getListAnnouncement,
  getFCMForAnnouncement: getFCMForAnnouncementReducer,
  createAnnouncement: createAnnouncementReducer,
  getSingleAnnouncement: getSingleAnnouncementReducer,
  updateSingleAnnouncement: updateSingleAnnouncementReducer,
  //Assign Student Subject
  // assignStudentSubject : getAllAssignStudentSubjectReducer,
  //class schedule reducers starts
  getAllPgClassSchedule: getAllPgClassScheduleReducer,
  getListClassSchedule: getListClassScheduleReducer,
  getEditClassSchedule: getEditClassScheduleReducer,
  putClassSchedule: putClassScheduleReducer,
  //class schedule reducers ends
  //old question reducers start
  getAllOldQuestions: getAllOldQuestionsReducer,
  getListOldQuestions: getListOldQuestionsReducer,
  getSubjectOldQuestions: getSubjectOldQuestionsReducer,
  getSingleCreateOldQuestions: getSingleCreateOldQuestionsReducer,
  getSingleEditOldQuestions: getSingleEditOldQuestionsReducer,
  postOldQuestions: postOldQuestionsReducer,
  putOldQuestions: putOldQuestionsReducer,
  downloadOldQuestions: downloadOldQuestionsReducer,
  //old question reducers ends
  //Syllabus Reducers Start
  getAllSyllabus: getAllSyllabusReducer,
  getSingleToEditSyllabus: getSingleToEditSyllabusReducer,
  getListSyllabus: getListSyllabusReducer,
  putSyllabus: putSyllabusReducer,
  //ECA Look up Reducers Start
  getAllEcaLookUp: getAllEcaLookUpReducer,
  getListEcaLookUp: getListEcaLookUpReducer,
  getSingleEditEcaLookUp: getSingleEditEcaLookUpReducer,
  getSingleCreateEcaLookUp: getSingleCreateEcaLookUpReducer,
  getDetailEcaLookUp: getDetailEcaLookUpReducer,
  postEcaLookUp: postEcaLookUpReducer,
  putEcaLookUp: putEcaLookUpReducer,
  //ECA Assign Reducers
  getAllAssignEca: getAllAssignEcaReducer,
  getListAssignEca: getListAssignEcaReducer,
  getSingleCreateAssignEca: getSingleCreateAssignEcaReducer,
  postAssignEca: postAssignEcaReducer,
  //ECA DATA Reducers
  getAllEcaData: getAllEcaDataReducer,
  getListEcaData: getListEcaDataReducer,
  getBulkEditEcaData: getBulkEditEcaDataReducer,
  postBulkEditEcaData: postBulkEditEcaDataReducer,
  //HR VALUE reducers:
  getAllHrValue: getAllHrValueReducer,
  getListHrValue: getListHrValueReducer,
  getSingleToCreateHrValue: getSingleToCreateHrValueReducer,
  getSingleToEditHrValue: getSingleToEditHrValueReducer,
  postHrValue: postHrValueReducer,
  putHrValue: putHrValueReducer,
  postFileUploadHeaderBanner: postFileUploadHeaderBannerReducer,
  postFileUploadSchoolLogo: postFileUploadSchoolLogoReducer,
  postFileUploadPrincipleSignature: postFileUploadPrincipleSignatureReducer,
  //ClassNotification Reducers
  getAllClassNotification: getAllClassNotificationReducer,
  getListClassNotification: getListClassNotificationReducer,
  getBulkClassNotification: getBulkClassNotificationReducer,
  postClassNotification: postClassNotificationReducer,

  //TeacherNotification Reducers:
  getAllTeacherNotification: getAllTeacherNotificationReducer,
  getListTeacherNotification: getListTeacherNotificationReducer,
  getSingleCreateTeacherNotification: getSingleCreateTeacherNotificationReducer,
  postTeacherNotification: postTeacherNotificationReducer,

  //SMS Access Control Reducers:
  getAllSmsAccessControl: getAllSmsAccessControlReducer,
  getListSmsAccessControl: getListSmsAccessControlReducer,
  getSingleToCreateSmsAccessControl: getSingleToCreateSmsAccessControlReducer,
  getSingleToEditSmsAccessControl: getSingleToEditSmsAccessControlReducer,
  postSmsAccessControl: postSmsAccessControlReducer,
  putSmsAccessControl: putSmsAccessControlReducer,

  //Leave Request:
  getAllLeaveRequest: getAllLeaveRequestReducer,
  getListLeaveRequest: getListLeaveRequestReducer,
  getSingleCreateLeaveRequest: getSingleCreateLeaveRequestReducer,
  getSingleEditLeaveRequest: getSingleEditLeaveRequestReducer,
  postLeaveRequest: postLeaveRequestReducer,
  putLeaveRequest: putLeaveRequestReducer,
  getSingleDeleteLeaveRequest: getSingleDeleteLeaveRequestReducer,
  deleteLeaveRequest: deleteLeaveRequestReducer,
  downloadLeaveRequest: downloadLeaveRequestReducer,
  getSingleEditSentLeaveRequest: getSingleEditSentLeaveRequestReducer,

  //Super Admin SMS:
  getAllSuperAdminSmsAccessControl: getAllSuperAdminSmsAccessControlReducer,
  getListSuperAdminSmsAccessControl: getListSuperAdminSmsAccessControlReducer,
  getSingleToCreateSuperAdminSmsAccessControl:
    getSingleToCreateSuperAdminSmsAccessControlReducer,
  getSingleToEditSuperAdminSmsAccessControl:
    getSingleToEditSuperAdminSmsAccessControlReducer,
  postSuperAdminSmsAccessControl: postSuperAdminSmsAccessControlReducer,
  putSuperAdminSmsAccessControl: putSuperAdminSmsAccessControlReducer,

  //All SMS Notification
  getAllSmsAnnouncement: getAllSmsAnnouncement,
  getListSmsAnnouncement: getListSmsAnnouncementReducer,
  getFCMForSmsAnnouncement: getFCMForSmsAnnouncementReducer,
  createSmsAnnouncement: createSmsAnnouncementReducer,
  getSingleSmsAnnouncement: getSingleSmsAnnouncementReducer,
  updateSingleSmsAnnouncement: updateSingleSmsAnnouncementReducer,
  //SMS Class Notification
  getAllSmsClassNotification: getAllSmsClassNotificationReducer,
  getListSmsClassNotification: getListSmsClassNotificationReducer,
  getBulkSmsClassNotification: getBulkSmsClassNotificationReducer,
  postSmsClassNotification: postSmsClassNotificationReducer,

  //SMS Teacher Notification
  getAllSmsTeacherNotification: getAllSmsTeacherNotificationReducer,
  getListSmsTeacherNotification: getListSmsTeacherNotificationReducer,
  getSingleCreateSmsTeacherNotification:
    getSingleCreateSmsTeacherNotificationReducer,
  postSmsTeacherNotification: postSmsTeacherNotificationReducer,

  //Mobile Users Reducers:
  getAllMobileUser: getAllMobileUserReducer,
  getMobileUserLists: getMobileUserListsReducer,
  getSingleMobileUser: getSingleMobileUserReducer,
  putMobileUser: putMobileUserReducer,

  //Individual Notification Reducers:
  getNotificationEmployeeListSearch: getNotificationEmployeeListSearchReducer,
  getNotificationFcmToken: getNotificationFcmTokenReducer,
  postNotificationFcmToken: postNotificationFcmTokenReducer,
});
