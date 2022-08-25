import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  AcademicYearCreateAction,
  getAcademicYearCheckAction,
  updateSingleAcademicYearAction,
} from "./AcademicYearActions";
import DatePickerControl from "../../../components/controls/DatePickerControl";
import { GET_ACADEMIC_YEAR_CHECK_RESET } from "./AcademicYearConstant";

const initialFormValues = {
  IDAcademicYear: 0,
  IDHRCompany: 2,
  AcademicYearName: "",
  AcademicYear: "",
  AcademicYearCode: "",
  StartDate: "2017-03-11T00:00:00",
  EndDate: "2018-03-31T00:00:00",
  IsActive: true,
  Created_On: "2021-09-23",
  Updated_On: "2021-09-23",
};

const AcademicYearForm = ({ academicYear, selected, setOpenPopup }) => {
  const [checkboxState, setCheckboxState] = useState([]);
  const [errorsEdit, setErrorsEdit] = useState({});
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.AcademicYearName = !fieldValues.AcademicYearName
      ? "This feild is required"
      : !fieldValues.AcademicYearName.trim()
      ? "This feild is required"
      : fieldValues.AcademicYearName.length > 100
      ? "Must be less than 101 characters"
      : "";

    temp.AcademicYearCode = !fieldValues.AcademicYearCode
      ? "This feild is required"
      : !fieldValues.AcademicYearCode.trim()
      ? "This feild is required"
      : fieldValues.AcademicYearCode.length > 10
      ? "Must be less than 11 characters"
      : "";

    temp.checkboxState =
      checkboxState?.length < 1 ? "Please Select Atleast One Option" : "";
    temp.AcademicYear = !fieldValues.AcademicYear
      ? "This feild is required"
      : !fieldValues.AcademicYear.trim()
      ? "This feild is required"
      : "";
    temp.StartDate = !fieldValues.StartDate ? "This feild is required" : "";
    temp.EndDate = !fieldValues.EndDate ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const validateEdit = (fieldValues = values) => {
    let temp = { ...errors };

    temp.AcademicYearName = !fieldValues.AcademicYearName
      ? "This feild is required"
      : !fieldValues.AcademicYearName.trim()
      ? "This feild is required"
      : fieldValues.AcademicYearName.length > 100
      ? "Must be less than 101 characters"
      : "";

    temp.AcademicYearCode = !fieldValues.AcademicYearCode
      ? "This feild is required"
      : !fieldValues.AcademicYearCode.trim()
      ? "This feild is required"
      : fieldValues.AcademicYearCode.length > 10
      ? "Must be less than 11 characters"
      : "";

    temp.AcademicYear = !fieldValues.AcademicYear
      ? "This feild is required"
      : !fieldValues.AcademicYear.trim()
      ? "This feild is required"
      : "";
    temp.StartDate = !fieldValues.StartDate ? "This feild is required" : "";
    temp.EndDate = !fieldValues.EndDate ? "This feild is required" : "";

    setErrorsEdit({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.IDAcademicYear === 0) {
      if (validate()) {
        setActive(true);
        dispatch(AcademicYearCreateAction(values, checkboxState));
      }
    } else {
      if (validateEdit()) {
        dispatch(updateSingleAcademicYearAction(values, checkboxState));
      }
    }
  };

  const { academicYearOption } = useSelector(
    (state) => state.getAcademicYearOption
  );

  const { error: academicYearCheckError, success: academicYearCheckSuccess } =
    useSelector((state) => state.getAcademicYearCheck);

  const { available } = academicYearOption;

  if (academicYearCheckError) {
    setErrors((prev) => ({
      ...prev,
      AcademicYearName: academicYearCheckError,
    }));
    dispatch({ type: GET_ACADEMIC_YEAR_CHECK_RESET });
  }
  if (academicYearCheckSuccess) {
    setErrors((prev) => ({ ...prev, AcademicYearName: "" }));
    dispatch({ type: GET_ACADEMIC_YEAR_CHECK_RESET });
  }

  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      setCheckboxState([...checkboxState, e.target.value]);
    } else {
      setCheckboxState([]);
    }
  };

  useEffect(() => {
    if (academicYear) {
      setValues({ ...academicYear });
    }
  }, [academicYear]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="AcademicYearName"
            label="Academic Year Name*"
            value={values.AcademicYearName}
            onFocus={(e) => {
              e.target.select();
            }}
            onBlur={(e) => dispatch(getAcademicYearCheckAction(e.target.value))}
            onChange={handleInputChange}
            errors={errors.AcademicYearName}
          />

          <InputControl
            name="AcademicYearCode"
            label="Academic Year Code*"
            value={values.AcademicYearCode}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.AcademicYearCode}
          />

          <InputControl
            name="AcademicYear"
            label="Academic Year*"
            value={values.AcademicYear}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.AcademicYear}
          />

          <DatePickerControl
            name="StartDate"
            label="Start Date*"
            value={values.StartDate}
            onChange={handleInputChange}
            errors={errors.StartDate}
          />

          <DatePickerControl
            name="EndDate"
            label="End Date*"
            value={values.EndDate}
            onChange={handleInputChange}
            errors={errors.EndDate}
          />

          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Academic Program:</FormLabel>
            {errors.checkboxState && (
              <h4 style={{ color: "red" }}>{errors.checkboxState}</h4>
            )}

            <FormGroup>
              {selected
                ? selected.map((item) => <p> {item.Name}</p>)
                : available.map((item) => (
                    <FormControlLabel
                      key={item.$id}
                      control={
                        <Checkbox
                          onChange={handleChangeCheckbox}
                          value={item.Id}
                        />
                      }
                      label={item.Name}
                    />
                  ))}
            </FormGroup>
          </FormControl>
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

export default AcademicYearForm;
