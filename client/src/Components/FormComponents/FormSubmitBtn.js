import React from "react";
import { useFormikContext } from "formik";
import { Button } from "react-bootstrap";

function FormSubmitBtn({ children, ...otherProps }) {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };
  const btnConfig = {
    variant: "outline-primary",
    color: "primary",
    onClick: handleSubmit,
  };
  return <Button {...btnConfig}>{children}</Button>;
}

export default FormSubmitBtn;
