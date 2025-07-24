import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";

const BASE_URL = "https://nursing-erna-pcstorerob-41a02745.koyeb.app";

function Cart({ cart, setCart, onRemove }) {
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("full"); // "full" or "installments"
  const [installmentPlan, setInstallmentPlan] = useState(3); // 3, 6, 12 months
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  // Calculate monthly payment based on installment plan
  const getMonthlyPayment = (months) => {
    const interestRate = months === 3 ? 0 : months === 6 ? 0.02 : 0.05; // Interest rates
    const totalWithInterest = total * (1 + interestRate);
    return totalWithInterest / months;
  };

  const installmentOptions = [
    {
      months: 3,
      label: "3 rate",
      interest: "0%",
      monthly: getMonthlyPayment(3),
    },
    {
      months: 6,
      label: "6 rate",
      interest: "2%",
      monthly: getMonthlyPayment(6),
    },
    {
      months: 12,
      label: "12 rate",
      interest: "5%",
      monthly: getMonthlyPayment(12),
    },
  ];

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
            <div className="mt-4" style={{ maxWidth: 600 }}>
              <h4 style={{ color: "orange", marginBottom: "20px" }}>
                Modalità di pagamento
              </h4>

              {/* Payment Method Selection */}
              <Card
                style={{
                  background: "rgba(30,30,30,0.97)",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                <Card.Body>
                  <Form.Check
                    type="radio"
                    name="paymentMethod"
                    id="full-payment"
                    label={`Pagamento completo - €${total.toFixed(2)}`}
                    checked={paymentMethod === "full"}
                    onChange={() => setPaymentMethod("full")}
                    style={{ marginBottom: "15px" }}
                  />

                  <Form.Check
                    type="radio"
                    name="paymentMethod"
                    id="installment-payment"
                    label="Pagamento a rate"
                    checked={paymentMethod === "installments"}
                    onChange={() => setPaymentMethod("installments")}
                  />

                  {paymentMethod === "installments" && (
                    <div className="mt-3">
                      <h6 style={{ color: "orange" }}>
                        Scegli il piano di rate:
                      </h6>
                      <Row>
                        {installmentOptions.map((option) => (
                          <Col md={4} key={option.months} className="mb-2">
                            <Card
                              style={{
                                background:
                                  installmentPlan === option.months
                                    ? "rgba(255,140,0,0.2)"
                                    : "rgba(50,50,50,0.8)",
                                border:
                                  installmentPlan === option.months
                                    ? "2px solid orange"
                                    : "1px solid #444",
                                cursor: "pointer",
                                transition: "all 0.2s",
                              }}
                              onClick={() => setInstallmentPlan(option.months)}
                            >
                              <Card.Body className="text-center p-2">
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    color: "orange",
                                  }}
                                >
                                  {option.label}
                                </div>
                                <div
                                  style={{ fontSize: "12px", color: "#bbb" }}
                                >
                                  Interessi: {option.interest}
                                </div>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    marginTop: "5px",
                                    color: "#fff",
                                  }}
                                >
                                  €{option.monthly.toFixed(2)}/mese
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>

                      <Alert
                        variant="info"
                        className="mt-3"
                        style={{
                          background: "rgba(0,123,255,0.1)",
                          border: "1px solid #007bff",
                          color: "#fff",
                        }}
                      >
                        <small>
                          <strong>Piano selezionato:</strong> {installmentPlan}{" "}
                          rate da €
                          {getMonthlyPayment(installmentPlan).toFixed(2)} al
                          mese
                          {installmentPlan > 3 && (
                            <span>
                              {" "}
                              (Totale: €
                              {(
                                getMonthlyPayment(installmentPlan) *
                                installmentPlan
                              ).toFixed(2)}
                              )
                            </span>
                          )}
                        </small>
                      </Alert>
                    </div>
                  )}
                </Card.Body>
              </Card>

              {/* Credit Card Form */}
              <Form onSubmit={handleCheckout}>
                <h5 style={{ color: "orange" }}>Dati carta</h5>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group className="mb-2">
                  <Form.Label style={{ color: "#fff" }}>
                    Numero carta
                  </Form.Label>
                  <Form.Control
                    type="text"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    style={{
                      background: "#333",
                      color: "#fff",
                      border: "1px solid #555",
                    }}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label style={{ color: "#fff" }}>
                        Scadenza
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        required
                        style={{
                          background: "#333",
                          color: "#fff",
                          border: "1px solid #555",
                        }}
                        className="white-placeholder"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label style={{ color: "#fff" }}>CVV</Form.Label>
                      <Form.Control
                        type="password"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                        style={{
                          background: "#333",
                          color: "#fff",
                          border: "1px solid #555",
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  variant="warning"
                  className="w-100 mt-3"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  {paymentMethod === "full"
                    ? `Conferma acquisto - €${total.toFixed(2)}`
                    : `Conferma pagamento a rate - €${getMonthlyPayment(
                        installmentPlan
                      ).toFixed(2)}/mese`}
                </Button>
              </Form>
            </div>
          )}

          {emailSent && (
            <Alert variant="success" className="mt-4">
              <h4>Grazie per il tuo acquisto!</h4>
              <p>
                Riceverai una email di conferma con i dettagli della spedizione
                {paymentMethod === "installments" &&
                  ` e le informazioni sul piano di pagamento a ${installmentPlan} rate`}{" "}
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
