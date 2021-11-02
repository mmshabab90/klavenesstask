import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectSignedIn } from "../features/userSlice";
import LoginComponent from "./LoginComponent";

export default function Homepage() {
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <Container className="home__page">
      {isSignedIn ? <LoginComponent /> : null}
    </Container>
  );
}
