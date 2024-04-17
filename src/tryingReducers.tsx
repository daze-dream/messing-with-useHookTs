import React, { useReducer, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";

const VALIDATION_FORM_STRING: string = "creamofthecrop";

enum FormActionTypes {
  TEXT_FIELD_CHANGED = "TEXT_FIELD_CHANGED",
  VALIDATION_CHANGED = "VALIDATION_CHANGED",
}

type FormAction = {
  type: FormActionTypes;
  field: keyof FormData;
  payload: any;
};

type FormData = {
  email: string;
  password: string;
  username: string;
  validation: string;
  isValidationCorrect: boolean;
  validationTouched: boolean;
};

function formReducer(previousState: FormData, action: FormAction): FormData {
  console.log("ACTIOn", action.payload);

  switch (action.type) {
    case FormActionTypes.TEXT_FIELD_CHANGED: {
      return {
        ...previousState,
        [action.field]: action.payload,
      };
    }
    case FormActionTypes.VALIDATION_CHANGED: {
      return {
        ...previousState,
        validation: action.payload,
        isValidationCorrect: action.payload === VALIDATION_FORM_STRING,
        validationTouched: true,
      };
    }
    default:
      return previousState;
  }
}

export function ComplexForm(): JSX.Element {
  const initialState: FormData = {
    email: "",
    password: "",
    username: "",
    validation: "",
    isValidationCorrect: false,
    validationTouched: false,
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  function handleTextFieldChange(
    field: keyof FormData,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch({
      type: FormActionTypes.TEXT_FIELD_CHANGED,
      field: field,
      payload: e.target.value,
    });
  }

  function handleValidationFieldChanged(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch({
      type: FormActionTypes.VALIDATION_CHANGED,
      field: "validation",
      payload: e.target.value,
    });
  }
  return (
    <div style={{
      width: '900px'
    }}>
      <FormControl sx={{width: '100%'}}>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: '20px'}}>
          <TextField
            label={"Email"}
            onChange={(e) => handleTextFieldChange("email", e)}
            value={formState.email}
          ></TextField>
          {/* <div style={{ paddingTop: "20px" }}> */}{" "}
          <TextField
            label={"Username"}
            onChange={(e) => handleTextFieldChange("username", e)}
            value={formState.username}
          ></TextField>
          {/* </div> */}
          <TextField
            label={"Password"}
            onChange={(e) => handleTextFieldChange("password", e)}
            value={formState.password}
          ></TextField>
          <TextField
            error={
              !formState.isValidationCorrect && formState.validationTouched
            }
            helperText={
              formState.isValidationCorrect || !formState.validationTouched
                ? " "
                : "Please enter the specified phrase"
            }
            label={"Type 'creamofthecrop'"}
            onChange={(e) => handleValidationFieldChanged(e)}
            value={formState.validation}
          ></TextField>
        </div>
      </FormControl>
    </div>
  );
}

export function ClassicComplexForm(): JSX.Element {
  const [classicFormState, setFormState] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    validation: "",
    isValidationCorrect: false,
    validationTouched: false,
  });

  function handleFieldChanged(field: keyof FormData, value: string) {
    setFormState({
      ...classicFormState,
      [field]: value,
    });
  }

  function handleValidationFieldChanged(value: string) {
    setFormState({
      ...classicFormState,
      validation: value,
      validationTouched: true,
      isValidationCorrect: value === VALIDATION_FORM_STRING,
    });
  }
  return (
    <div>
      <FormControl>
        <TextField
          label={"Email"}
          onChange={(e) => handleFieldChanged("email", e.target.value)}
          value={classicFormState.email}
        ></TextField>
        <TextField
          label={"Username"}
          onChange={(e) => handleFieldChanged("username", e.target.value)}
          value={classicFormState.username}
        ></TextField>
        <TextField
          label={"Password"}
          onChange={(e) => handleFieldChanged("password", e.target.value)}
          value={classicFormState.password}
        ></TextField>
        <TextField
          error={
            !classicFormState.isValidationCorrect &&
            classicFormState.validationTouched
          }
          helperText={
            classicFormState.isValidationCorrect ||
            !classicFormState.validationTouched
              ? " "
              : "Please enter the specified phrase"
          }
          label={"Type 'creamofthecrop'"}
          onChange={(e) => handleValidationFieldChanged(e.target.value)}
          value={classicFormState.validation}
        ></TextField>
      </FormControl>
    </div>
  );
}
