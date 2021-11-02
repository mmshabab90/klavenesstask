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
    <Container fluid>
      <h1>Contracts</h1>
      <Row xs={1} md={2} className="g-4">
        {contracts
          .filter((item) => item.company === searchInput)
          .map((obj, idx) => (
            <Col>
              <Card border="primary" style={{ width: "22rem" }}>
                <Card.Body>
                  <Card.Title>
                    {obj.company}
                    {obj.scheduledForRenewal ? (
                      <Badge bg="success">Yes</Badge>
                    ) : (
                      <Badge bg="danger">No</Badge>
                    )}
                  </Card.Title>
                  <Card.Text>
                    <Badge bg="info">{obj.periodStart}</Badge>
                    <Badge bg="danger">{obj.periodEnd}</Badge>
                    <Badge bg="warning">{obj.negotiationRenewalDate}</Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
