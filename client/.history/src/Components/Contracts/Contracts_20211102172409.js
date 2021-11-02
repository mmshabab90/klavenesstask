import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput } from "../../features/userSlice";

export default function Contracts() {
  const searchInput = useSelector(selectSearchInput);
  const apiContractsUrl = "http://localhost:1337/contracts";
  const dispatch = useDispatch();
  const [contracts, setContracts] = React.useState([]);
  return (
    <div>
      <h1>Contracts Dashboard</h1>
    </div>
  );
}
