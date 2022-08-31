import React, { useEffect, useState } from "react";
import { Button, DialogContent, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import { postFcmAction } from "./IndividualNotificationActions";
import DialogFooter from "../../components/DialogFooter";

const IndividualNotificationForm = ({ fcmTokenList, schoolName }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [NewsHeading, setNewsHeading] = useState("");
  const [NewsDescription, setNewsDescription] = useState("");
  const [values, setValues] = useState(false);
  const [errors, setErrors] = useState({});
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.NewsHeading = !fieldValues.NewsHeading
      ? "This feild is required"
      : fieldValues.NewsHeading && fieldValues.NewsHeading?.length > 160
      ? "Must be less than 160 characters"
      : "";

    temp.NewsDescription = !fieldValues.NewsDescription
      ? "This feild is required"
      : fieldValues.NewsDescription && fieldValues.NewsDescription?.length > 160
      ? "Must be less than 160 characters"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleInputChange = () => {
    if (NewsHeading) {
      setNewsHeading(NewsHeading);
    }
  };

  const handleInputsChange = () => {
    if (NewsDescription) {
      setNewsDescription(NewsDescription);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActive(true);
      if (values.IDHREmployee === 0) {
        dispatch(postFcmAction(values, fcmTokenList, schoolName));
      }
    }
  };

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  //uncomment in case of edit but we dont need edit
  // useEffect(() => {
  //   if (announcement) {
  //     setValues({ ...announcement });
  //   }
  // }, [announcement]);
  return (
    <>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={12}>
              <InputControl
                name="NewsHeading"
                label="News Heading*"
                onKeyDown={(e) =>
                  values.NewsHeading?.length > 160 && e.preventDefault()
                }
                onFocus={(e) => {
                  e.target.select();
                }}
                value={values.NewsHeading}
                onChange={handleInputChange}
                errors={errors.NewsHeading}
              />
            </Grid>
            <Grid item xs={12}>
              <InputControl
                name="NewsDescription"
                label="News Description*"
                multiline
                rows={4}
                value={values.NewsDescription}
                onFocus={(e) => {
                  e.target.select();
                }}
                onKeyDown={(e) =>
                  values.NewsDescription?.length > 159 &&
                  e.key !== "Backspace" &&
                  e.preventDefault()
                }
                onChange={handleInputsChange}
                errors={errors.NewsDescription}
              />
              <p style={{ paddingLeft: "10px" }}>
                {" "}
                {160 -
                  (values.NewsDescription
                    ? values?.NewsDescription?.length
                    : 0)}{" "}
                chars left{" "}
              </p>
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
          omClick={handleSubmit}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default IndividualNotificationForm;
