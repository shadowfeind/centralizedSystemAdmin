import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import { putMobileUserAction } from "./MobileUsersActions";

const initialFormValues = {
  FirstName: "",
  MiddleName: "",
  LastName: "",
  FullName: "",
  IDFCMToken: 0,
  IDHREmployee: 0,
  FCMTokenValue: "",
  IDHRCompany: 0,
  IsActive: true,
  Created_On: "2022-05-06T09:06:57.856Z",
  Updated_On: "2022-05-06T09:06:57.856Z",
};

const MobileUsersForm = ({ mobileUser, setOpenPopup }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.FullName = !fieldValues.FullName ? "This Field is Required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setActive(true);
      dispatch(putMobileUserAction(values));
    }
  };

  useEffect(() => {
    if (mobileUser) {
      setValues({ ...mobileUser.dbModel });
    }
  }, [mobileUser]);

  const test = [{ Key: "", Value: "" }];

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container style={{ fontSize: "12px" }}>
          <Grid item xs={6}>
            <InputControl
              name="FullName"
              label="Full Name"
              value={values.FullName}
              onChange={handleInputChange}
              errors={errors.FullName}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectControl
              name="IsActive"
              label="IsActive"
              value={values.IsActive}
              onChange={handleInputChange}
              options={mobileUser ? mobileUser.ddlIsActive : test}
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
    </>
  );
};

export default MobileUsersForm;
