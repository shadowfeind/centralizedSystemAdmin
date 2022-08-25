import { Button, Grid, TextField } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomContainer from "../../components/CustomContainer";
import LoadingComp from "../../components/LoadingComp";
import Notification from "../../components/Notification";
import Popup from "../../components/Popup";
import AnnouncementForm from "../../settings/announcement/AnnouncementForm";
import { getAllPersonalInformationAction } from "../../userProfile/personalinformation/PersonalInformationActions";
import { GET_ALL_PERSONALINFORMATION_RESET } from "../../userProfile/personalinformation/PersonalInformationConstants";
import { getFcmTokenNotificationAction, getNotificationEmployeeListAction } from "./IndividualNotificationActions";
import IndividualNotificationForm from "./IndividualNotificationForm";


const IndividualNotification = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [currentSearchQuery, setCurrentSearchQuery] = useState("");
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });
    const dispatch = useDispatch();


    const { notificationEmployeeList } = useSelector((state) => state.getNotificationEmployeeListSearch);

    const { notificationFcmToken, loading } = useSelector(
        (state) => state.getNotificationFcmToken
      );
     
    
    useEffect(() => {
        dispatch({ type: "GET_LINK", payload: "/notification" });
      }, []);

      const handleChange = (e) => {
        if (e.length > 2) {
          setCurrentSearchQuery(e);
          dispatch(getNotificationEmployeeListAction(e));
        }
      };

      const handleOptionChange = (newInputValue) => {
          console.log(newInputValue);
        // dispatch(getFcmTokenNotificationAction(newInputValue));
      };
      useEffect(() => {
        dispatch({ type: GET_ALL_PERSONALINFORMATION_RESET });
      }, []);

      const test = [];

      return (
        <>
          <CustomContainer>
            <Grid container style={{ fontSize: "12px" }}>
              <Grid item xs={6}>
                <Autocomplete
                  options={notificationEmployeeList ? notificationEmployeeList : test}
                  getOptionLabel={(option) => option.Key}
                  style={{ width: 400 }}
                  onChange={(event, newInputValue) =>
                    handleOptionChange(newInputValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search User"
                      onChange={(e) => handleChange(e.target.value)}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <br />
            {loading && <LoadingComp />}
        {notificationFcmToken && (
          <IndividualNotificationForm
           schoolName={notificationFcmToken && notificationFcmToken.SchoolShortName}
          fcmTokenList={notificationFcmToken && notificationFcmToken.fcmTokenValueLst}
          
          />
        )}
            </CustomContainer>
      {/* <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Edit Form"
      >
        {" "}
        <AutoSearchForm
          personalInformation={
            singlePersonalInformationSearch && singlePersonalInformationSearch
          }
          setOpenPopup={setOpenPopup}
        />
      </Popup> */}
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default IndividualNotification;
    
