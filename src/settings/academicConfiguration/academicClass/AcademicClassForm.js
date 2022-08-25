import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import {
  academicClassCreateAction,
  updateSingleAcademicClassAction,
} from "./AcademicClassActions";

const initialFormValues = {
  IDClass: 0,
  IDHRCompany: 2,
  ClassName: "",
  ClassLocation: "",
  IsActive: true,
  Created_On: "2021-09-23T03:44:16.140Z",
  Updated_On: "2021-09-23T03:44:16.141Z",
};

const AcademicClassForm = ({ academicClass, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.ClassName = !fieldValues.ClassName
      ? "This feild is required"
      : !fieldValues.ClassName.trim()
      ? "This feild is required"
      : fieldValues.ClassName.length > 20
      ? "Must be less than 21 characters"
      : "";
    temp.ClassLocation = !fieldValues.ClassLocation
      ? "This field is required"
      : !fieldValues.ClassLocation.length > 200
      ? "Must be less than 501 characters"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActiveButton(true);
      if (values.IDClass === 0) {
        dispatch(academicClassCreateAction(values));
      } else {
        dispatch(updateSingleAcademicClassAction(values));
      }
    }
  };

  useEffect(() => {
    if (academicClass) {
      setValues({ ...academicClass });
    }
  }, [academicClass]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="ClassName"
            label="Class Name*"
            value={values.ClassName}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.ClassName}
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
            name="ClassLocation"
            label="Class Location"
            onFocus={(e) => {
              e.target.select();
            }}
            value={values.ClassLocation}
            onChange={handleInputChange}
            errors={errors.ClassLocation}
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
          disabled={activeButton}
          style={{ margin: "10px 0 0 10px" }}
        >
          {activeButton ? "PROCESSING" : "SUBMIT"}
        </Button>
      </div>
    </Form>
  );
};

export default AcademicClassForm;
