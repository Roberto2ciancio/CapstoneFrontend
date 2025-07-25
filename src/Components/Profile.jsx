import React, { useState, useEffect } from "react";
import { Card, Container, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [ruolo, setRuolo] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setNome(localStorage.getItem("nome") || "");
    setCognome(localStorage.getItem("cognome") || "");
    setUsername(localStorage.getItem("username") || "");
    const emailFromStorage = localStorage.getItem("email");
    setEmail(emailFromStorage || "");
    setRuolo(localStorage.getItem("ruolo") || "");
    setAvatar(localStorage.getItem(`avatar_${emailFromStorage || ""}`) || "");
  }, []);

  const handleSaveBasicInfo = (e) => {
    e.preventDefault();
    localStorage.setItem("nome", nome);
    localStorage.setItem("cognome", cognome);
    setMessage("Informazioni di base salvate con successo!");
    setTimeout(() => setMessage(""), 3000);
    window.location.reload();
  };

  const handleSaveUsername = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    setMessage("Username salvato con successo!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSaveAvatar = (e) => {
    e.preventDefault();
    localStorage.setItem(`avatar_${email}`, avatar);
    setMessage("Immagine profilo salvata con successo!");
    setTimeout(() => setMessage(""), 3000);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/account");
  };

  return (
    <Container
      className="py-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <Card
        style={{
          minWidth: 350,
          maxWidth: 400,
          background: "rgba(30,30,30,0.97)",
          color: "#fff",
          border: "none",
          borderRadius: 18,
          boxShadow: "0 4px 24px 0 rgba(255,140,0,0.18)",
        }}
        className="p-3"
      >
        <Card.Body className="text-center">
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "linear-gradient(135deg, orange 60%, #23272b 100%)",
              margin: "0 auto 1.5rem auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              color: "#23272b",
              fontWeight: 700,
              boxShadow: "0 2px 12px rgba(255,140,0,0.18)",
              overflow: "hidden",
            }}
          >
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  setAvatar("");
                }}
              />
            ) : (
              <span>
                {nome && nome[0] ? nome[0].toUpperCase() : ""}
                {cognome && cognome[0] ? cognome[0].toUpperCase() : ""}
              </span>
            )}
          </div>

          {message && (
            <Alert variant="success" className="mb-3">
              {message}
            </Alert>
          )}

          {/* Basic Info Form */}
          <Form onSubmit={handleSaveBasicInfo} className="mb-3">
            <Form.Group className="mb-2">
              <Form.Label style={{ color: "#ffa500" }}>Nome</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                style={{
                  background: "#333",
                  color: "#fff",
                  border: "1px solid #555",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label style={{ color: "#ffa500" }}>Cognome</Form.Label>
              <Form.Control
                type="text"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                required
                style={{
                  background: "#333",
                  color: "#fff",
                  border: "1px solid #555",
                }}
              />
            </Form.Group>
            <Button
              variant="warning"
              type="submit"
              style={{
                fontWeight: 600,
                borderRadius: 8,
                width: "100%",
                marginBottom: "10px",
              }}
            >
              Salva Nome e Cognome
            </Button>
          </Form>

          {/* Username Form */}
          <Form onSubmit={handleSaveUsername} className="mb-3">
            <Form.Group className="mb-2">
              <Form.Label style={{ color: "#ffa500" }}>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  background: "#333",
                  color: "#fff",
                  border: "1px solid #555",
                }}
              />
            </Form.Group>
            <Button
              variant="outline-warning"
              type="submit"
              style={{
                fontWeight: 600,
                borderRadius: 8,
                width: "100%",
                marginBottom: "10px",
              }}
            >
              Salva Username
            </Button>
          </Form>

          {/* Avatar Form */}
          <Form onSubmit={handleSaveAvatar} className="mb-3">
            <Form.Group className="mb-2">
              <Form.Label style={{ color: "#ffa500" }}>
                URL Immagine profilo
              </Form.Label>
              <Form.Control
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://..."
                style={{
                  background: "#333",
                  color: "#fff",
                  border: "1px solid #555",
                }}
              />
            </Form.Group>
            <Button
              variant="outline-warning"
              type="submit"
              style={{
                fontWeight: 600,
                borderRadius: 8,
                width: "100%",
                marginBottom: "15px",
              }}
            >
              Salva Immagine
            </Button>
          </Form>

          {email &&
            email !== "" &&
            email !== "null" &&
            email !== "undefined" && (
              <div
                className="mb-2"
                style={{ color: "#ccc", fontSize: "1.1rem" }}
              >
                <i className="bi bi-envelope" style={{ marginRight: 6 }}></i>
                {email}
              </div>
            )}
          <div
            className="mb-3"
            style={{
              color: ruolo === "ADMIN" ? "orange" : "#aaa",
              fontWeight: 600,
            }}
          >
            <i className="bi bi-person-badge" style={{ marginRight: 6 }}></i>
            {ruolo === "ADMIN" ? "Amministratore" : "Utente"}
          </div>

          <Button
            variant="outline-light"
            style={{ borderRadius: 8, width: "100%" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
