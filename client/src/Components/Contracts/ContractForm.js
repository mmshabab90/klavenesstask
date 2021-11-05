import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button, Modal, ButtonGroup } from "react-bootstrap";
import {
  selectSelectedContract,
  setAddContract,
  setDeleteContract,
  setUpdateContract,
} from "../../features/contractsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Grid, MenuItem } from "@material-ui/core";
import ReusableTextField from "../FormComponents/ReusableTextField";
import ReusableSelect from "./../FormComponents/ReusableSelect";
import ReusableDatePicker from "../FormComponents/ReusableDatePicker";
import moment from "moment";
import FormSubmitBtn from "../FormComponents/FormSubmitBtn";
import api from "../../api/contracts";

function ContractForm({ show, handleClose }) {
  const dispatch = useDispatch();
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

  const handleOnSubmit = async (values) => {
    if (selectedItem) {
      const response = await api.put(`/contracts/${selectedItem.id}`, values);
      dispatch(setUpdateContract(response.data));
      handleClose();
    } else {
      const randInt = Math.floor(Math.random() * 1000000000);
      const request = {
        id: randInt,
        contractId: JSON.stringify(randInt),
        ...values,
      };

      const response = await api.post("/contracts", request);
      dispatch(setAddContract(response.data));
      handleClose();
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/contracts/${id}`);
    dispatch(setDeleteContract(id));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedItem?.company
            ? `Edit ${selectedItem.company} Information`
            : "Add New Contract"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          {({ values }) => (
            <Form>
              <ReusableTextField name="company" label="Company Name" />

              <ReusableSelect
                name="scheduledForRenewal"
                label="Scheduled For Renewal"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </ReusableSelect>

              <ReusableDatePicker
                name="periodStart"
                label="Contract Start Date"
                value={moment(values.periodStart || new Date()).format(
                  "YYYY-MM-DDTHH:mm"
                )}
              />

              <ReusableDatePicker
                name="periodEnd"
                label="Contract End Date"
                value={moment(values.periodEnd || new Date()).format(
                  "YYYY-MM-DDTHH:mm"
                )}
              />

              <ReusableDatePicker
                name="negotiationRenewalDate"
                label="Negotiation Renewal Date"
                value={moment(
                  values.negotiationRenewalDate || new Date()
                ).format("YYYY-MM-DDTHH:mm")}
              />
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                style={{ marginTop: 15 }}
              >
                <Grid
                  item
                  xs={6}
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  {selectedItem && (
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(selectedItem.id)}
                    >
                      Delete
                    </Button>
                  )}
                </Grid>
                <Grid
                  item
                  xs={6}
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <ButtonGroup>
                    <Button variant="outline-secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <FormSubmitBtn variant="outline-primary">
                      {selectedItem ? "Save Changes" : "Submit"}
                    </FormSubmitBtn>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ContractForm;
