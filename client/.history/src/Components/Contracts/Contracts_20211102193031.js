import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput, setData } from "../../features/userSlice";
import {
  Badge,
  Button,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import moment from "moment";
import { LinearProgress } from "@material-ui/core";

export default function Contracts() {
  const searchInput = useSelector(selectSearchInput);
  const apiContractsUrl = "http://localhost:1337/contracts";
  const dispatch = useDispatch();
  const [contracts, setContracts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

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
          <h1 style={{ marginBottom: 25, marginTop: 5 }}>Contracts</h1>
        </Col>
        <Col xs={4} sm={4} md={2}>
          <Button variant="outline-success" className="m-2">
            Add New
          </Button>
        </Col>
      </Row>
      {loading && <LinearProgress color="secondary" />}
      <Row xs={1} md={3} className="g-4 contracts_list">
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
            <Col key={`item-${idx}-${obj.company}`}>
              <Card border="secondary" style={{ width: "22rem" }}>
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
                    <Button variant="outline-primary" size="lg">
                      Edit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
