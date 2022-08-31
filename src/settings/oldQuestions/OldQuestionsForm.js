import React, { useState, useEffect } from "react";
import { Button, DialogContent, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import fileValidation from "../../helpers/fileValidation";
import SelectControl from "../../components/controls/SelectControl";
import DialogFooter from "../../components/DialogFooter";
import {
  getSingleCreateOldQuestionsAction,
  getSingleEditOldQuestionsAction,
  postFileUploadOldQuestionsAction,
  postOldQuestionsAction,
  putOldQuestionsAction,
} from "./OldQuestionsActions";
import { API_URL } from "../../constants";

const initialFormValues = {
  Id: 0,
  IDHREmployee: 0,
  Level: 0,
  IDAcademicSubject: 0,
  OldQuestionName: "",
  OldQuestionDescription: "",
  DocumentFile: "",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  IsActive: true,
  Created_On: "2022-02-08T04:46:34.035Z",
  Updated_On: "2022-02-08T04:46:34.035Z",
};

const OldQuestionsForm = ({
  singleCreateOldQuestions,
  setOpenPopup,
  singleEditOldQuestions,
}) => {
  const [active, setActive] = useState(false);
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const dispatch = useDispatch();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.OldQuestionName = !fieldValues.OldQuestionName
      ? "This feild is required"
      : !fieldValues.OldQuestionName.trim()
      ? "This feild is required"
      : "";
    temp.OldQuestionDescription = !fieldValues.OldQuestionDescription
      ? "This feild is required"
      : !fieldValues.OldQuestionDescription.trim()
      ? "This feild is required"
      : "";
    temp.IsActive = !fieldValues.IsActive ? "This feild is required" : "";
    // temp.image = !image
    // ? "This feild is required"
    // : "";

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
        dispatch(postOldQuestionsAction(values, image));
      } else {
        dispatch(
          putOldQuestionsAction(values, image, singleEditOldQuestions.Id)
        );
      }
    }
  };

  const handleImage = (event) => {
    let imageFile = event.target.files[0];
    console.log(imageFile);
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(event.target.files[0]);
  };
  useEffect(() => {
    if (singleCreateOldQuestions) {
      setValues({ ...singleCreateOldQuestions.dbModel });
    }
  }, [singleCreateOldQuestions]);
  useEffect(() => {
    if (singleEditOldQuestions) {
      setValues({ ...singleEditOldQuestions.dbModel });
    }
  }, [singleEditOldQuestions]);

  const test = [{ Key: "", Value: "" }];

  return (
    <>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={6}>
              <InputControl
                name="OldQuestionName"
                label="Old Question Name"
                value={values.OldQuestionName}
                variant="outlined"
                onFocus={(e) => {
                  e.target.select();
                }}
                errors={errors.OldQuestionName}
                onChange={handleInputChange}
              />

              <InputControl
                name="OldQuestionDescription"
                label="Old Question Description"
                value={values.OldQuestionDescription}
                onFocus={(e) => {
                  e.target.select();
                }}
                variant="outlined"
                errors={errors.OldQuestionDescription}
                onChange={handleInputChange}
              />
              <SelectControl
                name="IsActive"
                label="IsActive"
                value={values.IsActive}
                onChange={handleInputChange}
                options={
                  singleCreateOldQuestions
                    ? singleCreateOldQuestions.ddlIsActive
                    : singleEditOldQuestions
                    ? singleEditOldQuestions.ddlIsActive
                    : test
                }
                errors={errors.IsActive}
              />
            </Grid>
            <Grid item xs={6}>
              <InputControl
                name="ImageUploaded"
                // label="Select Profile Photo"
                // value={values.DocumentFile}
                onChange={(e) => fileValidation(e, setImage, setImgSrc)}
                type="file"
                // errors={errors.image}
              />

              <img
                src={
                  imgSrc
                    ? imgSrc
                    : singleEditOldQuestions &&
                      `${API_URL}${singleEditOldQuestions.FullPath}`
                }
                height={200}
                width={200}
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
          onClick={handleSubmit}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default OldQuestionsForm;
