import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ReactDatePicker from "react-datepicker";

import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

let RENDER_COUNT = 0;

export const validDataTypesArray = [
  "string",
  "boolean",
  "object",
  "number",
  "date",
] as const;
export type ValidDataTypes = (typeof validDataTypesArray)[number];

type Field = {
  label: string;
  name: string;
  defaultValue: any;
  dataType: ValidDataTypes;
  queryId: string;
  visibleInUI: boolean;
};

type FormInputs = Omit<Field, "dataType"> & {
  dataType: { label: string; value: ValidDataTypes };
};

function BigForm() {
  const [generatedField, setGeneratedField] = React.useState<Field | undefined>(
    undefined
  );
  const formHook = useForm<FormInputs>({
    mode: "onBlur",
    defaultValues: {
      dataType: { label: "Boolean", value: "boolean" },
      visibleInUI: true,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setGeneratedField({ ...data, dataType: data.dataType.value });
    console.log(data);
  };

  const options = validDataTypesArray.map((type) => {
    return {
      label: type.charAt(0).toUpperCase() + type.slice(1),
      value: type,
    };
  });
  const watchDataType = formHook.watch("dataType");
  RENDER_COUNT++;
  return (
    <div>
      <Typography sx={{ padding: "1rem 0rem" }} variant="h3">
        Field Generator
      </Typography>
      <Typography>Render Count: {RENDER_COUNT}</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div>
          <form
            onSubmit={formHook.handleSubmit(onSubmit)}
            onBlur={formHook.handleSubmit(onSubmit)}
          >
            <Typography>Field Label</Typography>
            <Controller
              name={"label"}
              control={formHook.control}
              render={(c) => {
                return <TextField {...c.field} />;
              }}
            />
            <Typography>Mapped Property</Typography>
            <Controller
              name={"name"}
              control={formHook.control}
              rules={{ required: true }}
              render={(c) => {
                return <TextField {...c.field} />;
              }}
            />
            <Typography>Data Type</Typography>
            <Controller
              name="dataType"
              //   defaultValue={{label: 'Boolean', value: 'boolean'}}
              control={formHook.control}
              render={(c) => {
                return (
                  <Autocomplete
                    {...c.field}
                    disableClearable
                    isOptionEqualToValue={(o, v) => o.value === v.value}
                    getOptionLabel={(option) => option.label}
                    onChange={(_e, data) => {
                      formHook.setValue("defaultValue", undefined);
                      c.field.onChange(data);
                    }}
                    options={options}
                    renderInput={(params) => (
                      <TextField {...params} label="Data Type" />
                    )}
                  />
                );
              }}
            />
            <Typography>Default Value</Typography>
            <Controller
              name="defaultValue"
              rules={{
                validate: (value) => {
                  console.log("validating");
                  if (watchDataType.value === "object") {
                    try {
                      JSON.parse(value);
                      return true;
                    } catch (e) {
                      console.log("bad json");
                      return false;
                    }
                  }
                  return true;
                },
              }}
              control={formHook.control}
              render={(c) => {
                switch (watchDataType.value) {
                  case "object":
                  case "string":
                    return <TextField {...c.field} />;

                  case "number":
                    // <input type="number"/>
                    return <NumberInput {...c.field} />;
                  case "boolean":
                    return (
                      <RadioGroup {...c.field} aria-label="true-false">
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="True"
                        />

                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="False"
                        />
                        {/* <FormControlLabel
                          value={undefined}
                          control={<Radio />}
                          label="None"
                        /> */}
                      </RadioGroup>
                    );
                  case "date":
                    return <ReactDatePicker {...c.field} />;
                }
              }}
            />

            <Controller
              name="visibleInUI"
              //   defaultValue={false}
              control={formHook.control}
              render={(c) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox {...c.field} checked={c.field.value} />
                    <Typography>Show in UI?</Typography>
                  </div>
                );
              }}
            />
            <button type="submit">Generate</button>
          </form>
        </div>
        <div style={{}}>
          <TextField
            placeholder="generated value appears here"
            fullWidth
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
              width: "700px",
            }}
            multiline={true}
            disabled
            rows={5}
            value={generatedField ? JSON.stringify(generatedField) : undefined}
            onChange={() => {}}
          ></TextField>
        </div>
      </div>
    </div>
  );
}

export default BigForm;
