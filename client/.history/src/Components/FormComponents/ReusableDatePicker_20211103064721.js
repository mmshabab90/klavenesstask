import { TextField } from "@material-ui/core";
import { useField } from "formik";
import React from "react";

function ReusableDatePicker({ name, ...otherProps }) {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: "date",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker} style={{ marginBottom: 10 }} />;
}

export default ReusableDatePicker;
