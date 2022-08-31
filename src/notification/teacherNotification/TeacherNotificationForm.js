import React, { useEffect, useState } from "react";
import { Button, DialogContent, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { makeStyles } from "@material-ui/styles";
import { postTeacherNotificationAction } from "./TeacherNotificationActions";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import DialogFooter from "../../components/DialogFooter";

const initialFormValues = {
  IDTeacherNotification: 0,
  SenderID: 0,
  ReceiverID: 0,
  MessageHeading: "",
  MessageDescription: "",
  IDHRCompany: 0,
  IsActive: true,
  Created_On: "2022-03-23T06:49:58.370Z",
  Updated_On: "2022-03-23T06:49:58.370Z",
};

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TeacherNotificationForm = ({
  setOpenPopup,
  fcmTokenList,
  SchoolShortName,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [active, setActive] = useState();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.MessageHeading = !fieldValues.MessageHeading
      ? "This Field is Required"
      : fieldValues.MessageHeading && fieldValues.MessageHeading?.length > 160
      ? "Must be less than 160 characters"
      : "";
    temp.MessageDescription = !fieldValues.MessageDescription
      ? "This Field is Required"
      : fieldValues.MessageDescription &&
        fieldValues.MessageDescription?.length > 160
      ? "Must be less than 160 characters"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setActive(true);
      dispatch(
        postTeacherNotificationAction(values, fcmTokenList, SchoolShortName)
      );
    }
  };

  return (
    <>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={12}>
              <InputControl
                name="MessageHeading"
                label="Message Heading"
                onFocus={(e) => {
                  e.target.select();
                }}
                value={values.MessageHeading}
                onChange={handleInputChange}
                errors={errors.MessageHeading}
              />
            </Grid>
            <Grid item xs={12}>
              <InputControl
                name="MessageDescription"
                label="Message Descriptions"
                multiline
                rows={4}
                onFocus={(e) => {
                  e.target.select();
                }}
                onKeyDown={(e) =>
                  values.MessageDescription?.length > 159 &&
                  e.key !== "Backspace" &&
                  e.preventDefault()
                }
                value={values.MessageDescription}
                onChange={handleInputChange}
                errors={errors.MessageDescription}
              />
              <p style={{ paddingLeft: "10px" }}>
                {" "}
                {160 -
                  (values.MessageDescription
                    ? values?.MessageDescription?.length
                    : 0)}{" "}
                chars left{" "}
              </p>
              <CheckBoxControl
                name="IsActive"
                label="IsActive"
                value={values.IsActive}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
      <DialogFooter>
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
          onCLick={handleSubmit}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default TeacherNotificationForm;
