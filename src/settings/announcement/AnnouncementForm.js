import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import {
  announcementCreateAction,
  updateSingleAnnouncementAction,
} from "./AnnouncementAction";

const initialFormValues = {
  Id: 0,
  NewsHeading: "",
  NewsDescription: "",
  PostedBy: "",
  EffectiveFrom: "2022-01-27T04:45:28.146Z",
  IDHRCompany: 0,
  NoticeImage: "",
  IDHREmployee: 0,
  IsActive: true,
  SchoolShortName: "",
  Created_On: "2022-01-27T04:45:28.146Z",
  Updated_On: "2022-01-27T04:45:28.146Z",
};

const AnnouncementForm = ({
  list,
  announcement,
  setOpenPopup,
  fcmTokenList,
  schoolName,
}) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
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

    temp.IsActive = !fieldValues.IsActive ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActive(true);
      if (values.IDHREmployee === 0) {
        dispatch(announcementCreateAction(values, fcmTokenList, schoolName));
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
            onChange={handleInputChange}
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
        <CheckBoxControl
          name="IsActive"
          label="IsActive"
          value={values.IsActive}
          onChange={handleInputChange}
          errors={errors.IsActive}
        />
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

export default AnnouncementForm;
