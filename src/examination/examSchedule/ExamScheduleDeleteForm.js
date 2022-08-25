import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import DatePickerControl from "../../components/controls/DatePickerControl";
import SelectControl from "../../components/controls/SelectControl";
import { deleteExamScheduleAction } from "./ExamScheduleActions";

const initialFormValues = {
  IDAcademicExamSchedule: 0,
  IDYearFacultyLink: 0,
  IDAcademicYearCalendar: 0,
  IDAcademicFacultySubjectLink: 0,
  ExamType: "",
  ExamScheduleFromDate: "",
  ExamScheduleToDate: "",
  ExamScheduleFromTime: "",
  ExamScheduleToTime: "",
  FullMark: 0,
  PassMark: 0,
  FullMarkPractical: 0,
  FullMarkPreTerm: 0,
  DisplayName: "",
  GroupNumber: 0,
  ApplyGroup: true,
  AcademicYear: "",
  Level: 0,
  SubjectOrder: 0,
  Created_On: "2022-01-28T07:12:28.958Z",
  Updated_On: "2022-01-28T07:12:28.958Z",
};

const ExamScheduleDeleteForm = ({ examScheduleDelete, setOpenDeletePopup }) => {
  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  useEffect(() => {
    if (examScheduleDelete) {
      setValues({ ...examScheduleDelete.dbModel });
    }
  }, [examScheduleDelete]);

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  const test = [{ Key: "", Value: "" }];
  const handleDeleteSchedule = (e) => {
    e.preventDefault();
    dispatch(
      deleteExamScheduleAction(values, examScheduleDelete.searchFilterModel)
    );
  };

  return (
    <>
      <Form onSubmit={handleDeleteSchedule}>
        <Grid container style={{ fontSize: "12px" }}>
          <Grid item xs={6}>
            <SelectControl
              disabled
              name="IDAcademicFacultySubjectLink"
              label="Subject"
              value={values.IDAcademicFacultySubjectLink}
              options={
                examScheduleDelete ? examScheduleDelete.ddlSubject : test
              }
              onChange={null}
            />
            <SelectControl
              disabled
              name="ExamType"
              label="Exam Type*"
              value={values.ExamType}
              options={
                examScheduleDelete ? examScheduleDelete.ddlExamType : test
              }
              onChange={null}
            />
            {values.ExamType == "P" && (
              <InputControl
                disabled
                name="FullMarkPractical"
                label="Full Marks Practical"
                value={values.FullMarkPractical}
                onKeyDown={(e) =>
                  symbolsArr.includes(e.key) && e.preventDefault()
                }
                onChange={(e) =>
                  (e.target.value <= 100) & (e.target.value >= 0) &&
                  handleInputChange(e)
                }
                errors={errors.FullMarkPractical}
                type="number"
              />
            )}
            <InputControl
              disabled
              name="FullMark"
              label="Full Marks*"
              value={values.FullMark}
              onKeyDown={(e) =>
                symbolsArr.includes(e.key) && e.preventDefault()
              }
              onChange={(e) =>
                (e.target.value <= 100) & (e.target.value >= 0) &&
                handleInputChange(e)
              }
              errors={errors.FullMark}
              type="number"
            />
            <SelectControl
              disabled
              name="ApplyGroup"
              label="Apply Group"
              value={values.ApplyGroup}
              options={
                examScheduleDelete ? examScheduleDelete.ddlIsActive : test
              }
              onChange={null}
              // errors={errors.ApplyGroup}
            />
            {/* <DatePickerControl
            disabled
              name="ExamScheduleFromDate"
              label="Start Date"
              value={values.ExamScheduleFromDate}
              onChange= {null}
              // errors={errors.ExamScheduleFromDate}
            /> */}
            <InputControl
              disabled
              name="ExamScheduleFromTime"
              label="From"
              value={values.ExamScheduleFromTime}
              onChange={null}
              // errors={errors.ExamScheduleFromTime}
              type="time"
            />
          </Grid>
          <Grid item xs={6}>
            <InputControl
              disabled
              name="DisplayName"
              label="Display Name"
              value={values.DisplayName}
              onChange={null}
              // errors={errors.DisplayName}
            />
            <InputControl
              disabled
              name="SubjectOrder"
              label="Subject Order"
              value={values.SubjectOrder}
              onKeyDown={(e) =>
                symbolsArr.includes(e.key) && e.preventDefault()
              }
              type="number"
              onChange={(e) =>
                (e.target.value <= 100) & (e.target.value >= 0) &&
                handleInputChange(e)
              }
              // errors={errors.SubjectOrder}
            />
            <InputControl
              disabled
              name="PassMark"
              label="Pass Mark"
              value={values.PassMark}
              onKeyDown={(e) =>
                symbolsArr.includes(e.key) && e.preventDefault()
              }
              onChange={(e) =>
                (e.target.value <= 100) & (e.target.value >= 0) &&
                handleInputChange(e)
              }
              // errors={errors.PassMark}
              type="number"
            />
            <InputControl
              disabled
              name="GroupNumber"
              label="Group Number"
              value={values.GroupNumber}
              onChange={null}
              // errors={errors.GroupNumber}
            />
            {/* <DatePickerControl
            disabled
              name="ExamScheduleToDate"
              label="End Time"
              value={values.ExamScheduleToDate}
              onChange= {null}
              // errors={errors.ExamScheduleToDate}
            /> */}
            <InputControl
              disabled
              name="ExamScheduleToTime"
              label="To"
              value={values.ExamScheduleToTime}
              onChange={null}
              // errors={errors.ExamScheduleToTime}
              type="time"
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingTop: "10px",
            marginTop: "10px",
            borderTop: "1px solid #f3f3f3",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenDeletePopup(false)}
            style={{ margin: "10px 0 0 10px" }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: "10px 0 0 10px" }}
          >
            DELETE
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ExamScheduleDeleteForm;
