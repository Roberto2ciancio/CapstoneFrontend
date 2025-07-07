import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const products = [
  {
    id: 1,
    name: "Gaming PC Ultra",
    description: "Intel i9, RTX 4080, 32GB RAM, 1TB SSD",
    price: "€2499",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Workstation Pro",
    description: "AMD Ryzen 9, RTX 4070, 64GB RAM, 2TB SSD",
    price: "€2999",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "PC Compatto",
    description: "Intel i5, GTX 1660, 16GB RAM, 512GB SSD",
    price: "€999",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
];

function Shop() {
  return (
    <Container className="py-5">
      <h1
        className="text-center mb-4"
        style={{ color: "orange", fontWeight: 700 }}
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
                  {pc.price}
                </h5>
                <Button className="modern-btn w-100">Acquista</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Shop;
