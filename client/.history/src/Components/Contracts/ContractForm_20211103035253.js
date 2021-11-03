import React from "react";
import * as Yup from "yup";
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
    negotiationRenewalDate: Yup.date.required(
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
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
