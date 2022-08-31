import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  Grid,
  DialogContent,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { postSmsClassNotificationAction } from "./SmsClassNotificationActions";
import DialogFooter from "../../components/DialogFooter";

const initialFormValues = {
  IDClassNotification: 0,
  IDAcademicYear: 0,
  IDLevel: 0,
  Section: 0,
  IDAcademicShift: 0,
  IDFacultyProgramLink: 0,
  SenderID: 0,
  ReceiverID: 0,
  MessageHeading: "",
  MessageDescription: "",
  IsActive: true,
  Created_On: "2022-03-23T04:40:44.702Z",
  Updated_On: "2022-03-23T04:40:44.702Z",
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4f81bd",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const SmsClassNotificationForm = ({
  SmsClassNotification,
  SchoolShortName,
  students,
  setOpenPopup,
}) => {
  const [active, setActive] = useState(false);
  const [checked, setChecked] = useState(false);
  const [lstStudents, setLstStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.MessageHeading = !fieldValues.MessageHeading
      ? "This Field is Required"
      : fieldValues.MessageHeading && fieldValues.MessageHeading?.length > 160
      ? "Must be less than 160 characters"
      : "";
    temp.MessageDescription = !fieldValues.MessageDescription
      ? "This Field is Required"
      : fieldValues.MessageDescription &&
        fieldValues.MessageDescription?.length > 160
      ? "Must be less than 160 characters"
      : "";

    temp.selectedStudents =
      selectedStudents?.length === 0 ? "Please Select Atleast One Option" : "";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  useEffect(() => {
    if (students) {
      setLstStudents([...students]);
    }
  }, [students]);

  useEffect(() => {
    if (SmsClassNotification) {
      setValues({ ...SmsClassNotification });
    }
  }, [SmsClassNotification]);

  const handleAllChecked = (checked) => {
    setChecked(checked);
    if (checked) {
      setSelectedStudents([...students]);
    } else {
      setSelectedStudents([]);
    }
  };

  const handleChecked = (checked, obj) => {
    if (!checked) {
      setSelectedStudents((prev) => {
        let newCheckList = prev.filter(
          (x) => x.IDHREmployee !== obj.IDHREmployee
        );
        return [...newCheckList];
      });
    } else {
      setSelectedStudents((prev) => [...prev, obj]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setActive(true);
      dispatch(
        postSmsClassNotificationAction(
          values,
          selectedStudents,
          SchoolShortName
        )
      );
    }
  };
  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  return (
    <>
      <h5>**only app users are shown**</h5>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              {errors.selectedStudents && (
                <span style={{ color: "red" }}>{errors.selectedStudents}</span>
              )}
              <TableRow>
                <StyledTableCell>Roll No. </StyledTableCell>
                <StyledTableCell>Student Name </StyledTableCell>
                <StyledTableCell>Batch </StyledTableCell>
                <StyledTableCell style={{ textAlign: "right" }}>
                  <label>All</label>
                  <Checkbox
                    checked={checked}
                    onChange={(e) => handleAllChecked(e.target.checked)}
                    color="primary"
                  />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lstStudents &&
                lstStudents
                  .sort((a, b) => a.RollNo - b.RollNo)
                  .map((s) => (
                    <StyledTableRow key={s.IDHREmployee}>
                      <StyledTableCell component="th" scope="row">
                        {s.RollNo}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {s.StudentName}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {s.AcademicYear}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        style={{ textAlign: "right" }}
                      >
                        <Checkbox
                          checked={
                            selectedStudents.filter(
                              (x) => x.IDHREmployee === s.IDHREmployee
                            ).length > 0
                              ? true
                              : false
                          }
                          onChange={(e) => handleChecked(e.target.checked, s)}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ height: "30px" }}></div>
        <Form onSubmit={handleSubmit}>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={12}>
              <InputControl
                name="MessageHeading"
                label="Message Heading"
                value={values.MessageHeading}
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={handleInputChange}
                errors={errors.MessageHeading}
              />
            </Grid>
            <Grid item xs={12}>
              <InputControl
                name="MessageDescription"
                label="Message Descriptions"
                multiline
                rows={4}
                value={values.MessageDescription}
                onFocus={(e) => {
                  e.target.select();
                }}
                onKeyDown={(e) =>
                  values.MessageDescription?.length > 159 &&
                  e.key !== "Backspace" &&
                  e.preventDefault()
                }
                onChange={handleInputChange}
                errors={errors.MessageDescription}
              />
              <p style={{ paddingLeft: "10px" }}>
                {" "}
                {160 -
                  (values.MessageDescription
                    ? values?.MessageDescription?.length
                    : 0)}{" "}
                chars left{" "}
              </p>
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
      <DialogFooter>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={active}
          onClick={handleSubmit}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default SmsClassNotificationForm;
