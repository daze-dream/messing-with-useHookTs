import React, { useReducer } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from "@mui/material";

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

function ComplexForm(): JSX.Element {
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
    <div>
      <FormControl>
        <TextField
          label={"Email"}
          onChange={(e) => handleTextFieldChange("email", e)}
          value={formState.email}
        ></TextField>
        <TextField
          label={"Username"}
          onChange={(e) => handleTextFieldChange("username", e)}
          value={formState.username}
        ></TextField>
        <TextField
          label={"Password"}
          onChange={(e) => handleTextFieldChange("password", e)}
          value={formState.password}
        ></TextField>
        <TextField
          error={!formState.isValidationCorrect}
          helperText={ !formState.isValidationCorrect && "Please enter the specified phrase"}
          label={"Type 'creamofthecrop'"}
          onChange={(e) => handleValidationFieldChanged(e)}
          value={formState.validation}
        ></TextField>
      </FormControl>
    </div>
  );
}

export default ComplexForm;
