import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button, Modal, ButtonGroup } from "react-bootstrap";
import { selectSelectedContract } from "../../features/contractsSlice";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import ReusableTextField from "../FormComponents/ReusableTextField";
import ReusableSelect from "./../FormComponents/ReusableSelect";

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

  const getCurrentDate = () => {
    const date = moment();
    return date.format("YYYY-MM-DDTHH:mm");
  };

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
            <Form onSubmit={handleSubmit}>
              <ReusableTextField name="company" label="Company Name" />

              <ReusableSelect name="scheduledForRenewal" label="Renewal Status">
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </ReusableSelect>
              <FormControl style={{ width: "100%", marginBottom: 10 }}>
                <InputLabel id="select-renewal-status">
                  Scheduled For Renew
                </InputLabel>
                <Select
                  native
                  labelId="select-renewal-status"
                  id="renewalStatus-select"
                  name="scheduledForRenewal"
                  value={values.scheduledForRenewal}
                  onChange={handleChange}
                  inputProps={{
                    name: "scheduledForRenewal",
                    id: "outlined-scheduledForRenewal-native-simple",
                  }}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
              </FormControl>

              <TextField
                id="start-date"
                label="Period Start"
                type="datetime-local"
                name="periodStart"
                defaultValue={moment(values.periodStart).format(
                  "YYYY-MM-DDTHH:mm"
                )}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "100%" }}
              />

              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                style={{ marginTop: 15 }}
              >
                <Grid item sm={6}></Grid>
                <Grid
                  item
                  sm={6}
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <ButtonGroup>
                    <Button variant="outline-secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="outline-primary" onClick={handleSubmit}>
                      Save Changes
                    </Button>
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
