import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
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
    company: Yup.string("Enter Company Name").required(
      "Company name is required"
    ),
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { initialValues },
    validationSchema: { validationSchema },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Contract</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormControlLabel
            value={formik.scheduledForRenewal}
            checked={formik.values.scheduledForRenewal}
            onChange={formik.handleChange}
            name="scheduledForRenewal"
            control={<Switch color="primary" />}
            label="Scheduled For Renewal"
            inputProps={{ "aria-label": "primary checkbox" }}
            labelPlacement="start"
          />

          <TextField
            fullWidth
            id="company"
            name="company"
            label="Company Name"
            value={formik.values.company}
            onChange={formik.handleChange}
            error={formik.touched.company && Boolean(formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ContractForm;
