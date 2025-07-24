import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Stili animazione card
const cardStyle = {
  background: "#23272b",
  border: "none",
  borderRadius: 16,
  minHeight: 280,
  transition: "transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s",
  boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
  cursor: "pointer",
};
const cardHoverStyle = {
  transform: "scale(1.04)",
  boxShadow: "0 4px 24px 0 rgba(255,140,0,0.25)",
};

function Shop() {
  const [products, setProducts] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetch("https://nursing-erna-pcstorerob-41a02745.koyeb.app/api/pc-cards")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));
  }, []);

  return (
    <Container className="py-5">
      <h1
        className="text-center mb-4"
        style={{ color: "#fff", fontWeight: 700 }}
      >
        Il nostro Shop di PC
      </h1>
      <Row>
        {products.map((pc, idx) => (
          <Col key={pc.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card
              className="h-100 shadow-sm"
              style={{
                ...cardStyle,
                ...(hovered === idx ? cardHoverStyle : {}),
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                style={{
                  width: "100%",
                  height: 110,
                  overflow: "hidden",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  background: "#181a1b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card.Img
                  variant="top"
                  src={pc.image}
                  alt={pc.name}
                  style={{
                    maxHeight: 90,
                    width: "auto",
                    objectFit: "contain",
                    borderRadius: 10,
                    background: "#181a1b",
                    transition: "transform 0.3s cubic-bezier(.4,2,.6,1)",
                    transform: hovered === idx ? "scale(1.08)" : "scale(1)",
                  }}
                />
              </div>
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "180px",
                  padding: "0.7rem",
                }}
              >
                <div>
                  <Card.Title
                    className="text-white"
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      minHeight: 38,
                    }}
                  >
                    {pc.name}
                  </Card.Title>
                  <Card.Text
                    className="text-light"
                    style={{
                      fontSize: "0.9rem",
                      minHeight: 38,
                      color: "#ccc",
                    }}
                  >
                    {pc.description}
                  </Card.Text>
                  <h5
                    className="mb-2"
                    style={{
                      color: "orange",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                    }}
                  >
                    {pc.price}€
                  </h5>
                </div>
                <Button
                  as={Link}
                  to={`/product/${pc.id}`}
                  className="w-100 mt-2"
                  style={{
                    background: "orange",
                    border: "none",
                    color: "#23272b",
                    fontWeight: 600,
                    borderRadius: 8,
                    fontSize: "0.95rem",
                  }}
                >
                  Acquista
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Shop;
