import React, { useState, useEffect } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [ruolo, setRuolo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setNome(localStorage.getItem("nome") || "");
    setCognome(localStorage.getItem("cognome") || "");
    setUsername(localStorage.getItem("username") || "");
    setAvatar(localStorage.getItem("avatar") || "");
    setEmail(localStorage.getItem("email") || "");
    setRuolo(localStorage.getItem("ruolo") || "");
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("nome", nome);
    localStorage.setItem("cognome", cognome);
    localStorage.setItem("username", username);
    localStorage.setItem("avatar", avatar);
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
              <>
                {nome[0] || ""}
                {cognome[0] || ""}
              </>
            )}
          </div>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-2">
              <Form.Label style={{ color: "#ffa500" }}>Nome</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label style={{ color: "#ffa500" }}>Cognome</Form.Label>
              <Form.Control
                type="text"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label style={{ color: "#ffa500" }}>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label style={{ color: "#ffa500" }}>
                URL Immagine profilo
              </Form.Label>
              <Form.Control
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://..."
              />
            </Form.Group>
            <div className="mb-2" style={{ color: "#ccc", fontSize: "1.1rem" }}>
              <i className="bi bi-envelope" style={{ marginRight: 6 }}></i>
              {email}
            </div>
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
              variant="warning"
              type="submit"
              style={{
                fontWeight: 600,
                borderRadius: 8,
                width: "100%",
              }}
            >
              Salva modifiche
            </Button>
          </Form>
          <Button
            variant="outline-light"
            className="mt-3"
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
