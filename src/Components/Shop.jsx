import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/pc-cards")
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
        {products.map((pc) => (
          <Col key={pc.id} md={4} className="mb-4">
            <Card className="modern-card h-100">
              <div className="card-img-wrapper">
                <Card.Img variant="top" src={pc.image} alt={pc.name} />
              </div>
              <Card.Body>
                <Card.Title className="text-white">{pc.name}</Card.Title>
                <Card.Text className="text-light">{pc.description}</Card.Text>
                <h5 className="mb-3" style={{ color: "orange" }}>
                  {pc.price}€
                </h5>
                <Button
                  as={Link}
                  to={`/product/${pc.id}`}
                  className="modern-btn w-100"
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
