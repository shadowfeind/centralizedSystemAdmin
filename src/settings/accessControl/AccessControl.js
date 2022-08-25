import React, { Suspense, lazy, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
const PermissionByRole = lazy(() =>
  import("./PermissionByRole/PermissionByRole")
);
const SmsAccessControl = lazy(() =>
  import("./smsAccessControl/SmsAccessControl")
);
const MobileUsers = lazy(() => import("./mobileUsers/MobileUsers"));
const SuperAdminSmsAccessControl = lazy(() =>
  import("./superAdminSmsAccessControl/SuperAdmin")
);

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

const AccessControl = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // useEffect(() => {
  //   if (!USER_SESSION) {
  //     window.location.href = "http://google.com";
  //   }
  // }, [USER_SESSION]);
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
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Mobile Users"
            {...a11yProps(0)}
          />

          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="SMS Access Control"
            {...a11yProps(1)}
          />
          {/* <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Permission By Role"
            {...a11yProps(2)}
          /> */}
          {/* 
<Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Super Admin SMS Access Control"
            {...a11yProps(2)}
          /> */}
        </Tabs>
      </AppBar>
      <Suspense fallback={<div></div>}>
        <TabPanel value={value} index={0}>
          <MobileUsers />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <SmsAccessControl />
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          <PermissionByRole />
        </TabPanel> */}

        {/* <TabPanel value={value} index={2}>
          <SuperAdminSmsAccessControl />
        </TabPanel> */}
      </Suspense>
    </div>
  );
};

export default AccessControl;
