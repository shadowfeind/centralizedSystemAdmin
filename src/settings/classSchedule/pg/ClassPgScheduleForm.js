import React, { useEffect, useState } from "react";
import { Button, DialogContent, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import SelectControl from "../../../components/controls/SelectControl";
import { API_URL } from "../../../constants";
import { putClassScheduleAction } from "./ClassPgScheduleActions";
import fileValidation from "../../../helpers/fileValidation";
import DialogFooter from "../../../components/DialogFooter";

const initialFormValues = {
  Id: 1,
  Area: "Academic Calendar",
  Heading: "PG",
  DocumentName: "",
  IDHREmployee: 0,
  IsActive: true,
  Created_On: "2022-02-06T13:33:17.82",
  Updated_On: "2022-02-06T13:33:17.82",
};
const ClassPgScheduleForm = ({ schedule, setOpenPopup }) => {
  const [image, setImage] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const validate = () => {
    let temp = { ...errors };
    // temp.img = !image ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  useEffect(() => {
    if (schedule) {
      setValues({ ...schedule.dbModel });
    }
  }, [schedule]);

  const test = [{ Key: "", Value: "" }];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setActive(true);
      dispatch(
        putClassScheduleAction(values, image, schedule.searchFilterModel)
      );
    }
  };
  return (
    <>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={6}>
              <SelectControl
                name="IsActive"
                label="IsActive"
                value={values.IsActive}
                onChange={handleInputChange}
                options={schedule ? schedule.ddlIsActive : test}
              />
              <InputControl
                name="ImageUploaded"
                // label="Select File"
                onChange={(e) => fileValidation(e, setImage, setImgSrc)}
                type="file"
                // errors={errors.img}
              />

              <img
                src={
                  imgSrc ? imgSrc : schedule && `${API_URL}${schedule.FullPath}`
                }
                height={200}
                width={200}
              />
            </Grid>
            <Grid item xs={6}></Grid>
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

export default ClassPgScheduleForm;
