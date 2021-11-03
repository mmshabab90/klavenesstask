import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectSignedIn } from "../features/userSlice";
import Contracts from "./Contracts/Contracts";
import LoginComponent from "./LoginComponent";

export default function Homepage() {
  // const isSignedIn = useSelector(selectSignedIn);
  const isSignedIn = localStorage.getItem("isSignedIn");

  return (
    <>
      {!isSignedIn ? (
        <Container className="home__page">
          <LoginComponent />
        </Container>
      ) : (
        <Contracts />
      )}
    </>
  );
}
