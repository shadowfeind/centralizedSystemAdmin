import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import { deleteEmployeeCategoryRoleAction } from "./EmployeeCategoryRoleActions";

const initialFormValues = {
  IDHREmployeeCategoryRole: 0,
  Heading: "",
  Description: "",
  IsActive: true,
  Created_On: "2012-12-12T00:00:00",
  Updated_On: "2015-04-09T14:20:39.947",
};

const EmployeeCategoryRoleDeleteForm = ({
  employeeCategoryDeleteRole,
  setOpenDeletePopup,
}) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleDelete = (e) => {
    e.preventDefault();
    setActive(true);
    dispatch(deleteEmployeeCategoryRoleAction(values));
  };

  useEffect(() => {
    if (employeeCategoryDeleteRole) {
      setValues({ ...employeeCategoryDeleteRole });
    }
  }, [employeeCategoryDeleteRole]);
  return (
    <Form onSubmit={handleDelete}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            disabled
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
            disabled
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.IsActive}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            disabled
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
          onClick={() => setOpenDeletePopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={active}
          onClick={() =>
            dispatch(
              deleteEmployeeCategoryRoleAction(employeeCategoryDeleteRole)
            )
          }
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "DELETE"}
        </Button>
      </div>
    </Form>
  );
};

export default EmployeeCategoryRoleDeleteForm;
