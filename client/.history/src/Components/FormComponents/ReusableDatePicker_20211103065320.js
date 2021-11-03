import { TextField } from "@material-ui/core";
import { useField } from "formik";
import moment from "moment";
import React from "react";

function ReusableDatePicker({ name, ...otherProps }) {
  const [field, meta] = useField(name);
  console.log(field);

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    value: moment(value).format("YYYY-MM-DDTHH:mm"),
    type: "datetime-local",
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
