import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

function LaptopDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laptop, setLaptop] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [selectedModel, setSelectedModel] = useState("base");

  useEffect(() => {
    fetch(
      `https://nursing-erna-pcstorerob-41a02745.koyeb.app/api/laptops/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLaptop(data);
        setMainImg(data.image || "");
      });
  }, [id]);

  if (!laptop)
    return (
      <Container className="py-5">
        <h2>Caricamento...</h2>
      </Container>
    );

  const models = [
    { key: "base", label: "Configurazione base", price: laptop.price },
    {
      key: "premium",
      label: "Configurazione premium",
      price: laptop.price + 200,
    },
  ];

  return (
    <Container className="py-5">
      <Row>
        <Col md={6} className="d-flex flex-column align-items-center">
          <img
            src={mainImg}
            alt={laptop.name}
            style={{
              width: "90%",
              maxWidth: 400,
              borderRadius: 18,
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            }}
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/400x400?text=No+Image")
            }
          />
        </Col>
        <Col md={6}>
          <Card
            style={{
              background: "rgba(30,30,30,0.97)",
              color: "#fff",
              border: "none",
            }}
          >
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <h3
                  style={{ color: "orange", fontWeight: 700, marginRight: 12 }}
                >
                  {laptop.name}
                </h3>
                <Badge
                  bg="warning"
                  text="dark"
                  style={{ fontSize: 16, marginLeft: 8 }}
                >
                  4,5★
                </Badge>
                <span style={{ marginLeft: 8, fontSize: 14, color: "#bbb" }}>
                  245 Recensioni
                </span>
              </div>
              <div className="mb-3" style={{ color: "#aaa" }}>
                {laptop.description}
              </div>
              <div className="mb-3">
                <span style={{ fontWeight: 600 }}>Selezione del modello:</span>
                <div className="d-flex gap-3 mt-2">
                  {models.map((m) => (
                    <Button
                      key={m.key}
                      variant={
                        selectedModel === m.key ? "warning" : "outline-warning"
                      }
                      onClick={() => setSelectedModel(m.key)}
                      style={{ minWidth: 180, fontWeight: 600 }}
                    >
                      {m.label} <br />
                      <span style={{ fontWeight: 700 }}>{m.price}€</span>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <h2 style={{ color: "orange", fontWeight: 700 }}>
                  {models.find((m) => m.key === selectedModel)?.price}€
                </h2>
                <div style={{ color: "#8f8", fontSize: 15 }}>
                  Spedizione: <b>Gratuito</b> | Restituzione: <b>Gratuito</b>
                  <br />
                  <span style={{ color: "#6f6" }}>
                    Ricevilo in 2-4 giorni lavorativi
                  </span>
                </div>
              </div>
              <Button
                className="modern-btn w-100"
                style={{ fontSize: 20, padding: "12px 0" }}
                onClick={() => {
                  onAddToCart({
                    ...laptop,
                    selectedModel,
                    price: models.find((m) => m.key === selectedModel)?.price,
                  });
                  navigate("/cart");
                }}
              >
                Aggiungi al carrello
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LaptopDetail;
