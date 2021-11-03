import React from "react";
import { useFormikContext } from "formik";
import { Button } from "react-bootstrap";

function FormSubmitBtn({ children, ...otherProps }) {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };
  const configButton = {
    variant: "outline-primary",
    color: "primary",
    onClick: handleSubmit,
  };
  return <Button {...configButton}>{children}</Button>;
}

export default FormSubmitBtn;
