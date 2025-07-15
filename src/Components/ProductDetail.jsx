import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

function ProductDetail({ products, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product)
    return (
      <Container className="py-5">
        <h2>Prodotto non trovato</h2>
      </Container>
    );

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="modern-card">
            <Row>
              <Col md={6}>
                <Card.Img src={product.image} alt={product.name} />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title style={{ color: "orange" }}>
                    {product.name}
                  </Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <h4 style={{ color: "orange" }}>{product.price}</h4>
                  <Button
                    className="modern-btn"
                    onClick={() => {
                      onAddToCart(product);
                      navigate("/cart");
                    }}
                  >
                    Aggiungi al carrello
                  </Button>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => navigate(-1)}
                  >
                    Torna allo shop
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
