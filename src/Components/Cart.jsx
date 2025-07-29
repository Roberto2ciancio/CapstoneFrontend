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
  Spinner,
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
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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

    setCheckoutLoading(true);

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

      // Simula un delay per mostrare l'animazione
      setTimeout(() => {
        if (res.ok) {
          setEmailSent(true);
          // SOLO dopo il checkout riuscito svuota il carrello
          setCart([]);
          localStorage.setItem("cart", JSON.stringify([]));
        } else {
          setError("Errore nell'invio dell'email.");
        }
        setCheckoutLoading(false);
      }, 2000);
    } catch {
      setTimeout(() => {
        setError("Errore di rete.");
        setCheckoutLoading(false);
      }, 2000);
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

  // Carica il carrello solo se vuoto e c'è localStorage
  useEffect(() => {
    if (cart.length === 0) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            setCart(parsedCart);
          }
        } catch (err) {
          console.error("Errore nel parsing del carrello:", err);
        }
      }
    }
  }, []); // Rimosso setCart dalle dipendenze

  // Salva il carrello nel localStorage quando cambia
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  if (checkoutLoading) {
    return (
      <Container
        className="py-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Card
          style={{
            background: "rgba(30,30,30,0.97)",
            color: "#fff",
            border: "none",
            borderRadius: 18,
            boxShadow: "0 4px 24px 0 rgba(255,140,0,0.18)",
            padding: "3rem",
            textAlign: "center",
            minWidth: 400,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, orange 60%, #23272b 100%)",
              margin: "0 auto 2rem auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation:
                "checkoutPulse 1.5s infinite, rotate 3s linear infinite",
            }}
          >
            <Spinner
              animation="border"
              role="status"
              style={{
                color: "#23272b",
                width: 50,
                height: 50,
                borderWidth: 4,
              }}
            />
          </div>

          <h3 style={{ color: "orange", marginBottom: "1rem" }}>
            Elaborazione pagamento...
          </h3>

          <p
            style={{
              color: "#ccc",
              fontSize: "1.1rem",
              marginBottom: "1.5rem",
            }}
          >
            {paymentMethod === "full"
              ? `Stiamo processando il tuo pagamento di €${total.toFixed(2)}`
              : `Stiamo configurando il tuo piano a ${installmentPlan} rate`}
          </p>

          <div
            style={{
              background: "rgba(255,140,0,0.1)",
              border: "1px solid orange",
              borderRadius: 8,
              padding: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <small style={{ color: "#ffa500" }}>
              <strong>🔒 Transazione sicura</strong>
              <br />I tuoi dati sono protetti con crittografia SSL
            </small>
          </div>

          <style>
            {`
              @keyframes checkoutPulse {
                0% { 
                  transform: scale(1); 
                  box-shadow: 0 2px 12px rgba(255,140,0,0.18); 
                }
                50% { 
                  transform: scale(1.08); 
                  box-shadow: 0 6px 30px rgba(255,140,0,0.4); 
                }
                100% { 
                  transform: scale(1); 
                  box-shadow: 0 2px 12px rgba(255,140,0,0.18); 
                }
              }
              
              @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 style={{ color: "orange" }}>Il tuo carrello</h2>
      {cart.length === 0 ? (
        <p style={{ color: "#fff" }}>Il carrello è vuoto.</p>
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
              style={{
                fontWeight: 600,
                borderRadius: 8,
                fontSize: 16,
                padding: "12px 24px",
              }}
            >
              Procedi al checkout
            </Button>
          )}

          {showCheckout && !emailSent && (
            <div className="mt-4" style={{ maxWidth: 600 }}>
              <h4 style={{ color: "orange", marginBottom: "20px" }}>
                Modalità di pagamento
              </h4>

              <Card
                style={{
                  background: "rgba(30,30,30,0.97)",
                  color: "#fff",
                  marginBottom: "20px",
                  borderRadius: 12,
                  border: "none",
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
                                borderRadius: 8,
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
                          borderRadius: 8,
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
                {error && (
                  <Alert
                    variant="danger"
                    style={{
                      background: "rgba(220, 53, 69, 0.1)",
                      border: "1px solid #dc3545",
                      color: "#ff6b6b",
                      borderRadius: 8,
                    }}
                  >
                    {error}
                  </Alert>
                )}

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
                      borderRadius: 8,
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
                          borderRadius: 8,
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
                          borderRadius: 8,
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  variant="warning"
                  className="w-100 mt-3"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    borderRadius: 8,
                    padding: "14px 0",
                  }}
                  disabled={checkoutLoading}
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
            <Alert
              variant="success"
              className="mt-4"
              style={{
                background: "rgba(40, 167, 69, 0.1)",
                border: "1px solid #28a745",
                color: "#4caf50",
                borderRadius: 12,
                padding: "1.5rem",
              }}
            >
              <h4 style={{ color: "#4caf50" }}>
                🎉 Grazie per il tuo acquisto!
              </h4>
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
