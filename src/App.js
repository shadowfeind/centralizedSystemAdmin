import React, { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import {
  createTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import LoadingComp from "./components/LoadingComp";

const Help = lazy(() => import("./help/Help"));
const EcaData = lazy(() => import("./examination/ecaData/EcaData"));
const AutoSearch = lazy(() => import("./userProfile/autoSearch/AutoSearch"));
const PageNotFound = lazy(() => import("./pageNotFound/PageNotFound"));
const ClassSchedule = lazy(() =>
  import("./settings/classSchedule/ClassSchedule")
);
const Attendance = lazy(() => import("./attendance/Attendance"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const AccessControl = lazy(() =>
  import("./settings/accessControl/AccessControl")
);
const ClassSubject = lazy(() =>
  import("./settings/academicConfiguration/classSubject/ClassSubject")
);
const UserProfile = lazy(() => import("./userProfile/UserProfile"));
const TeacherMapping = lazy(() =>
  import("./settings/teacherMapping/TeacherMapping")
);
const CounterConfiguration = lazy(() =>
  import("./registration/counterConfiguration/CounterConfiguration")
);
const AdmissionConfiguration = lazy(() =>
  import("./registration/admissionConfiguration/AdmissionConfiguration")
);

//settings lazy loading
const Settings = lazy(() => import("./settings/Settings"));
const EmployeeManagement = lazy(() =>
  import("./settings/employeeManagement/EmployeeManagement")
);
const AcademicConfiguration = lazy(() =>
  import("./settings/academicConfiguration/AcademicConfiguration")
);
const StudentManagement = lazy(() =>
  import("./settings/studentManagement/StudentManagement")
);
const Announcement = lazy(() => import("./settings/announcement/Announcement"));
//examination lazy loading

// const AcademicGrading = lazy(() =>
//   import("./examination/academicGrading/AcademicGrading")
// );
// const ExamDivision = lazy(() =>
//   import("./examination/examDivision/ExamDivision")
// );
const ExamMarkApproval = lazy(() =>
  import("./examination/examMarkApproval/ExamMarkApproval")
);
const ExamSchedule = lazy(() =>
  import("./examination/examSchedule/ExamSchedule")
);
const PrintAdminCard = lazy(() =>
  import("./examination/printAdminCard/PrintAdminCard")
);
const ExamMarkEntry = lazy(() =>
  import("./examination/examMarkEntry/ExamMarkEntry")
);
const GeneratePublishResult = lazy(() =>
  import("./examination/generatePublishResult/GeneratePublishResult")
);
const ExamResult = lazy(() => import("./examination/examResult/ExamResult"));
const StudentAttendance = lazy(() =>
  import("./examination/studentAttendance/StudentAttendance")
);
const LevelTest = lazy(() => import("./examination/levelTest/LevelTest"));
const StudentRegistration = lazy(() =>
  import("./registration/studentRegistration/StudentRegistration")
);
const OldQuestions = lazy(() => import("./settings/oldQuestions/OldQuestions"));
const Syllabus = lazy(() => import("./settings/syllabus/SyllabusMain"));

//Notification
const ClassNotification = lazy(() =>
  import("./notification/classNotification/ClassNotification")
);
const IndividualNotification = lazy(() =>
  import("./notification/individualNotification/IndividualNotification")
);
const TeacherNotification = lazy(() =>
  import("./notification/teacherNotification/TeacherNotification")
);

//SMS Notification
const SmsClassNotification = lazy(() =>
  import("./smsNotification/smsClassNotification/SmsClassNotification")
);
const SmsTeacherNotification = lazy(() =>
  import("./smsNotification/smsTeacherNotification/SmsTeacherNotification")
);
const SmsAllNotification = lazy(() =>
  import("./smsNotification/smsAllNotification/SmsAllNotification")
);

const theme = createTheme({
  palette: {
    background: {
      default: "#eaeff5",
    },
  },

  MuiButtonRoot: {
    minWidth: "10px",
    fontSize: "12px",
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "15%",
    width: "100%",
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <SideMenu />
        <div className={classes.appMain}>
          {/* Examination route start */}
          <Suspense fallback={<LoadingComp />}>
            <Switch>
              {/* <Route path={"/examination"} component={AcademicGrading} /> */}
              {/* <Route path={"/exam-division"} component={ExamDivision} /> */}
              <Route
                path={"/exam-mark-approval"}
                component={ExamMarkApproval}
              />
              <Route path={"/examination"} component={ExamSchedule} />
              <Route path={"/print-admit-card"} component={PrintAdminCard} />
              <Route path={"/exam-mark-entry"} component={ExamMarkEntry} />
              <Route
                path={"/generatepublish-result"}
                component={GeneratePublishResult}
              />
              <Route path={"/exam-result"} component={ExamResult} />

              <Route path={"/level-test"} component={LevelTest} />
              <Route path={"/auto-search"} component={AutoSearch} />
              <Route
                path={"/student-attendance"}
                component={StudentAttendance}
              />
              {/* <Route path={"/academic-grading"} component={AcademicGrading} /> */}
              {/* Examination route end */}
              {/* settings route start */}
              <Route
                path={"/employee-management"}
                component={EmployeeManagement}
              />
              <Route
                path={"/academic-configuration"}
                component={AcademicConfiguration}
              />
              <Route
                path={"/student-management"}
                component={StudentManagement}
              />
              {/* settings route end */}
              {/* attendance route starts */}
              <Route path={"/attendance"} component={Attendance} />
              {/* attendance route end */}
              {/* registration route starts */}
              <Route
                path={"/counter-configuration"}
                component={CounterConfiguration}
              />
              <Route
                path={"/admission-configuration"}
                component={AdmissionConfiguration}
              />
              <Route path={"/registration"} component={StudentRegistration} />
              <Route path={"/old-questions"} component={OldQuestions} />
              <Route path={"/syllabus"} component={Syllabus} />
              <Route path={"/teacher-mapping"} component={TeacherMapping} />
              <Route path={"/notification"} component={Announcement} />
              <Route path={"/user-profile"} component={UserProfile} />
              <Route path={"/class-subject"} component={ClassSubject} />
              <Route path={"/access-control"} component={AccessControl} />
              {/* registration route ends */}
              {/* class schedule starts */}
              <Route path={"/class-schedule"} component={ClassSchedule} />
              {/* class schedule ends */}
              <Route path={"/settings"} component={Settings} />
              <Route path={"/eca-data"} component={EcaData} />
              <Route
                path={"/class-notification"}
                component={ClassNotification}
              />
              <Route
                path={"/individual-notification"}
                component={IndividualNotification}
              />
              <Route
                path={"/teacher-notification"}
                component={TeacherNotification}
              />

              <Route
                path={"/sms-class-notification"}
                component={SmsClassNotification}
              />

              <Route
                path={"/sms-teacher-notification"}
                component={SmsTeacherNotification}
              />
              <Route
                path={"/sms-notification"}
                component={SmsAllNotification}
              />
              <Route path={"/help"} component={Help} />
              <Route exact path={"/"} component={Dashboard} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Suspense>
        </div>
        <CssBaseline />
      </ThemeProvider>
    </Router>
  );
};

export default App;
