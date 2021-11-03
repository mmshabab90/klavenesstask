import { TextField } from "@material-ui/core";
import React from "react";

function ReusableDatePicker({ name, ...otherProps }) {
  const configDateTimePicker = {
    type: "date",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };
  return <TextField {...configDateTimePicker} />;
}

export default ReusableDatePicker;
