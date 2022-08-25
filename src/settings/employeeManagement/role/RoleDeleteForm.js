import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";
import { deleteRoleAction } from "./RoleActions";

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

const RoleDeleteForm = ({ deleteRole, setOpenDeletePopup }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleDelete = (e) => {
    e.preventDefault();
    setActive(true);
    dispatch(deleteRoleAction(values));
  };

  useEffect(() => {
    if (deleteRole) {
      setValues({ ...deleteRole });
    }
  }, [deleteRole]);
  return (
    <Form onSubmit={handleDelete}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            disabled
            name="RoleName"
            label="Role Name*"
            value={values.RoleName}
            onChange={handleInputChange}
          />

          <CheckBoxControl
            disabled
            name="IsSystemDefined"
            label="Is System Defined"
            value={values.IsSystemDefined}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputControl
            disabled
            name="Description"
            label="Description*"
            value={values.Description}
            onChange={handleInputChange}
          />
          <CheckBoxControl
            disabled
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
          onClick={() => setOpenDeletePopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={active}
          onClick={() => dispatch(deleteRoleAction(deleteRole))}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "DELETE"}
        </Button>
      </div>
    </Form>
  );
};

export default RoleDeleteForm;
