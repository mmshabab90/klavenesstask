import React from "react";
import api from "../../api/contracts";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput } from "../../features/userSlice";
import {
  Badge,
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import moment from "moment";
import { LinearProgress } from "@material-ui/core";
import ContractForm from "./ContractForm";
import {
  selectContracts,
  setContracts,
  setIsLoading,
  setSelectedContract,
} from "../../features/contractsSlice";

export default function Contracts() {
  const searchInput = useSelector(selectSearchInput);
  const dispatch = useDispatch();
  const contracts = useSelector(selectContracts);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);

  const handelShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    dispatch(setSelectedContract(null));
    setShowModal(false);
  };

  const handleEdit = (obj) => {
    dispatch(setSelectedContract(obj));
    setShowModal(true);
  };

  // Get all contracts
  const retreiveContracts = async () => {
    const response = await api.get("/contracts");
    return response.data;
  };

  React.useEffect(() => {
    const getAllContracts = async () => {
      const allContracts = await retreiveContracts();
      if (allContracts) {
        dispatch(setContracts(allContracts));
        dispatch(setIsLoading(false));
        setLoading(false);
      }
    };
    getAllContracts();
    return () => {
      setLoading(true);
    };
  }, [dispatch]);

  return (
    <Container>
      <div class="d-flex justify-content-between">
        <h1 style={{ marginBottom: 25, marginTop: 10 }}>Contracts</h1>
        <Button
          variant="outline-success"
          className="m-2"
          onClick={handelShowModal}
        >
          Add New
        </Button>
      </div>
      
      {loading && <LinearProgress color="secondary" />}
      <Row xs={1} md={2} lg={3} className="g-4">
        {contracts &&
          contracts.length > 0 &&
          contracts
            .filter((item) => {
              if (searchInput === "") {
                return item;
              } else if (
                item.company.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return item;
              }
            })
            .sort((a, b) => parseInt(b.contractId) - parseInt(a.contractId))
            .map((obj, idx) => (
              <Col key={`item-${idx}-${obj.company}`}>
                <Card border="secondary">
                  <Card.Body>
                    <Card.Title>
                      {obj.company}
                      <span style={{ marginLeft: 5 }}>
                        {obj.scheduledForRenewal ? (
                          <Badge bg="success">Renew: Yes</Badge>
                        ) : (
                          <Badge bg="danger">Renew: No</Badge>
                        )}
                      </span>
                    </Card.Title>
                  </Card.Body>

                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      Period Start
                      <Badge style={{ margin: 5 }} bg="info">
                        {moment(obj.periodStart).format("LLL")}
                      </Badge>
                    </ListGroupItem>
                    <ListGroupItem>
                      Period End
                      <Badge style={{ margin: 5 }} bg="danger">
                        {moment(obj.periodEnd).format("LLL")}
                      </Badge>
                    </ListGroupItem>
                    <ListGroupItem>
                      Renew On
                      <Badge style={{ margin: 5 }} bg="warning">
                        {moment(obj.negotiationRenewalDate).format("LLL")}
                      </Badge>
                    </ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <div className="d-grid gap-2">
                      <ButtonGroup>
                        <Button
                          variant="outline-primary"
                          size="lg"
                          onClick={() => handleEdit(obj)}
                        >
                          Edit
                        </Button>
                      </ButtonGroup>
                    </div>
                  </Card.Body>

                  <Card.Footer>Contract# {obj.contractId}</Card.Footer>
                </Card>
              </Col>
            ))}
      </Row>

      <ContractForm show={showModal} handleClose={handleCloseModal} />
    </Container>
  );
}
