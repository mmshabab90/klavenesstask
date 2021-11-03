import React from "react";

import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

function ReusableSelect({ name, options, children, ...otherProps }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };
  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }
  return (
    <TextField {...configSelect} style={{ marginBottom: 5 }}>
      {children}
    </TextField>
  );
}

export default ReusableSelect;
