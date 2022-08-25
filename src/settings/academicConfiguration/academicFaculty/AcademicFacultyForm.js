import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import { symbolsArrPhone } from "../../../helpers/excludeSymbol";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  AcademicFacultyCreateAction,
  updateSingleAcademicFacultyAction,
} from "./AcademicFacultyActions";
import SelectControl from "../../../components/controls/SelectControl";

const initialFormValues = {
  IDFaculty: 0,
  IDHRCompany: 0,
  Header: "",
  TotalSeat: "",
  LevelMOU: "",
  TotalSection: "",
  TotalLevel: "",
  IDFacultyCoordinator: "",
  IsActive: true,
  Created_On: "2021-09-23",
  Updated_On: "2021-09-23",
};

const AcademicFacultyForm = ({ academicFaculty, selected, setOpenPopup }) => {
  const [checkboxState, setCheckboxState] = useState([]);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.Header = !fieldValues.Header
      ? "This feild is required"
      : !fieldValues.Header.trim()
      ? "This feild is required"
      : fieldValues.Header.length > 100
      ? "Must be less than 101 characters"
      : "";

    temp.TotalSeat = !fieldValues.TotalSeat ? "This feild is required" : "";

    temp.LevelMOU = !fieldValues.LevelMOU ? "This feild is required" : "";

    temp.TotalSection = !fieldValues.TotalSection
      ? "This feild is required"
      : "";
    temp.TotalLevel = !fieldValues.TotalLevel ? "This feild is required" : "";
    temp.IDFacultyCoordinator = !fieldValues.IDFacultyCoordinator
      ? "This feild is required"
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
      if (values.IDFaculty === 0) {
        dispatch(AcademicFacultyCreateAction(values, checkboxState));
      } else {
        // dispatch(updateSingleAcademicFacultyAction(values));
        alert("Working");
      }
    }
  };

  const { academicFacultyOption } = useSelector(
    (state) => state.getAcademicFacultyOption
  );

  const { available, ddlLevelMOU, ddlSection, ddlLevel, ddlStaff } =
    academicFacultyOption;

  const handleChangeCheckbox = (e) => {
    setCheckboxState([...checkboxState, e.target.value]);
  };

  useEffect(() => {
    if (academicFaculty) {
      setValues({ ...academicFaculty });
    }
  });

  useEffect(() => {
    if (academicFacultyOption) {
      setValues(academicFacultyOption.dbModel);
      console.log("hello", academicFacultyOption);
    }
    console.log("test", academicFacultyOption);
  }, [academicFacultyOption]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="Header"
            label="Faculty Header*"
            value={values.Header}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.Header}
          />
          <InputControl
            name="TotalSeat"
            label="TotalSeat"
            value={values.TotalSeat}
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            onKeyDown={(e) =>
              symbolsArrPhone.includes(e.key) && e.preventDefault()
            }
            onChange={handleInputChange}
            errors={errors.TotalSeat}
            type="number"
          />
          <SelectControl
            name="LevelMOU"
            label="Level MOU"
            value={values.LevelMOU}
            onChange={handleInputChange}
            options={ddlLevelMOU}
            errors={errors.LevelMOU}
          />
          <SelectControl
            name="TotalSection"
            label="Total Section"
            value={values.TotalSection}
            onChange={handleInputChange}
            options={ddlSection}
            errors={errors.TotalSection}
          />
          <SelectControl
            name="TotalLevel"
            label="Total Level"
            value={values.TotalLevel}
            onChange={handleInputChange}
            options={ddlLevel}
            errors={errors.TotalLevel}
          />
          <SelectControl
            name="IDFacultyCoordinator"
            label="Faculty Coordinator"
            value={values.IDFacultyCoordinator}
            onChange={handleInputChange}
            options={ddlStaff}
            errors={errors.IDFacultyCoordinator}
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
            <FormLabel component="legend">Academic Program</FormLabel>
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

export default AcademicFacultyForm;
