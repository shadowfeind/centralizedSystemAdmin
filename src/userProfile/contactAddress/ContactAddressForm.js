import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../components/controls/SelectControl";
import { updateSingleContactAddressAction } from "./ContactAddressActions";


const initialFormValues = {
  IDHREmployee: 0,
  PermanentAddressLine1: "",
  PermanentAddressZone: "",
  TemporaryAddressLine1: "",
  TemporaryAddressZone: "",
  PermanentAddressDistrict: "",
  TemporaryAddressDistrict: "",
  PermanentAddressCountry: "",
  TemporaryAddressCountry: "",
  TemporaryTownVillage: "",
  TemporaryWardNo: "",
  PermanentTownVillage: "",
  PermanentWardNo: "",
};

const ContactAddressForm =({contactAddress, setOpenPopup})=>{
    const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.PermanentAddressLine1 = !fieldValues.PermanentAddressLine1
      ? "This feild is required"
      : fieldValues.PermanentAddressLine1.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.PermanentAddressLine1.trim()
      ? "This feild is required"
      : "";

      temp.PermanentAddressZone = !fieldValues.PermanentAddressZone
      ? "This feild is required"
      : "";

      temp.TemporaryAddressLine1 = !fieldValues.TemporaryAddressLine1
      ? "This feild is required"
      : fieldValues.TemporaryAddressLine1.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.TemporaryAddressLine1.trim()
      ? "This feild is required"
      : "";

      temp.TemporaryAddressZone = !fieldValues.TemporaryAddressZone
      ? "This feild is required"
      : "";

      temp.PermanentAddressDistrict = !fieldValues.PermanentAddressDistrict
      ? "This feild is required"
      : fieldValues.PermanentAddressDistrict.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.PermanentAddressDistrict.trim()
      ? "This feild is required"
      : "";

      temp.TemporaryAddressDistrict = !fieldValues.TemporaryAddressDistrict
      ? "This feild is required"
      : fieldValues.TemporaryAddressDistrict.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.TemporaryAddressDistrict.trim()
      ? "This feild is required"
      : "";

      temp.PermanentAddressCountry = !fieldValues.PermanentAddressCountry
      ? "This feild is required"
      : fieldValues.PermanentAddressCountry.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.PermanentAddressCountry.trim()
      ? "This feild is required"
      : "";

      temp.TemporaryAddressCountry = !fieldValues.TemporaryAddressCountry
      ? "This feild is required"
      : fieldValues.TemporaryAddressCountry.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.TemporaryAddressCountry.trim()
      ? "This feild is required"
      : "";

      temp.TemporaryTownVillage = !fieldValues.TemporaryTownVillage
      ? "This feild is required"
      : fieldValues.TemporaryTownVillage.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.TemporaryTownVillage.trim()
      ? "This feild is required"
      : "";

      temp.TemporaryWardNo = !fieldValues.TemporaryWardNo
      ? "This feild is required"
      : fieldValues.TemporaryWardNo.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.TemporaryWardNo.trim()
      ? "This feild is required"
      : "";

      temp.PermanentTownVillage = !fieldValues.PermanentTownVillage
      ? "This feild is required"
      : fieldValues.PermanentTownVillage.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.PermanentTownVillage.trim()
      ? "This feild is required"
      : "";

      temp.PermanentWardNo = !fieldValues.PermanentWardNo
      ? "This feild is required"
      : fieldValues.PermanentWardNo.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.PermanentWardNo.trim()
      ? "This feild is required"
      : "";

      setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } =
  useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(updateSingleContactAddressAction(values));
      // alert("working");
    }
  };  
  useEffect(() => {
    if (contactAddress) {
      setValues({ ...contactAddress.dbModel });
    }
  }, [contactAddress]);
  const symbolsArr = ["e", "E", "+", "-", ".","ArrowUp","ArrowDown"];

  const test = [{Key:"", Value:""}]
  const citizenOption = [{Key:"0", Value:"No"},{Key:"1", Value:"Yes"}]
  

  return(
    <Form onSubmit={handleSubmit}>
    <Grid container style={{ fontSize: "12px" }}>
      <Grid item xs={6}>
        <InputControl
          name="PermanentAddressLine1"
          label="Permanent Address Line 1"
          value={values.PermanentAddressLine1}
          onChange={handleInputChange}
          errors={errors.PermanentAddressLine1}
        />
        <SelectControl
          name="PermanentAddressZone"
          label="Permanent Address Zone"
          value={values.PermanentAddressZone}
          options={contactAddress ? contactAddress.ddlAddressZone: test}
          onChange={handleInputChange}
          errors={errors.PermanentAddressZone}
        />
        <SelectControl
          name="TemporaryAddressZone"
          label="Temporary Address Zone"
          value={values.TemporaryAddressZone}
          options={contactAddress ? contactAddress.ddlAddressZone: test}
          onChange={handleInputChange}
          errors={errors.TemporaryAddressZone}
        />
         <SelectControl
          name="PermanentAddressDistrict"
          label="Permanent Address District"
          value={values.PermanentAddressDistrict}
          options={contactAddress ? contactAddress.ddlAddressDistrict: test}
          onChange={handleInputChange}
          errors={errors.PermanentAddressDistrict}
        />
        <SelectControl
          name="TemporaryAddressDistrict"
          label="Temporary Address District"
          value={values.TemporaryAddressDistrict}
          options={contactAddress ? contactAddress.ddlAddressDistrict: test}
          onChange={handleInputChange}
          errors={errors.TemporaryAddressDistrict}
        />
         </Grid>
        <Grid item xs={6}>
        <SelectControl
          name="PermanentAddressCountry"
          label="Permanent Address Country"
          value={values.PermanentAddressCountry}
          options={contactAddress ? contactAddress.ddlAddressCountry: test}
          onChange={handleInputChange}
          errors={errors.PermanentAddressCountry}
        />
      <SelectControl
          name="TemporaryAddressCountry"
          label="Temporary Address Country"
          value={values.TemporaryAddressCountry}
          options={contactAddress ? contactAddress.ddlAddressCountry: test}
          onChange={handleInputChange}
          errors={errors.TemporaryAddressCountry}
        />
        <InputControl
          name="TemporaryTownVillage"
          label="Temporary Town/Village"
          value={values.TemporaryTownVillage}
          onChange={handleInputChange}
          errors={errors.TemporaryTownVillage}
        />
        <InputControl
          name="TemporaryWardNo"
          label="Temporary Ward No"
          value={values.TemporaryWardNo}
          onChange={handleInputChange}
          onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          errors={errors.TemporaryWardNo}
          type="number"
        />
        <InputControl
          name="PermanentTownVillage"
          label="Permanent Town/Village"
          value={values.PermanentTownVillage}
          onChange={handleInputChange}
          errors={errors.PermanentTownVillage}
        />
        <InputControl
          name="PermanentWardNo"
          label="Permanent Ward No"
          value={values.PermanentWardNo}
          onChange={handleInputChange}
          onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          errors={errors.PermanentWardNo}
          type="number"
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
          style={{ margin: "10px 0 0 10px" }}
        >
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};
export default ContactAddressForm;