import React from "react";
import { useFormikContext } from "formik";
import { Button } from "react-bootstrap";

function FormSubmitBtn({ children, ...otherProps }) {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };
  const configButton = {
    color: "primary",
    onclick: handleSubmit,
  };
  return <Button {...configButton}>{children}</Button>;
}

export default FormSubmitBtn;
