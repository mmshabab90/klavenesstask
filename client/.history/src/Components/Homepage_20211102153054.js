import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectSignedIn } from "../features/userSlice";

export default function Homepage() {
  const login = (response) => {
    console.log(response);
  };

  const isSignedIn = useSelector(selectSignedIn);

  return (
    <Container className="home__page">{isSignedIn ? <p></p> : null}</Container>
  );
}
