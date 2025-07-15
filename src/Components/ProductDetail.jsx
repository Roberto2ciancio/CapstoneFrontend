import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [selectedModel, setSelectedModel] = useState("base");

  useEffect(() => {
    fetch(`http://localhost:8080/api/pc-cards/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        // Usa sempre un'immagine valida
        setMainImg(data.image || (data.images && data.images[0]) || "");
      });
  }, [id]);

  if (!product)
    return (
      <Container className="py-5">
        <h2>Caricamento...</h2>
      </Container>
    );

  // Esempio modelli disponibili
  const models = [
    { key: "base", label: "Senza sistema operativo", price: product.price },
    { key: "win11", label: "Windows 11 Home", price: product.price + 99 }, // esempio
  ];

  return (
    <Container className="py-5">
      <Row>
        <Col md={6} className="d-flex flex-column align-items-center">
          <img
            src={mainImg}
            alt={product.name}
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
                  {product.name}
                </h3>
                <Badge
                  bg="warning"
                  text="dark"
                  style={{ fontSize: 16, marginLeft: 8 }}
                >
                  4,6★
                </Badge>
                <span style={{ marginLeft: 8, fontSize: 14, color: "#bbb" }}>
                  330 Recensioni
                </span>
              </div>
              <div className="mb-3" style={{ color: "#aaa" }}>
                {product.description}
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
                    ...product,
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

export default ProductDetail;
