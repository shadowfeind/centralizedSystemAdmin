import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../../components/controls/InputControl";
import { useForm, Form } from "../../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxControl from "../../../components/controls/CheckBoxControl";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SelectControl from "../../../components/controls/SelectControl";
import { postEcaLookUpAction, putEcaLookUpAction } from "./EcaLookUpActions";

const initialFormValues = {
  IDECA: 0,
  ECAName: "",
  ECADescription: "",
  IDHRCompany: 0,
  IsActive: true,
  Created_On: "2022-03-06T05:07:15.594Z",
  Updated_On: "2022-03-06T05:07:15.594Z",
};

const EcaLookUpForm = ({ ecaLookUp, ecaCreate, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.ECAName = !fieldValues.ECAName
      ? "This field is Required"
      : !fieldValues.ECAName.trim()
      ? "This field is Required"
      : fieldValues.ECAName.length > 20
      ? "Must be Less than 20 Characters"
      : "";

    temp.ECADescription = !fieldValues.ECADescription
      ? "This field is Required"
      : !fieldValues.ECADescription.trim()
      ? "This field is Required"
      : fieldValues.ECADescription.length > 20
      ? "Must be Less than 20 Characters"
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
      if (values.IDECA === 0) {
        dispatch(postEcaLookUpAction(values));
      } else {
        dispatch(putEcaLookUpAction(values));
      }
    }
  };

  useEffect(() => {
    if (ecaLookUp) {
      setValues({ ...ecaLookUp.dbModel });
    }
    if (ecaCreate) {
      setValues({ ...ecaCreate.dbModel });
    }
  }, [ecaLookUp, ecaCreate]);

  const test = [{ Key: "", Values: "" }];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="ECAName"
            label="ECA Name*"
            value={values.ECAName}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.ECAName}
          />
          <InputControl
            name="ECADescription"
            label="ECA Description"
            value={values.ECADescription}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.ECADescription}
          />
          <SelectControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onChange={handleInputChange}
            options={
              ecaCreate
                ? ecaCreate.ddlIsActive
                : ecaLookUp
                ? ecaLookUp.ddlIsActive
                : test
            }
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

export default EcaLookUpForm;
