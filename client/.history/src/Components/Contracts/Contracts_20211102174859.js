import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput, setData } from "../../features/userSlice";
import { Container } from "react-bootstrap";

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
    </Container>
  );
}
