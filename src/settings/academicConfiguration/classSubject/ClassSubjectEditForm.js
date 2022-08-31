import React, { useState, useEffect } from "react";
import { Button, DialogContent, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { symbolsArrPhone } from "../../../helpers/excludeSymbol";
import { updateSingleClassSubjectAction } from "./ClassSubjectActions";
import DialogFooter from "../../../components/DialogFooter";

const initialFormValues = {
  IDClassSubject: 0,
  IDAcademicSubject: 0,
  CreditHour: 0,
  FacultyLevel: 0,
  IsActive: true,
  Created_On: "2022-01-09T12:32:46.53",
  Updated_On: "2022-01-09T12:32:46.53",
};

const ClassSubjectEditForm = ({ singleClassSubject, setOpenPopupForm }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.CreditHour = fieldValues.CreditHour ? "" : "This feild is required";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setActive(true);
      dispatch(updateSingleClassSubjectAction(values));
      setOpenPopupForm(false);
    }
  };

  useEffect(() => {
    if (singleClassSubject) {
      setValues({ ...singleClassSubject });
    }
  }, [singleClassSubject]);
  return (
    <>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={6}>
              <InputControl
                disabled
                name="IsActive"
                label="IsActive"
                value={values.IsActive}
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <InputControl
                name="CreditHour"
                label="Credit Hour"
                onChange={handleInputChange}
                onFocus={(e) => {
                  e.target.select();
                }}
                onKeyDown={(e) =>
                  symbolsArrPhone.includes(e.key) && e.preventDefault()
                }
                onWheelCapture={(e) => {
                  e.target.blur();
                }}
                value={values.CreditHour}
                type="number"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
      <DialogFooter>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopupForm(false)}
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
          onClick={handleSubmit}
        >
          {active ? "PROCESSING" : "SUBMIT"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default ClassSubjectEditForm;
