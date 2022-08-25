import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import {
  employeeCategoryRoleCreateAction,
  updateSingleEmployeeCategoryRoleAction,
} from "./EmployeeCategoryRoleActions";

const initialFormValues = {
  IDHREmployeeCategoryRole: 0,
  Heading: "",
  Description: "",
  IsActive: true,
  Created_On: "2012-12-12T00:00:00",
  Updated_On: "2015-04-09T14:20:39.947",
};

const EmployeeCategoryRoleForm = ({ employeeCategoryRole, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.Heading = !fieldValues.Heading
      ? "This feild is required"
      : !fieldValues.Heading.trim()
      ? "This feild is required"
      : fieldValues.Heading.length > 20
      ? "Must be less than 20 characters"
      : "";
    temp.Description = !fieldValues.Description
      ? "This feild is required"
      : !fieldValues.Description.trim()
      ? "This feild is required"
      : fieldValues.Description.length > 20
      ? "Must be less than 20 characters"
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
      if (values.IDHREmployeeCategoryRole === 0) {
        dispatch(employeeCategoryRoleCreateAction(values));
      } else {
        dispatch(updateSingleEmployeeCategoryRoleAction(values));
      }
    }
  };

  useEffect(() => {
    if (employeeCategoryRole) {
      setValues({ ...employeeCategoryRole });
    }
  }, [employeeCategoryRole]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="Heading"
            label="Heading*"
            value={values.Heading}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.Heading}
          />

          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            errors={errors.IsActive}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="Description"
            label="Description*"
            value={values.Description}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.Description}
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

export default EmployeeCategoryRoleForm;
