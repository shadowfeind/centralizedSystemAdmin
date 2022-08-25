import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import { Edit, Search } from "@material-ui/icons";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import {
  getAllPersonalInformationAction,
  getSinglePersonalInformationAction,
} from "./PersonalInformationActions";
import {
  GET_ALL_PERSONALINFORMATION_RESET,
  GET_ALL_PERSONALINFORMATION_SUCCESS,
  GET_SINGLE_PERSONALINFORMATION_RESET,
  UPDATE_SINGLE_PERSONALINFORMATION_RESET,
} from "./PersonalInformationConstants";
import ListPersonalInformation from "../listComponent/ListPersonalInformation";
import PersonalInformationForm from "./PersonalInformationForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
}));

const PersonalInformation = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { getAllPersonalInformation, error } = useSelector(
    (state) => state.getAllPersonalInformation
  );
  const { singlePersonalInformation, error: singlePersonalInformationError } =
    useSelector((state) => state.getSinglePersonalInformation);
  const {
    success: updateSinglePersonalInformationSuccess,
    error: updateSinglePersonalInformationError,
  } = useSelector((state) => state.updateSinglePersonalInformation);
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_PERSONALINFORMATION_RESET });
  }
  if (updateSinglePersonalInformationSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch(getAllPersonalInformationAction());
    dispatch({ type: UPDATE_SINGLE_PERSONALINFORMATION_RESET });
  }
  if (updateSinglePersonalInformationError) {
    setNotify({
      isOpen: true,
      message: updateSinglePersonalInformationError,
      type: "error",
    });
    dispatch({ type: UPDATE_SINGLE_PERSONALINFORMATION_RESET });
  }
  if (singlePersonalInformationError) {
    setNotify({
      isOpen: true,
      message: singlePersonalInformationError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_PERSONALINFORMATION_RESET });
  }
  const editHandler = () => {
    dispatch(getSinglePersonalInformationAction());
    setOpenPopup(true);
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/user-profile" });
    if (!getAllPersonalInformation) {
      dispatch(getAllPersonalInformationAction());
    }
  }, [dispatch, getAllPersonalInformation]);

  return (
    <CustomContainer>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Edit />}
        className={classes.button}
        onClick={editHandler}
      >
        Edit{" "}
      </Button>
      {getAllPersonalInformation && (
        <ListPersonalInformation
          list={getAllPersonalInformation && getAllPersonalInformation.dbModel}
        />
      )}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Personal Information Edit Form"
      >
        {" "}
        <PersonalInformationForm
          personalInformation={
            singlePersonalInformation && singlePersonalInformation
          }
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </CustomContainer>
  );
};

export default PersonalInformation;
