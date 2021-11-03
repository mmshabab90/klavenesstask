import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import { selectSelectedContract } from "../../features/contractsSlice";
import { useSelector } from "react-redux";
import { FormControlLabel, Switch, TextField } from "@material-ui/core";

function ContractForm({ show, handleClose }) {
  const selectedItem = useSelector(selectSelectedContract);
  const initialValues = selectedItem ?? {
    company: "",
    periodStart: "",
    periodEnd: "",
    scheduledForRenewal: "",
    negotiationRenewalDate: "",
  };

  const validationSchema = Yup.object({
    company: Yup.string().required("Company name is required"),
    periodStart: Yup.date().required(
      "Need the starting date and time for the period"
    ),
    periodEnd: Yup.date().required(
      "Need the ending date and time for the period"
    ),
    scheduledForRenewal: Yup.boolean().required("Field must be selected"),
    negotiationRenewalDate: Yup.date().required(
      "Date and time for renewal notification is required"
    ),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Contract</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({
            isSubmitting,
            values,
            touched,
            handleSubmit,
            handleChange,
            errors,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="company"
                name="company"
                label="Company Name"
                value={values.company}
                onChange={handleChange}
                error={touched.company && Boolean(errors.company)}
                helperText={touched.company && errors.company}
              />
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default ContractForm;