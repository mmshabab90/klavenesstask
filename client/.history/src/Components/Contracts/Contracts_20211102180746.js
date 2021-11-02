import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput, setData } from "../../features/userSlice";
import { Container, Badge, Row, Col, Card } from "react-bootstrap";

export default function Contracts() {
  const searchInput = useSelector(selectSearchInput);
  const apiContractsUrl = "http://localhost:1337/contracts";
  const dispatch = useDispatch();
  const [contracts, setContracts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
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
  }, [searchInput]);
  return (
    <Container>
      <h1 style={{ marginBottom: 25 }}>Contracts</h1>
      <Row xs={1} md={3} className="g-4 contracts_list">
        {contracts
          .filter((item) => item.company === searchInput || item)
          .map((obj, idx) => (
            <Col>
              <Card border="primary" style={{ width: "22rem" }}>
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
                  <Card.Text>
                    <Row>
                      <Col sm={4}>Period Start</Col>
                      <Col sm={8}>
                        <Badge style={{ margin: 5 }} bg="info">
                          {obj.periodStart}
                        </Badge>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={4}>Period End</Col>
                      <Col sm={8}>
                        <Badge style={{ margin: 5 }} bg="danger">
                          {obj.periodEnd}
                        </Badge>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={4}>Renewal Schedule</Col>
                      <Col sm={8}>
                        <Badge style={{ margin: 5 }} bg="warning">
                          {obj.negotiationRenewalDate}
                        </Badge>
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
