import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";

function PcBuilder({ onAddToCart }) {
  const [components, setComponents] = useState([]);
  const [selected, setSelected] = useState({});
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/components")
      .then((res) => res.json())
      .then((data) => setComponents(Array.isArray(data) ? data : []));
  }, []);

  // Raggruppa per tipo
  const grouped = components.reduce((acc, c) => {
    acc[c.type] = acc[c.type] ? [...acc[c.type], c] : [c];
    return acc;
  }, {});

  // Imposta default selezionato
  useEffect(() => {
    const defaults = {};
    Object.keys(grouped).forEach((type) => {
      defaults[type] = grouped[type][0];
    });
    setSelected(defaults);
  }, [components.length]);

  const total = Object.values(selected).reduce(
    (sum, c) => sum + (c?.price || 0),
    0
  );

  const handleChange = (type, id) => {
    const comp = grouped[type].find((c) => c.id === Number(id));
    setSelected({ ...selected, [type]: comp });
  };

  const handleBuy = () => {
    const descr = Object.values(selected)
      .map((c) => c.name)
      .join(", ");
    const customPc = {
      name: `PC Personalizzato (${descr})`,
      price: total,
      description: "Configurazione personalizzata",
      image: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
      id: "custom-" + Date.now(),
    };
    onAddToCart(customPc);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Container className="py-5">
      <Card
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#23272b",
          color: "#fff",
          borderRadius: 18,
        }}
      >
        <Card.Body>
          <h2
            className="mb-4 text-center"
            style={{ color: "orange", fontWeight: 700 }}
          >
            Personalizza il tuo PC
          </h2>
          <Form>
            <Row>
              {Object.keys(grouped).map((type) => (
                <Col md={6} key={type}>
                  <Form.Group className="mb-3">
                    <Form.Label>{type}</Form.Label>
                    <Form.Select
                      value={selected[type]?.id || ""}
                      onChange={(e) => handleChange(type, e.target.value)}
                    >
                      {grouped[type].map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} (+{c.price}€)
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              ))}
            </Row>
            <div className="mt-4 text-center">
              <h4 style={{ color: "orange", fontWeight: 700 }}>
                Prezzo totale: {total}€
              </h4>
              <Button
                variant="warning"
                className="mt-3"
                style={{ fontWeight: 600 }}
                onClick={handleBuy}
                disabled={Object.keys(selected).length === 0}
              >
                Acquista questo PC
              </Button>
              {added && (
                <Alert variant="success" className="mt-3">
                  PC aggiunto al carrello!
                </Alert>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PcBuilder;
