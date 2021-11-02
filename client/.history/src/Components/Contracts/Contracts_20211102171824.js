import React from "react";
import { useSelector } from "react-redux";
import { selectSearchInput } from "../../features/userSlice";

export default function Contracts() {
  const searchInput = useSelector(selectSearchInput);
  const apiContractsUrl = "http://localhost:1337/contracts";
  return (
    <div>
      <h1>Contracts Dashboard</h1>
    </div>
  );
}
