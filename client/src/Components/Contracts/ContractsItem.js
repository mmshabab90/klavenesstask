import React from "react";
import moment from "moment";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

function ContractsItem({ obj, handleEdit }) {
  const renderListGroup = (title, datetime, badgeColor) => {
    return (
      <ListGroupItem>
        {title}
        <Badge style={{ margin: 5 }} bg={badgeColor}>
          {moment(datetime).format("LLL")}
        </Badge>
      </ListGroupItem>
    );
  };

  return (
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
        {obj.periodStart &&
          renderListGroup("Period Start", obj.periodStart, "success")}

        {obj.periodEnd &&
          renderListGroup("Period End", obj.periodEnd, "danger")}

        {obj.negotiationRenewalDate &&
          renderListGroup(
            "Renew Schedule",
            obj.negotiationRenewalDate,
            "primary"
          )}
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
  );
}

export default ContractsItem;
