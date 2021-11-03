import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectSelectedContract } from "../../features/contractsSlice";

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
        <Modal.Title>
          {selectedItem?.company
            ? `Edit ${selectedItem?.company} Information`
            : "Add New Contract"}
        </Modal.Title>
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
          {({ isSubmitting, isValid, values }) => (
            <Form>
              <Form.Group className="mb-3" controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Enter company name" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ContractForm;
