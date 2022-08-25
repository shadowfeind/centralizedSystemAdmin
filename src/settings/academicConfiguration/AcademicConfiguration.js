import React, { Suspense, lazy, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";

const ClassSubject = lazy(() => import("./classSubject/ClassSubject"));
const AcademicClass = lazy(() => import("./academicClass/AcademicClass"));
const AcademicFaculty = lazy(() => import("./academicFaculty/AcademicFaculty"));
const AcademicProgram = lazy(() => import("./academicProgram/AcademicProgram"));
const AcademicSection = lazy(() => import("./academicSection/AcademicSection"));
const AcademicSubject = lazy(() => import("./academicSubject/AcademicSubject"));
const AcademicYearCalendar = lazy(() =>
  import("./academicYearCalendar/AcademicYearCalendar")
);
const AssignFacultySubject = lazy(() =>
  import("./assignFacultySubject/AssignFacultySubject")
);
const AssignStudentSubject = lazy(() =>
  import("./assignStudenSubject/AssignStudentSubject")
);
const SchoolBoard = lazy(() => import("./schoolBoard/SchoolBoard"));
const AcademicYear = lazy(() => import("./academicYear/AcademicYear"));
const AssignEca = lazy(() => import("./assignEca/AssignEca"));
const EcaLookup = lazy(() => import("./ecaLookUp/EcaLookUp"));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  indicator: {
    height: "50px",
    opacity: 0.5,
  },
}));

const AcademicConfiguration = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/settings" });
  }, [dispatch]);
  return (
    <div>
      <AppBar position="static" style={{ background: "#253053" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          TabIndicatorProps={{ className: classes.indicator }}
        >
          {/* <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Academic Class"
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Academic Section"
            {...a11yProps(1)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="School Board"
            {...a11yProps(2)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Academic Program"
            {...a11yProps(3)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Academic Faculty"
            {...a11yProps(4)}
          /> */}
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Academic Year"
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Academic Year Calender"
            {...a11yProps(1)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Academic Subject"
            {...a11yProps(2)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Class Subject"
            {...a11yProps(3)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Assign Faculty Subject"
            {...a11yProps(4)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="ECA LookUp"
            {...a11yProps(5)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Assign ECA"
            {...a11yProps(6)}
          />
          {/* <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Assign Student Subject"
            {...a11yProps(10)}
          /> */}
        </Tabs>
      </AppBar>
      <Suspense fallback={<div></div>}>
        {/* <TabPanel value={value} index={0}>
          <AcademicClass />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AcademicSection />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SchoolBoard />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AcademicProgram />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AcademicFaculty />
        </TabPanel> */}
        <TabPanel value={value} index={0}>
          <AcademicYear />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AcademicYearCalendar />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AcademicSubject />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ClassSubject />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AssignFacultySubject />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <EcaLookup />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <AssignEca />
        </TabPanel>
        {/* <TabPanel value={value} index={10}>
          <AssignStudentSubject />
        </TabPanel> */}
      </Suspense>
    </div>
  );
};

export default AcademicConfiguration;
