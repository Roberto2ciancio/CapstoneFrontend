import React, { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";

function AddComponentAdmin() {
  const [type, setType] = useState("CPU");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/components", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ type, name, price: Number(price) }),
      });
      if (res.ok) {
        setSuccess("Componente aggiunto con successo!");
        setName("");
        setPrice("");
      } else {
        setError("Errore nell'aggiunta del componente.");
      }
    } catch {
      setError("Errore di rete.");
    }
  };

  return (
    <Container className="py-4">
      <Card
        style={{
          maxWidth: 400,
          margin: "0 auto",
          background: "#23272b",
          color: "#fff",
        }}
      >
        <Card.Body>
          <h4 className="mb-3" style={{ color: "orange" }}>
            Aggiungi componente PC
          </h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="CPU">CPU</option>
                <option value="RAM">RAM</option>
                <option value="GPU">GPU</option>
                <option value="Storage">Storage</option>
                <option value="Case">Case</option>
                {/* aggiungi altri tipi se vuoi */}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome componente</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prezzo (€)</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min={0}
              />
            </Form.Group>
            <Button type="submit" variant="warning" className="w-100">
              Aggiungi componente
            </Button>
          </Form>
          {success && (
            <Alert variant="success" className="mt-3">
              {success}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddComponentAdmin;
