import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/ConfirmDialog";
import Notification from "../../../components/Notification";
import { API_URL } from "../../../constants";
import CustomContainer from "../../../components/CustomContainer";
import { Button, Toolbar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../components/Popup";
import SyllabusForm from "../syllabusPg/SyllabusForms";
import { GET_ALL_SYLLABUS_RESET, GET_LIST_SYLLABUS_RESET, GET_SINGLE_TO_EDIT_SYLLABUS_RESET, PUT_SYLLABUS_RESET } from "../syllabusPg/SyllabusConstants";
import { getAllSyllabusAction, getListSyllabusAction, getSingleEditAction } from "../syllabusPg/SyllabusActions";


const SyllabusTen =()=>{

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

    const { allSyllabus, error: allSyllabusError } = useSelector(
        (state) => state.getAllSyllabus
      );
      const { listSyllabus, error: listSyllabusError } =
        useSelector((state) => state.getListSyllabus);
      const { singleToEditSyllabus, error: singleToEditSyllabusError } = useSelector(
        (state) => state.getSingleToEditSyllabus
      );
      const { success: putSyllabusSuccess, error: putSyllabusError } =
        useSelector((state) => state.putSyllabus);
    
        if (allSyllabusError) {
            setNotify({
              isOpen: true,
              message: allSyllabusError,
              type: "error",
            });
            dispatch({ type:  GET_ALL_SYLLABUS_RESET });
          }
          if (putSyllabusError) {
            setNotify({
              isOpen: true,
              message: putSyllabusError,
              type: "error",
            });
            dispatch({ type: PUT_SYLLABUS_RESET });
          }
          if (putSyllabusSuccess) {
            setNotify({
              isOpen: true,
              message: "Successfully Update",
              type: "success",
            });
            setOpenPopup(false);
            dispatch({ type: PUT_SYLLABUS_RESET });
            // dispatch(getListClassScheuleAction(pgClassSchedule.dbModelLst[0].Id));
            dispatch(getAllSyllabusAction());
          }
          if (singleToEditSyllabusError) {
            setNotify({
              isOpen: true,
              message: singleToEditSyllabusError,
              type: "error",
            });
            dispatch({ type: GET_SINGLE_TO_EDIT_SYLLABUS_RESET });
          }
          if (listSyllabusError) {
            setNotify({
              isOpen: true,
              message: listSyllabusError,
              type: "error",
            });
            dispatch({ type: GET_LIST_SYLLABUS_RESET });
          }

          useEffect(() => {
            if (!allSyllabus) {
              dispatch(getAllSyllabusAction());
            }
            if (allSyllabus) {
              dispatch(getListSyllabusAction(14));
            }
          }, [allSyllabus]);
        
          useEffect(() => {
            if (listSyllabus) {
              setUrl(`${API_URL}${listSyllabus.FullPath}`);
            }
          }, [listSyllabus]);

          useEffect(() => {
            dispatch({ type: "GET_LINK", payload: "/settings" });
          }, [dispatch]);
        
        
          const editHandler = () => {
            if (listSyllabus) {
              dispatch(
                getSingleEditAction(
                  listSyllabus.dbModelLst[0].Id,
                  listSyllabus.searchFilterModel.company
                )
              );
              setOpenPopup(true);
            }
          };
    return (
        <>
          <CustomContainer>
            <Toolbar>
              {listSyllabus && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={editHandler}
                >
                  Update{" "}
                </Button>
              )}
            </Toolbar>
            {listSyllabus && <iframe src={url} width="100%" height="700" />}
          </CustomContainer>
          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            title="Update Form"
          >
            <SyllabusForm
              syllabus={singleToEditSyllabus && singleToEditSyllabus}
              setOpenPopup={setOpenPopup}
            />
          </Popup>
          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </>
    )
              }
export default SyllabusTen;