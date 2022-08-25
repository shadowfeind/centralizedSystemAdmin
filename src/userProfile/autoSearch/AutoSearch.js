import { Button, Grid, TextField } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomContainer from "../../components/CustomContainer";
import LoadingComp from "../../components/LoadingComp";
import Notification from "../../components/Notification";
import Popup from "../../components/Popup";
import ListPersonalInformation from "../listComponent/ListPersonalInformation";
import {
  getAllPersonalInformationAction,
  getEmployeeListAction,
  getSinglePersonalInformationSearchAction,
} from "../personalinformation/PersonalInformationActions";
import {
  GET_ALL_PERSONALINFORMATION_RESET,
  UPDATE_SINGLE_PERSONALINFORMATION_RESET,
} from "../personalinformation/PersonalInformationConstants";
import AutoSearchForm from "./AutoSearchForm";

const AutoSearch = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/user-profile" });
  }, []);

  const { employeeList } = useSelector((state) => state.getEmployeeListSearch);
  const { getAllPersonalInformation, loading } = useSelector(
    (state) => state.getAllPersonalInformation
  );
  const { singlePersonalInformationSearch, loading: singleLoading } =
    useSelector((state) => state.getSinglePersonalInformationSearch);

  const {
    success: updateSinglePersonalInformationSuccess,
    error: updateSinglePersonalInformationError,
  } = useSelector((state) => state.updateSinglePersonalInformation);

  if (updateSinglePersonalInformationSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Updated",
      type: "success",
    });
    dispatch(getAllPersonalInformationAction(currentSearchQuery));
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

  const handleChange = (e) => {
    if (e.length > 2) {
      setCurrentSearchQuery(e);
      dispatch(getEmployeeListAction(e));
    }
  };

  const handleOptionChange = (newInputValue) => {
    dispatch(getAllPersonalInformationAction(newInputValue));
  };

  const editHandler = () => {
    dispatch(getSinglePersonalInformationSearchAction(currentSearchQuery));
    setOpenPopup(true);
  };

  const test = [];
  useEffect(() => {
    dispatch({ type: GET_ALL_PERSONALINFORMATION_RESET });
  }, []);
  return (
    <>
      <CustomContainer>
        <Grid container style={{ fontSize: "12px" }}>
          <Grid item xs={6}>
            <Autocomplete
              options={employeeList ? employeeList : test}
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
        {loading && <LoadingComp />}
        {singleLoading && <LoadingComp />}
        {/* {getAllPersonalInformation && (
          <div style={{ padding: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={editHandler}
            >
              Edit{" "}
            </Button>
          </div>
        )} */}
        {getAllPersonalInformation && (
          <ListPersonalInformation
            list={
              getAllPersonalInformation && getAllPersonalInformation.dbModel
            }
          />
        )}
      </CustomContainer>
      <Popup
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
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default AutoSearch;
