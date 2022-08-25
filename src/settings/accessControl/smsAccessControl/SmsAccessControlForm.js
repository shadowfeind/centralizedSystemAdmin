import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import {
  postSmsAccessControlAction,
  putSmsAccessControlAction,
} from "./SmsAccessControlActions";

const initialFormValues = {
  IDSMSControl: 0,
  SMSHeader: "",
  IDHRCompany: 0,
  IsActive: true,
  Created_On: "2022-04-07T09:45:04.882Z",
  Updated_On: "2022-04-07T09:45:04.882Z",
};

const SmsAccessControlForm = ({ smsCreate, setOpenPopup, smsEdit }) => {
  // const [smsHeader, setsmsHeader] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.SMSHeader = !fieldValues.SMSHeader ? "This Field is Required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setActive(true);
      if (values.IDSMSControl === 0) {
        dispatch(postSmsAccessControlAction(values));
      } else {
        dispatch(putSmsAccessControlAction(values));
      }
    }
  };

  useEffect(() => {
    if (smsEdit) {
      setValues({ ...smsEdit.dbModel });
    }
  }, [smsEdit]);

  useEffect(() => {
    if (smsCreate) {
      setValues({ ...smsCreate.dbModel });
    }
  }, [smsCreate]);

  const test = [{ Key: "", Value: "" }];

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container style={{ fontSize: "12px" }}>
          <Grid item xs={6}>
            <SelectControl
              name="SMSHeader"
              label="SMS Header"
              value={values.SMSHeader}
              onChange={handleInputChange}
              options={
                smsEdit
                  ? smsEdit.ddlSMSAccessControl
                  : smsCreate
                  ? smsCreate.ddlSMSAccessControl
                  : test
              }
              errors={errors.SMSHeader}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectControl
              name="IsActive"
              label="IsActive"
              value={values.IsActive}
              onChange={handleInputChange}
              options={
                smsEdit
                  ? smsEdit.ddlIsActive
                  : smsCreate
                  ? smsCreate.ddlIsActive
                  : test
              }
              errors={errors.IsActive}
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

export default SmsAccessControlForm;
