import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container
      className="py-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <Card
        style={{
          minWidth: 350,
          background: "rgba(30,30,30,0.97)",
          color: "#fff",
        }}
      >
        <Card.Body>
          <h2 className="mb-4 text-center" style={{ color: "orange" }}>
            {isLogin ? "Login" : "Registrazione"}
          </h2>
          <Form>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Nome utente</Form.Label>
                <Form.Control type="text" placeholder="Inserisci nome utente" />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="warning" type="submit" className="w-100 mb-2">
              {isLogin ? "Accedi" : "Registrati"}
            </Button>
          </Form>
          <div className="text-center mt-2">
            <Button
              variant="link"
              style={{ color: "orange", textDecoration: "underline" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Non hai un account? Registrati"
                : "Hai già un account? Accedi"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Auth;
