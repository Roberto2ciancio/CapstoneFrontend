import React, { useState } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://nursing-erna-pcstorerob-41a02745.koyeb.app";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("cognome", data.cognome);
        localStorage.setItem("ruolo", data.ruolo);
        localStorage.setItem("email", data.email);

        // Simula un piccolo delay per mostrare l'animazione
        setTimeout(() => {
          setLoading(false);
          navigate("/profile");
        }, 1000);
      } else {
        setLoading(false);
        setError("Credenziali non valide");
      }
    } catch (err) {
      setLoading(false);
      setError("Errore di connessione");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cognome, email, username, password }),
      });

      if (res.ok) {
        setTimeout(() => {
          setLoading(false);
          alert("Registrazione avvenuta con successo! Ora puoi accedere.");
          setIsLogin(true);
          setNome("");
          setCognome("");
          setUsername("");
          setEmail("");
          setPassword("");
          localStorage.setItem("email", email);
        }, 1000);
      } else {
        setLoading(false);
        setError("Errore durante la registrazione");
      }
    } catch (err) {
      setLoading(false);
      setError("Errore di connessione");
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
          borderRadius: 18,
          border: "none",
          boxShadow: "0 4px 24px 0 rgba(255,140,0,0.18)",
        }}
        className="p-3"
      >
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, orange 60%, #23272b 100%)",
                  margin: "0 auto 2rem auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "pulse 2s infinite",
                }}
              >
                <Spinner
                  animation="border"
                  role="status"
                  style={{
                    color: "#23272b",
                    width: 40,
                    height: 40,
                  }}
                />
              </div>
              <h4 style={{ color: "orange", marginBottom: "1rem" }}>
                {isLogin ? "Accesso in corso..." : "Registrazione in corso..."}
              </h4>
              <p style={{ color: "#ccc" }}>
                {isLogin
                  ? "Stiamo verificando le tue credenziali"
                  : "Stiamo creando il tuo account"}
              </p>
              <style>
                {`
                  @keyframes pulse {
                    0% { transform: scale(1); box-shadow: 0 2px 12px rgba(255,140,0,0.18); }
                    50% { transform: scale(1.05); box-shadow: 0 4px 24px rgba(255,140,0,0.35); }
                    100% { transform: scale(1); box-shadow: 0 2px 12px rgba(255,140,0,0.18); }
                  }
                `}
              </style>
            </div>
          ) : (
            <>
              <h2 className="mb-4 text-center" style={{ color: "orange" }}>
                {isLogin ? "Login" : "Registrazione"}
              </h2>

              {error && (
                <div
                  className="alert mb-3"
                  style={{
                    background: "rgba(220, 53, 69, 0.1)",
                    border: "1px solid #dc3545",
                    color: "#ff6b6b",
                    borderRadius: 8,
                  }}
                >
                  {error}
                </div>
              )}

              <Form onSubmit={isLogin ? handleLogin : handleRegister}>
                {!isLogin && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#ffa500" }}>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Inserisci nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        style={{
                          background: "#333",
                          color: "#fff",
                          border: "1px solid #555",
                          borderRadius: 8,
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#ffa500" }}>
                        Cognome
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Inserisci cognome"
                        value={cognome}
                        onChange={(e) => setCognome(e.target.value)}
                        required
                        style={{
                          background: "#333",
                          color: "#fff",
                          border: "1px solid #555",
                          borderRadius: 8,
                        }}
                      />
                    </Form.Group>
                  </>
                )}
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#ffa500" }}>
                    Nome utente
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci nome utente"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{
                      background: "#333",
                      color: "#fff",
                      border: "1px solid #555",
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {!isLogin && (
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#ffa500" }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Inserisci email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        background: "#333",
                        color: "#fff",
                        border: "1px solid #555",
                        borderRadius: 8,
                      }}
                    />
                  </Form.Group>
                )}
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#ffa500" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      background: "#333",
                      color: "#fff",
                      border: "1px solid #555",
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                <Button
                  variant="warning"
                  type="submit"
                  className="w-100 mb-2"
                  style={{
                    fontWeight: 600,
                    borderRadius: 8,
                    fontSize: 16,
                    padding: "12px 0",
                  }}
                  disabled={loading}
                >
                  {isLogin ? "Accedi" : "Registrati"}
                </Button>
              </Form>
              <div className="text-center mt-2">
                <Button
                  variant="link"
                  style={{
                    color: "orange",
                    textDecoration: "underline",
                    fontSize: 14,
                  }}
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                >
                  {isLogin
                    ? "Non hai un account? Registrati"
                    : "Hai già un account? Accedi"}
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Auth;
