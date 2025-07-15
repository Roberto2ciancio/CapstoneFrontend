import React, { useState } from "react";
import { Container, Table, Button, Form, Alert } from "react-bootstrap";

function Cart({ cart, setCart, onRemove }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError("");
    // Validazione semplice
    if (!cardNumber || !expiry || !cvv) {
      setError("Compila tutti i campi della carta.");
      return;
    }
    // Simula invio email chiamando il backend
    const email = localStorage.getItem("email");
    const nome = localStorage.getItem("nome");
    try {
      const res = await fetch("http://localhost:8080/api/send-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ email, nome, totale: total }),
      });
      if (res.ok) {
        setEmailSent(true);
        setCart([]);
        localStorage.setItem("cart", "[]");
      } else {
        setError("Errore nell'invio dell'email.");
      }
    } catch {
      setError("Errore di rete.");
    }
  };

  return (
    <Container className="py-5">
      <h2 style={{ color: "orange" }}>Il tuo carrello</h2>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <>
          <Table striped bordered hover variant="dark" className="mt-4">
            <thead>
              <tr>
                <th>Prodotto</th>
                <th>Prezzo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{Number(item.price).toFixed(2)}€</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onRemove(idx)}
                    >
                      Rimuovi
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <b>Totale</b>
                </td>
                <td colSpan={2}>
                  <b>€{total.toFixed(2)}</b>
                </td>
              </tr>
            </tbody>
          </Table>
          {!showCheckout && (
            <Button
              variant="success"
              className="mt-3"
              onClick={() => setShowCheckout(true)}
            >
              Procedi al checkout
            </Button>
          )}
          {showCheckout && !emailSent && (
            <Form
              className="mt-4"
              onSubmit={handleCheckout}
              style={{ maxWidth: 400 }}
            >
              <h4>Dati carta</h4>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group className="mb-2">
                <Form.Label>Numero carta</Form.Label>
                <Form.Control
                  type="text"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Scadenza</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM/AA"
                  maxLength={5}
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="password"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="warning" className="w-100 mt-2">
                Conferma acquisto
              </Button>
            </Form>
          )}
          {emailSent && (
            <Alert variant="success" className="mt-4">
              <h4>Grazie per il tuo acquisto!</h4>
              <p>
                Riceverai una email di conferma con i dettagli della spedizione
                e un buono sconto del 10% per il prossimo ordine.
              </p>
            </Alert>
          )}
        </>
      )}
    </Container>
  );
}

export default Cart;
