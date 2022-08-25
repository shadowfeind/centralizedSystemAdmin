import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import { roleCreateAction, updateSingleRoleAction } from "./RoleActions";

const initialFormValues = {
  IDHRRole: 0,
  IDHRCompany: 2,
  RoleName: "",
  Description: "",
  IsSystemDefined: true,
  MarkAsAdmin: false,
  Created_On: "2012-12-12T00:00:00",
  Updated_On: "2015-04-09T14:20:39.947",
};

const RoleForm = ({ role, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.RoleName = !fieldValues.RoleName
      ? "This feild is required"
      : !fieldValues.RoleName.trim()
      ? "This feild is required"
      : fieldValues.RoleName.length > 16
      ? "Must be less than 16 characters"
      : "";

    temp.Description = !fieldValues.Description
      ? "This feild is required"
      : !fieldValues.Description.trim()
      ? "This feild is required"
      : fieldValues.Description.length > 200
      ? "Must be less than 201 characters"
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
      if (values.IDHRRole === 0) {
        dispatch(roleCreateAction(values));
      } else {
        dispatch(updateSingleRoleAction(values));
      }
    }
  };

  useEffect(() => {
    if (role) {
      setValues({ ...role });
    }
  }, [role]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="RoleName"
            label="Role Name*"
            disabled
            value={values.RoleName}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.RoleName}
          />

          <CheckBoxControl
            name="IsSystemDefined"
            label="Is System Defined"
            value={values.IsSystemDefined}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            name="Description"
            label="Description*"
            disabled
            value={values.Description}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.Description}
          />
          <CheckBoxControl
            name="MarkAsAdmin"
            label="Mark As Admin"
            value={values.MarkAsAdmin}
            onChange={handleInputChange}
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

export default RoleForm;
