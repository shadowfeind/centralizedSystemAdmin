import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/ConfirmDialog";
import Notification from "../../../components/Notification";
import {
  getAllPgClassScheuleAction,
  getEditClassScheuleAction,
  getListClassScheuleAction,
} from "./ClassPgScheduleActions";
import {
  GET_ALL_PG_CLASS_SCHEDULE_RESET,
  GET_EDIT_CLASS_SCHEDULE_RESET,
  GET_LIST_CLASS_SCHEDULE_RESET,
  PUT_CLASS_SCHEDULE_RESET,
} from "./ClassPgScheduleConstants";
import { API_URL } from "../../../constants";
import LoadingComp from "../../../components/LoadingComp";
import CustomContainer from "../../../components/CustomContainer";
import { Button, Toolbar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../components/Popup";
import ClassPgScheduleForm from "./ClassPgScheduleForm";

const ClassPgSchedule = () => {
  const [url, setUrl] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const dispatch = useDispatch();

  const { pgClassSchedule, error: pgClassScheduleError } = useSelector(
    (state) => state.getAllPgClassSchedule
  );
  const {
    allClassScheduleList,
    loading,
    error: allClassScheduleListError,
  } = useSelector((state) => state.getListClassSchedule);
  const {
    editClassSchedule,
    loading: loadingEdit,
    error: editClassScheduleError,
  } = useSelector((state) => state.getEditClassSchedule);
  const { success: putClassScheduleSuccess, error: putClassScheduleError } =
    useSelector((state) => state.putClassSchedule);

  if (pgClassScheduleError) {
    setNotify({
      isOpen: true,
      message: pgClassScheduleError,
      type: "error",
    });
    dispatch({ type: GET_ALL_PG_CLASS_SCHEDULE_RESET });
  }
  if (putClassScheduleError) {
    setNotify({
      isOpen: true,
      message: putClassScheduleError,
      type: "error",
    });
    dispatch({ type: PUT_CLASS_SCHEDULE_RESET });
  }
  if (putClassScheduleSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Update",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: PUT_CLASS_SCHEDULE_RESET });
    // dispatch(getListClassScheuleAction(pgClassSchedule.dbModelLst[0].Id));
    dispatch(getAllPgClassScheuleAction());
  }
  if (editClassScheduleError) {
    setNotify({
      isOpen: true,
      message: editClassScheduleError,
      type: "error",
    });
    dispatch({ type: GET_EDIT_CLASS_SCHEDULE_RESET });
  }
  if (allClassScheduleListError) {
    setNotify({
      isOpen: true,
      message: allClassScheduleListError,
      type: "error",
    });
    dispatch({ type: GET_LIST_CLASS_SCHEDULE_RESET });
  }

  useEffect(() => {
    if (!pgClassSchedule) {
      dispatch(getAllPgClassScheuleAction());
    }
    if (pgClassSchedule?.dbModelLst?.length > 0) {
      dispatch(getListClassScheuleAction(pgClassSchedule.dbModelLst[0]?.Id));
    }
  }, [pgClassSchedule]);

  useEffect(() => {
    if (allClassScheduleList) {
      setUrl(`${API_URL}${allClassScheduleList.FullPath}`);
    }
  }, [allClassScheduleList]);

  const editHandler = () => {
    if (allClassScheduleList) {
      dispatch(
        getEditClassScheuleAction(
          allClassScheduleList.dbModelLst[0]?.Id,
          allClassScheduleList.searchFilterModel.company
        )
      );
      setOpenPopup(true);
    }
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          {allClassScheduleList && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={editHandler}
            >
              EDIT{" "}
            </Button>
          )}
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {allClassScheduleList && (
              <iframe src={url} width="100%" height="700" />
            )}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Edit Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <ClassPgScheduleForm
              schedule={editClassSchedule && editClassSchedule}
              setOpenPopup={setOpenPopup}
            />
          </>
        )}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ClassPgSchedule;
