import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("nome", data.nome); // Assicurati che il backend restituisca questi dati!
      localStorage.setItem("cognome", data.cognome);
      localStorage.setItem("ruolo", data.ruolo);
      localStorage.setItem("email", data.email); // Assicurati che il backend restituisca anche l'email
      // Chiudi la modale/login (es: setShowLogin(false))
      window.location.reload(); // oppure aggiorna lo stato globale utente
    } else {
      alert("Login fallito");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, cognome, email, username, password }),
    });
    if (res.ok) {
      alert("Registrazione avvenuta con successo! Ora puoi accedere.");
      setIsLogin(true);
      setNome("");
      setCognome("");
      setUsername("");
      setEmail("");
      setPassword("");
      localStorage.setItem("email", email);
    } else {
      alert("Registrazione fallita");
    }
  };

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
          <Form onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci cognome"
                    value={cognome}
                    onChange={(e) => setCognome(e.target.value)}
                    required
                  />
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Nome utente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome utente"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Inserisci email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
