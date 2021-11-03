import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput, setData } from "../../features/userSlice";
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
  CardGroup,
} from "react-bootstrap";
import moment from "moment";
import { LinearProgress } from "@material-ui/core";
import ContractForm from "./ContractForm";
import { setSelectedContract } from "../../features/contractsSlice";

export default function Contracts() {
  const searchInput = useSelector(selectSearchInput);
  const apiContractsUrl = "http://localhost:1337/contracts";
  const dispatch = useDispatch();
  const [contracts, setContracts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handelShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = (obj) => {
    dispatch(setSelectedContract(obj));
    setShowModal(true);
  };

  React.useEffect(() => {
    axios
      .get(apiContractsUrl)
      .then((res) => {
        dispatch(setData(res.data));
        setContracts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
    return () => {
      setContracts([]);
      setLoading(true);
    };
  }, [searchInput, dispatch]);

  console.log(error);
  return (
    <Container>
      <Row xs={8} md={8}>
        <Col xs={8} sm={8} md={10}>
          <h1 style={{ marginBottom: 25, marginTop: 10 }}>Contracts</h1>
        </Col>
        <Col xs={4} sm={4} md={2}>
          <Button
            variant="outline-success"
            className="m-2"
            onClick={handelShowModal}
          >
            Add New
          </Button>
        </Col>
      </Row>
      {loading && <LinearProgress color="secondary" />}
      <CardGroup>
        {contracts
          .filter((item) => {
            if (searchInput === "") {
              return item;
            } else if (
              item.company.toLowerCase().includes(searchInput.toLowerCase())
            ) {
              return item;
            }
          })
          .map((obj, idx) => (
            <Card border="secondary" key={`item-${idx}-${obj.company}`}>
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
                    <Button variant="outline-danger" size="lg">
                      Delete
                    </Button>
                  </ButtonGroup>
                </div>
              </Card.Body>
            </Card>
          ))}
      </CardGroup>

      <ContractForm show={showModal} handleClose={handleCloseModal} />
    </Container>
  );
}
