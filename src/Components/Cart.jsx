import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Alert } from "react-bootstrap";

const BASE_URL = "https://nursing-erna-pcstorerob-41a02745.koyeb.app";

function Cart({ cart, setCart, onRemove }) {
  const navigate = useNavigate();
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
    if (!cardNumber || !expiry || !cvv) {
      setError("Compila tutti i campi della carta.");
      return;
    }
    const nomeCliente = localStorage.getItem("nome") || "";
    const destinatario = localStorage.getItem("email") || "";
    const numeroOrdine = "ORD-" + Math.floor(Math.random() * 1000000);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/api/send-confirmation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          nomeCliente,
          numeroOrdine,
          destinatario,
        }),
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

  const handleShowCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/account");
    } else {
      setShowCheckout(true);
    }
  };

  // Esempio per rimuovere un prodotto dal carrello
  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      // aggiorna lo stato del carrello
    } else {
      alert("Errore nella rimozione dal carrello");
    }
  };

  // Esempio per ottenere il carrello
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/cart`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

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
          {cart.length > 0 && !showCheckout && (
            <Button
              variant="success"
              className="mt-3"
              onClick={handleShowCheckout}
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
