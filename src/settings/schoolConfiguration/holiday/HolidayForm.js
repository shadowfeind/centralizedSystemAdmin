import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import {
  holidayCreateAction,
  updateSingleHoliadyAction,
} from "./HolidayActions";

const initialFormValues = {
  IDHRHoliday: 0,
  IDHRCompany: 2,
  HolidayName: "",
  Description: "",
  FromDate: "2022-03-11T00:00:00.000+05:45",
  ToDate: "2022-03-13T00:00:00.000+05:45",
  IsActive: true,
  Created_On: "2012-12-12T00:00:00",
  Updated_On: "2015-04-09T14:20:39.947",
};

const HolidayForm = ({ holiday, setOpenPopup, startDate, endDate }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.HolidayName = !fieldValues.HolidayName
      ? "This feild is required"
      : !fieldValues.HolidayName.trim()
      ? "This feild is required"
      : fieldValues.HolidayName.length > 20
      ? "Must be less than 20 characters"
      : "";

    temp.Description = !fieldValues.Description
      ? "This feild is required"
      : !fieldValues.Description.trim()
      ? "This feild is required"
      : "";

    temp.startDate =
      startDate.toString() === "Invalid Date"
        ? "Invalid Date"
        : !startDate
        ? "Date is required"
        : "";

    temp.endDate =
      endDate.toString() === "Invalid Date"
        ? "Invalid Date"
        : !endDate
        ? "Date is required"
        : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActive(true);
      if (values.IDHRHoliday === 0) {
        dispatch(holidayCreateAction(values));
      } else {
        dispatch(updateSingleHoliadyAction(values));
      }
    }
  };

  useEffect(() => {
    if (holiday) {
      setValues({ ...holiday });
    }
  }, [holiday]);

  useEffect(() => {
    console.log("start date", startDate);
    console.log("end Date", endDate);
    setValues((prev) => ({ ...prev, FromDate: startDate, ToDate: endDate }));
  }, []);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="HolidayName"
            label="Holiday Name*"
            onFocus={(e) => {
              e.target.select();
            }}
            value={values.HolidayName}
            onChange={handleInputChange}
            errors={errors.HolidayName}
          />

          <DatePickerControl
            name="FromDate"
            label="FromDate"
            value={startDate ? startDate : values.FromDate}
            onChange={handleInputChange}
            errors={errors.FromDate}
          />
          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="Description"
            label="Description*"
            multiline
            rows={3}
            onFocus={(e) => {
              e.target.select();
            }}
            value={values.Description}
            onChange={handleInputChange}
            errors={errors.Description}
          />
          <DatePickerControl
            name="ToDate"
            label="ToDate"
            value={endDate ? endDate : values.ToDate}
            onChange={handleInputChange}
            errors={errors.ToDate}
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

export default HolidayForm;
