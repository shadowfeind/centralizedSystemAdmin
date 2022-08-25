import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import {
  createAcademicYearCalendarPostAction,
  updateSingleAcademicYearCalendarAction,
} from "./AcademicYearCalendarActions";

const initialFormValues = {
  IDAcademicYearCalendar: 0,
  IDYearFacultyLink: 0,
  IDLevel: 0,
  EventStatus: "Active",
  EventName: "",
  EventType: "Term Exam",
  EventDescription: "",
  FromDate: "2021-09-23",
  ToDate: "2021-10-23",
  Created_On: "2021-09-23",
  Updated_On: "2021-09-23",
  IDAcademicYear: 0,
};

const AcademicYearCalendarForm = ({
  singleAcademicYearCalendar,
  setOpenPopup,
  classId,
}) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.EventName = fieldValues.EventName ? "" : "This feild is required";
    temp.EventDescription = !fieldValues.EventDescription
      ? "This feild is required"
      : fieldValues.EventDescription.length > 200
      ? "Must be less than 101 characters"
      : "";
    temp.FromDate = fieldValues.FromDate ? "" : "This feild is required";
    temp.ToDate = fieldValues.ToDate ? "" : "This feild is required";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const { createAcademicYearCalendarOptions } = useSelector(
    (state) => state.createAcademicYearCalendar
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.IDAcademicYearCalendar);
    if (validate()) {
      setActive(true);
      if (values.IDAcademicYearCalendar === 0) {
        console.log("working");
        const finalData = {
          ...values,
          IDYearFacultyLink:
            createAcademicYearCalendarOptions.dbModel.IDYearFacultyLink,
          IDLevel: classId,
        };

        dispatch(createAcademicYearCalendarPostAction(finalData));
      } else {
        dispatch(updateSingleAcademicYearCalendarAction(values));
      }
      setOpenPopup(false);
    }
  };

  const fillerArray = [{ Key: "", Value: "" }];
  useEffect(() => {
    if (singleAcademicYearCalendar) {
      setValues({ ...singleAcademicYearCalendar.dbModel });
    }
  }, [singleAcademicYearCalendar]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <SelectControl
            name="EventType"
            label="Event Type"
            value={values.EventType}
            onChange={handleInputChange}
            options={
              createAcademicYearCalendarOptions
                ? createAcademicYearCalendarOptions.ddlEventType
                : singleAcademicYearCalendar
                ? singleAcademicYearCalendar.ddlEventType
                : fillerArray
            }
          />
          <DatePickerControl
            name="FromDate"
            label="From Date"
            value={values.FromDate}
            onChange={handleInputChange}
            errors={errors.FromDate}
          />
          <InputControl
            name="EventName"
            label="Event Name*"
            value={values.EventName}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            variant="outlined"
            errors={errors.EventName}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectControl
            name="EventStatus"
            label="EventStatus"
            value={values.EventStatus}
            onChange={handleInputChange}
            options={
              createAcademicYearCalendarOptions
                ? createAcademicYearCalendarOptions.ddlEventStatus
                : singleAcademicYearCalendar
                ? singleAcademicYearCalendar.ddlEventStatus
                : fillerArray
            }
          />
          <DatePickerControl
            name="ToDate"
            label="To Date"
            value={values.ToDate}
            onChange={handleInputChange}
          />
          <InputControl
            name="EventDescription"
            label="Event Description*"
            onFocus={(e) => {
              e.target.select();
            }}
            value={values.EventDescription}
            variant="outlined"
            onChange={handleInputChange}
            errors={errors.EventDescription}
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
          disabled={active}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </div>
    </Form>
  );
};

export default AcademicYearCalendarForm;
