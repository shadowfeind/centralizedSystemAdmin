import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import DatePickerControl from "../../components/controls/DatePickerControl";
import SelectControl from "../../components/controls/SelectControl";
import {
  postSingleExamScheduleCreateAction,
  singleExamScheduleEditAction,
} from "./ExamScheduleActions";
import {
  symbolsArrPhone,
  symbolsArrPhoneDot,
} from "../../helpers/excludeSymbol";

const initialFormValues = {
  IDAcademicExamSchedule: 0,
  IDYearFacultyLink: 0,
  IDAcademicYearCalendar: 0,
  IDAcademicFacultySubjectLink: 0,
  ExamType: "T",
  ExamScheduleFromDate: null,
  ExamScheduleToDate: null,
  ExamScheduleFromTime: "",
  ExamScheduleToTime: "",
  FullMark: "",
  PassMark: "",
  FullMarkPractical: "",
  FullMarkPreTerm: "",
  DisplayName: "",
  GroupNumber: "",
  ApplyGroup: true,
  AcademicYear: "",
  Level: 0,
  SubjectOrder: "",
  Created_On: "2022-01-28T07:12:28.958Z",
  Updated_On: "2022-01-28T07:12:28.958Z",
};

const ExamScheduleForm = ({
  examScheduleCreate,
  examScheduleEdit,
  setOpenPopup,
}) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.IDAcademicFacultySubjectLink =
      !fieldValues.IDAcademicFacultySubjectLink ? "This feild is required" : "";
    temp.ExamType = !fieldValues.ExamType ? "This feild is required" : "";
    temp.FullMark = !fieldValues.FullMark ? "This feild is required" : "";
    // temp.ApplyGroup = !fieldValues.ApplyGroup ? "This feild is required" : "";
    temp.ExamScheduleFromDate = !fieldValues.ExamScheduleFromDate
      ? "This feild is required"
      : "";
    temp.ExamScheduleToDate = !fieldValues.ExamScheduleToDate
      ? "This feild is required"
      : "";
    temp.DisplayName = !fieldValues.DisplayName ? "This feild is required" : "";
    temp.SubjectOrder = !fieldValues.SubjectOrder
      ? "This feild is required"
      : "";
    temp.PassMark = !fieldValues.PassMark ? "This feild is required" : "";
    // temp.GroupNumber = !fieldValues.GroupNumber ? "This feild is required" : "";
    temp.ExamScheduleFromTime = !fieldValues.ExamScheduleFromTime
      ? "This feild is required"
      : "";
    temp.ExamScheduleToTime = !fieldValues.ExamScheduleToTime
      ? "This feild is required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.IDAcademicExamSchedule === 0) {
        dispatch(
          postSingleExamScheduleCreateAction(
            values,
            examScheduleCreate.searchFilterModel
          )
        );
      } else {
        dispatch(
          singleExamScheduleEditAction(
            values,
            examScheduleEdit.searchFilterModel
          )
        );
      }
    }
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  useEffect(() => {
    if (examScheduleCreate) {
      setValues({
        ...examScheduleCreate.dbModel,
        IDAcademicFacultySubjectLink: examScheduleCreate?.ddlSubject[0]?.Key,
      });
    }
    if (examScheduleEdit) {
      setValues({ ...examScheduleEdit.dbModel });
    }
  }, [examScheduleCreate, examScheduleEdit]);

  const test = [{ Key: "", Value: "" }];

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container style={{ fontSize: "12px" }}>
          <Grid item xs={6}>
            <SelectControl
              name="IDAcademicFacultySubjectLink"
              label="Select Subject*"
              value={values.IDAcademicFacultySubjectLink}
              options={
                examScheduleCreate
                  ? examScheduleCreate.ddlSubject
                  : examScheduleEdit
                  ? examScheduleEdit.ddlSubject
                  : test
              }
              onChange={handleInputChange}
              errors={errors.IDAcademicFacultySubjectLink}
            />
            <SelectControl
              name="ExamType"
              label="Exam Type*"
              value={values.ExamType}
              options={
                examScheduleCreate
                  ? examScheduleCreate.ddlExamType
                  : examScheduleEdit
                  ? examScheduleEdit.ddlExamType
                  : test
              }
              onChange={handleInputChange}
              errors={errors.ExamType}
            />

            <InputControl
              name="FullMark"
              label="Full Marks*"
              onKeyDown={(e) =>
                symbolsArrPhoneDot.includes(e.key) && e.preventDefault()
              }
              value={values.FullMark}
              onWheelCapture={(e) => {
                e.target.blur();
              }}
              onChange={(e) =>
                (e.target.value <= 100) & (e.target.value >= 0) &&
                handleInputChange(e)
              }
              onFocus={(e) => {
                e.target.select();
              }}
              errors={errors.FullMark}
              type="number"
            />
            {values.ExamType == "P" && (
              <InputControl
                name="FullMarkPractical"
                label="Full Marks Practical"
                value={values.FullMarkPractical}
                onWheelCapture={(e) => {
                  e.target.blur();
                }}
                onKeyDown={(e) =>
                  symbolsArrPhoneDot.includes(e.key) && e.preventDefault()
                }
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={(e) =>
                  (e.target.value <= 100) & (e.target.value >= 0) &&
                  handleInputChange(e)
                }
                errors={errors.FullMarkPractical}
                type="number"
              />
            )}
            <SelectControl
              name="ApplyGroup"
              label="Apply Group"
              value={values.ApplyGroup}
              options={
                examScheduleCreate
                  ? examScheduleCreate.ddlIsActive
                  : examScheduleEdit
                  ? examScheduleEdit.ddlIsActive
                  : test
              }
              onChange={handleInputChange}
              // errors={errors.ApplyGroup}
            />
            <DatePickerControl
              name="ExamScheduleFromDate"
              label="Start Date"
              value={values.ExamScheduleFromDate}
              onChange={handleInputChange}
              errors={errors.ExamScheduleFromDate}
            />
            <InputControl
              name="ExamScheduleFromTime"
              label="From"
              value={values.ExamScheduleFromTime}
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={handleInputChange}
              errors={errors.ExamScheduleFromTime}
              type="time"
            />
          </Grid>
          <Grid item xs={6}>
            <InputControl
              name="DisplayName"
              label="Display Name"
              value={values.DisplayName}
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={handleInputChange}
              errors={errors.DisplayName}
            />
            <InputControl
              name="SubjectOrder"
              label="Subject Order"
              value={values.SubjectOrder}
              onFocus={(e) => {
                e.target.select();
              }}
              type="number"
              onWheelCapture={(e) => {
                e.target.blur();
              }}
              onKeyDown={(e) =>
                symbolsArrPhone.includes(e.key) && e.preventDefault()
              }
              onChange={(e) =>
                (e.target.value <= 100) & (e.target.value >= 0) &&
                handleInputChange(e)
              }
              errors={errors.SubjectOrder}
            />
            <InputControl
              name="PassMark"
              label="Pass Mark"
              value={values.PassMark}
              onWheelCapture={(e) => {
                e.target.blur();
              }}
              onKeyDown={(e) =>
                symbolsArrPhoneDot.includes(e.key) && e.preventDefault()
              }
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={(e) =>
                (e.target.value <= 100) & (e.target.value >= 0) &&
                handleInputChange(e)
              }
              errors={errors.PassMark}
              type="number"
            />
            <InputControl
              name="GroupNumber"
              label="Group Number"
              value={values.GroupNumber}
              onWheelCapture={(e) => {
                e.target.blur();
              }}
              onFocus={(e) => {
                e.target.select();
              }}
              onKeyDown={(e) =>
                symbolsArrPhone.includes(e.key) && e.preventDefault()
              }
              type="number"
              onChange={handleInputChange}
              // errors={errors.GroupNumber}
            />
            <DatePickerControl
              name="ExamScheduleToDate"
              label="End Time"
              value={values.ExamScheduleToDate}
              onChange={handleInputChange}
              errors={errors.ExamScheduleToDate}
            />
            <InputControl
              name="ExamScheduleToTime"
              label="To"
              value={values.ExamScheduleToTime}
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={handleInputChange}
              errors={errors.ExamScheduleToTime}
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
            onClick={() => setOpenPopup(false)}
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
            SUBMIT
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ExamScheduleForm;
