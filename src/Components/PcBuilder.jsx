import React, { useState } from "react";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";

const components = {
  cpu: [
    { name: "Intel i3", price: 90 },
    { name: "Intel i5", price: 160 },
    { name: "Intel i7", price: 280 },
    { name: "AMD Ryzen 5", price: 150 },
    { name: "AMD Ryzen 7", price: 250 },
  ],
  ram: [
    { name: "8GB DDR4", price: 35 },
    { name: "16GB DDR4", price: 65 },
    { name: "32GB DDR4", price: 120 },
  ],
  storage: [
    { name: "SSD 256GB", price: 40 },
    { name: "SSD 512GB", price: 65 },
    { name: "SSD 1TB", price: 110 },
    { name: "HDD 1TB", price: 45 },
  ],
  gpu: [
    { name: "Integrata", price: 0 },
    { name: "NVIDIA GTX 1650", price: 180 },
    { name: "NVIDIA RTX 3060", price: 350 },
    { name: "AMD RX 6600", price: 320 },
  ],
  case: [
    { name: "Mini Tower", price: 40 },
    { name: "Mid Tower", price: 60 },
    { name: "Full Tower", price: 90 },
  ],
};

function PcBuilder({ onAddToCart }) {
  const [selected, setSelected] = useState({
    cpu: components.cpu[0],
    ram: components.ram[0],
    storage: components.storage[0],
    gpu: components.gpu[0],
    case: components.case[0],
  });

  const total =
    selected.cpu.price +
    selected.ram.price +
    selected.storage.price +
    selected.gpu.price +
    selected.case.price;

  const handleChange = (type, idx) => {
    setSelected({ ...selected, [type]: components[type][idx] });
  };

  const handleBuy = () => {
    const customPc = {
      name: `PC Personalizzato (${selected.cpu.name}, ${selected.ram.name}, ${selected.storage.name}, ${selected.gpu.name}, ${selected.case.name})`,
      price: total,
      description: "Configurazione personalizzata",
      image: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png", // icona generica PC
      id: "custom-" + Date.now(),
    };
    onAddToCart(customPc);
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
          boxShadow: "0 4px 24px 0 rgba(255,140,0,0.18)",
        }}
        className="p-4"
      >
        <h2
          className="mb-4 text-center"
          style={{ color: "orange", fontWeight: 700 }}
        >
          Personalizza il tuo PC
        </h2>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Processore</Form.Label>
                <Form.Select
                  value={selected.cpu.name}
                  onChange={(e) =>
                    handleChange(
                      "cpu",
                      components.cpu.findIndex((c) => c.name === e.target.value)
                    )
                  }
                >
                  {components.cpu.map((c, idx) => (
                    <option key={idx} value={c.name}>
                      {c.name} (+{c.price}€)
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>RAM</Form.Label>
                <Form.Select
                  value={selected.ram.name}
                  onChange={(e) =>
                    handleChange(
                      "ram",
                      components.ram.findIndex((c) => c.name === e.target.value)
                    )
                  }
                >
                  {components.ram.map((c, idx) => (
                    <option key={idx} value={c.name}>
                      {c.name} (+{c.price}€)
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Case</Form.Label>
                <Form.Select
                  value={selected.case.name}
                  onChange={(e) =>
                    handleChange(
                      "case",
                      components.case.findIndex(
                        (c) => c.name === e.target.value
                      )
                    )
                  }
                >
                  {components.case.map((c, idx) => (
                    <option key={idx} value={c.name}>
                      {c.name} (+{c.price}€)
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Storage</Form.Label>
                <Form.Select
                  value={selected.storage.name}
                  onChange={(e) =>
                    handleChange(
                      "storage",
                      components.storage.findIndex(
                        (c) => c.name === e.target.value
                      )
                    )
                  }
                >
                  {components.storage.map((c, idx) => (
                    <option key={idx} value={c.name}>
                      {c.name} (+{c.price}€)
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Grafica</Form.Label>
                <Form.Select
                  value={selected.gpu.name}
                  onChange={(e) =>
                    handleChange(
                      "gpu",
                      components.gpu.findIndex((c) => c.name === e.target.value)
                    )
                  }
                >
                  {components.gpu.map((c, idx) => (
                    <option key={idx} value={c.name}>
                      {c.name} (+{c.price}€)
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
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
            >
              Acquista questo PC
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default PcBuilder;
