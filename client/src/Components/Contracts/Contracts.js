import React from "react";
import api from "../../api/contracts";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput } from "../../features/userSlice";
import { Button, Container, Row, Col } from "react-bootstrap";
import { LinearProgress } from "@material-ui/core";
import ContractForm from "./ContractForm";
import {
  selectContracts,
  setContracts,
  setIsLoading,
  setSelectedContract,
} from "../../features/contractsSlice";
import ContractsItem from "./ContractsItem";

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
      <div className="d-flex justify-content-between">
        <h1 style={{ marginBottom: 25, marginTop: 10 }}>Contracts</h1>
        <Button
          variant="link"
          className="m-2"
          onClick={handelShowModal}
          style={{ textDecoration: "none" }}
        >
          <i className="fas fa-plus"></i> Add New
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
                <ContractsItem obj={obj} handleEdit={handleEdit} />
              </Col>
            ))}
      </Row>

      <ContractForm show={showModal} handleClose={handleCloseModal} />
    </Container>
  );
}
